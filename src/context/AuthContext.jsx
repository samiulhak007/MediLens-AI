import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase/config';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          // Fetch additional user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          const isAdmin = currentUser.email === 'samiulhak007@gmail.com';
          
          if (userDoc.exists()) {
            const data = userDoc.data();
            // If email is admin but role isn't, or vice versa (though less likely)
            if (isAdmin && data.role !== 'admin') {
              const updatedData = { ...data, role: 'admin' };
              setUserData(updatedData);
            } else {
              setUserData(data);
            }
          } else {
            // Create user doc if it doesn't exist
            const newData = {
              uid: currentUser.uid,
              name: currentUser.displayName || '',
              email: currentUser.email,
              photoURL: currentUser.photoURL || '',
              role: isAdmin ? 'admin' : 'user',
              plan: isAdmin ? 'pro' : 'free',
              joinedAt: serverTimestamp(),
              lastLoginAt: serverTimestamp(),
              emailVerified: currentUser.emailVerified,
              loginMethod: currentUser.providerData[0]?.providerId || 'email',
              analysisCount: 0,
              language: 'english',
              allergies: [],
              conditions: [],
              notificationPrefs: {
                email: true,
                browser: true
              }
            };
            await setDoc(doc(db, 'users', currentUser.uid), newData);
            setUserData(newData);
          }
        } catch (error) {
          console.error("Firestore Error in AuthContext:", error);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, name) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(res.user);
    // Initial profile update or firestore entry is handled by useEffect or here
    return res;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const refreshUser = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setUser({ ...auth.currentUser });
    }
  };

  const value = {
    user,
    userData,
    signup,
    login,
    logout,
    loginWithGoogle,
    resetPassword,
    refreshUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
