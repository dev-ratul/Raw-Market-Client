import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from '../../Firebase/firebase.init';
import { AuthContext } from '../AuthContext/AuthContext';
import { useEffect, useState } from 'react';

const Authprovider = ({children}) => {
    // const [loading, setLoading]= useState(true)
    const [user, setUser]= useState(null)

    const signUp=(email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const login= (email, password)=>{

        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout=()=>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe= onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            
        })
    },[])

    const authInfo= {
        signUp,
        login,
        user,
        logout
    }


    return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default Authprovider;