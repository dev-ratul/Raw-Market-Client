import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../Firebase/firebase.init";
import { AuthContext } from "../AuthContext/AuthContext";
import { useEffect, useState } from "react";
const provider = new GoogleAuthProvider()

const Authprovider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

   

  // googleLogin
  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateUserProfile = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const authInfo = {
    signUp,
    login,
    user,
    logout,
    loading,
    updateUserProfile,
    googleLogin
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default Authprovider;
