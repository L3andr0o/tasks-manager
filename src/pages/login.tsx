import { useState } from "react"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyles } from "../assets/globalStyles/globalStyles";

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
        <Wrapper>
            <GlobalStyles />
            <button onClick={handleGoogleLogin}>Login With Google</button>
            <span>{error && error}</span>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  background-color: #333;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  button{
    height: 4em;
    width: 15em;
    padding: 10px;
    border: none;
    outline: none;
    background-color: #3fc;
    font-weight: 500;
  }
`