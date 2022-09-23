import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        font-family: 'Plus Jakarta Sans';
        list-style: none;
        
        /* ::-webkit-scrollbar {
        height: 10px;
        width: 10px;
        }
        ::-webkit-scrollbar-track {
        background: #000;
        }
        ::-webkit-scrollbar-thumb {
        background: #fff;
        } */

    }
    body{
        height: 100%;
        width: 100vw;
    }

`