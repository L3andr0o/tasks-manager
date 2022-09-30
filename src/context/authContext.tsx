import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup,
  sendPasswordResetEmail } from 'firebase/auth';
  import { auth } from '../firebase';

export const authContext = createContext<any>(true);
export const useAuth = () =>{
  const context = useContext(authContext);
  return context
}


export default function AuthProvider({children} : any){

  const [user, setUser] = useState<any>(null);
  const [loader, setLoader] = useState(true)

  const loginWithGoogle = () =>{
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider);
  }
  const logout = ()=>{
    signOut(auth)
  }
  const resetPassword = (email : any) =>{
    sendPasswordResetEmail(auth, email)
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,currentUser=>{
      setUser(currentUser);
      setLoader(false)
    });
    return ()=>unsubscribe()
  },[])

  return(
    <authContext.Provider value={{
      user, 
      logout, 
      loader, 
      loginWithGoogle, 
      resetPassword
    }}>
    {children}
    </authContext.Provider>
    )
}
