import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from "firebase/auth"; // 1. استيراد الدوال مباشرة
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isProcessing, setIsProcessing] = useState(false);

	// 2. تعديل الدوال لاستخدام الطريقة الحديثة
	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logout() {
		return signOut(auth);
	}


	async function refreshUser() {
		if (auth.currentUser) {
			const userDocRef = doc(db, "user", auth.currentUser.uid);
			const userDoc = await getDoc(userDocRef);
			if (userDoc.exists()) {
				setCurrentUser({ ...auth.currentUser, ...userDoc.data() });
			}
		}
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const userDocRef = doc(db, "users", user.uid);
				const userDoc = await getDoc(userDocRef);
				if (userDoc.exists()) {
					setCurrentUser({ ...user, ...userDoc.data() });
				} else {
					setCurrentUser(user);
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
		logout,
		refreshUser
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}