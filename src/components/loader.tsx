import styled from "styled-components"
import { useTheme } from "../context/themeContext"


export default function Loader(){
    const {theme} = useTheme()
    return(
        <Load className="loader" theme={theme}></Load>
    )
}

const Load = styled.span`
    width: 48px;
    height: 48px;
    border: 5px solid ${({theme})=>theme.font2};
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    position: absolute;
    top: calc(50% - 24px);
    left: calc(50% - 24px);
    @keyframes rotation {
        0% {transform: rotate(0deg);}
        100% {transform: rotate(360deg);}
    } 
`