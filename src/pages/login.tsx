import { useState } from "react"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom";

export default function Login(){

  const [error, setError] = useState<any>()
  const {loginWithGoogle} = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () =>{
    try {
    await loginWithGoogle();
    navigate('/')
    } catch (e : any) {
      setError(e.message)    
      }
  }


    return(
        <div>
            <button onClick={handleGoogleLogin}>Login With Google</button>
            <span>{error && error}</span>
        </div>
    )
}