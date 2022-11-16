import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        font-family: 'Plus Jakarta Sans';
        list-style: none;
        
        ::-webkit-scrollbar {
        height: 10px;
        width: 10px;
        }
        ::-webkit-scrollbar-track {
        background: #0006;
        border-radius: 25px;
        }
        ::-webkit-scrollbar-thumb {
        background: #635FC7;
        border-radius: 25px;
        &:hover{
            background: #635FC7AA;
        }
        }

    }
    body{
        height: 100%;
        width: 100vw;
        overflow: hidden;
    }

`