import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { db } from '../firebase';
import { doc, getDoc} from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	function signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged( async user => {
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
		})
		return unsubscribe;
	}, [])

	const value = {
		currentUser,
		signup,
		login,
		logout
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}