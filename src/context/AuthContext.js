import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // For initial page load
  const [isProcessing, setIsProcessing] = useState(false); // For form submissions

  // --- Core Auth Functions ---
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function logout() {
    return signOut(auth);
  }

  // --- Data Sync Function ---
  async function refreshUser() {
    setIsProcessing(true); // Show loader during refresh
    try {
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          // Merge auth data with firestore data
          setCurrentUser({ ...auth.currentUser, ...userDoc.data() });
        }
      }
    } catch (error) {
      console.error("Failed to refresh user data", error);
    } finally {
      setIsProcessing(false); // Hide loader
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult(); // <-- سحب الختم
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        const finalUser = {
          ...user,
          isAdmin: idTokenResult.claims.admin === true // <-- إضافة خاصية الأدمن
        };

        if (userDoc.exists()) {
          setCurrentUser({ ...finalUser, ...userDoc.data() });
        } else {
          setCurrentUser(finalUser);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isProcessing,
    setIsProcessing,
    signup,
    login,
    googleLogin,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}