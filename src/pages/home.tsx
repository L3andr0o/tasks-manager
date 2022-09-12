import React from 'react';
import styled from 'styled-components';
import { GlobalStyles } from '../assets/globalStyles/globalStyles';
import NavBar from '../components/navbar';

export default function Home(){
    return(
        <Wrapper>
            <GlobalStyles />
            <NavBar />

        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;
`