import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../Firebase/firebase.init";
import { AuthContext } from "../AuthContext/AuthContext";
import { useEffect, useState } from "react";

const Authprovider = ({ children }) => {
  const [loading, setLoading]= useState(true)
  const [user, setUser] = useState(null);

  const signUp = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateUserProfile = (profileInfo) => {
    
    return updateProfile(auth.currentUser, profileInfo)
  };

  useEffect(() => {
    
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    });
  }, []);

  const authInfo = {
    signUp,
    login,
    user,
    logout,
    loading,
    updateUserProfile
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default Authprovider;
