import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAUussbb2XmZJDO4w2uJjihPv4EJiKImvg",
  authDomain: "fir-todo-app-a45c4.firebaseapp.com",
  projectId: "fir-todo-app-a45c4",
  storageBucket: "fir-todo-app-a45c4.appspot.com",
  messagingSenderId: "589832289522",
  appId: "1:589832289522:web:04a8f458f49969c3b4646b",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);
export { db };

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState();

  const signUp = (email, password, displayName) =>
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      updateProfile(user, { displayName });
      setUser(user);
      return user;
    });

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      setUser(user);
      return user;
    });

  const signOutUser = () => signOut(auth).then(() => setUser(null));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null);

      return () => unsubscribe();
    });
  });
  return {
    signUp,
    signIn,
    signOut: signOutUser,
    user,
  };
}

export default AuthProvider;
