import React, { useState } from 'react';
import styled from 'styled-components';

export default function NavBar(){

    const [burgerMenuState, setBurgerMenuState] = useState<null | string>(null);

    const burgerMenuHandler = () => (burgerMenuState !== 'visible') ? setBurgerMenuState('visible') : setBurgerMenuState('hidden');

    return(
        <Wrapper>
            <div className='left'>
                <div className='logo'>
                    <svg width='24' height='25' xmlns='http://www.w3.org/2000/svg'><g fill='#635FC7' fillRule='evenodd'><rect width='6' height='25' rx='2'/><rect opacity='.75' x='9' width='6' height='25' rx='2'/><rect opacity='.5' x='18' width='6' height='25' rx='2'/></g></svg>
                    <h1>kanban</h1>
                </div>
                <div className='burger-menu-toggle' onClick={burgerMenuHandler}>
                    <h2>Plataform Launch</h2>
                    <svg width='10' height='7' xmlns='http://www.w3.org/2000/svg' className={burgerMenuState!}>
                        <path stroke='#635FC7' strokeWidth='2' fill='none' d='m1 1 4 4 4-4'/>
                    </svg>
                </div>
            </div>

            <div className='right'>
                <div className='add-btn'>
                    <svg width='12' height='12' xmlns='http://www.w3.org/2000/svg'><path fill='#FFF' d='M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z'/></svg>
                    <span>Add New Task</span>
                </div>
                <div className='more'>
                    <svg width='5' height='20' xmlns='http://www.w3.org/2000/svg'><g fill='#828FA3' fillRule='evenodd'><circle cx='2.308' cy='2.308' r='2.308'/><circle cx='2.308' cy='10' r='2.308'/><circle cx='2.308' cy='17.692' r='2.308'/></g></svg>
                </div>
            </div>

            
            <div className={`burger-menu ${burgerMenuState}`}>
                <div className="content">
                    <h3>ALL BOARDS (0)</h3>
                    <ul>
                        <li>
                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#828FA3"/></svg>
                            <span>Platform Launch</span>
                        </li>
                    </ul>
                    <div className='create-board'>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#828FA3"/></svg>
                        <span>+ Create New Board</span>
                    </div>
                </div>
                <div className='theme-changer'>
                    <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg"><path d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z" fill="#828FA3"/></svg>
                        <div className="toggle">
                            <div></div>
                        </div>
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z" fill="#828FA3"/></svg>
                </div>
            </div>
            <div className={`bg ${burgerMenuState}`} onClick={burgerMenuHandler} ></div>

        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 4em;
    background-color: #2b2c37;
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;
    @media (min-width: 768px) {
        height: 5em;
        padding: 0 15px;
    }
   .left{
    display: flex;
    align-items: center;
        .logo{
            display: flex;
            align-items: center;
            z-index: 201;
            h1{
                display: none;
                @media (min-width: 768px) {
                    display: block;
                    margin-left: 10px;
                    color: #fff;
                }
            }
        }
        .burger-menu-toggle{
            display: flex;
            align-items: center;
            margin-left: 10px;
            color: #fff;
            @media (min-width: 768px) {
                pointer-events: none;
                margin-left: 100px;
            }
            h2{
                font-size: 16px;
                margin-right: 10px;
            }
            svg{
                @media (min-width: 768px) {
                    display: none;
                }
                &.visible{
                    animation: rotate .3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s 1 normal forwards;
                    @keyframes rotate {100%{transform: rotate(180deg);}}
                }
                &.hidden{
                    animation: rotateBack .3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s 1 normal forwards;
                    @keyframes rotateBack {100%{transform: rotate(360deg);}}
                }
            }
        }
   }
   .right{
        display: flex;
        align-items: center;
        .add-btn{
            background-color: #635fc7;
            min-width: 3em;
            height: 2em;
            width: fit-content;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 15px;
            margin-right: 10px;
            padding: 0 25px;
            @media (min-width: 768px){
                height: 2.5em;
                border-radius: 25px;
                margin-right: 20px;
            }
            svg{
                @media (min-width: 768px) {
                    transform: scale(0.75);
                }
            }
            span{
                display: none;
                @media  (min-width: 768px){
                    display: block;
                    margin-left: 5px;
                    color: #fff;
                }
            }
        }
   }
   .bg{
        position: absolute;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        background-color: #1212142f;
        display: none;
        &.visible{
            display: block;
        }
        &.hidden{
            display: none;
        }
    }
    .burger-menu{
        position: absolute;
        top: 5em;
        background-color: #3e3f4e;
        width: 80%;
        height: fit-content;
        left: 10%;
        border-radius: 5px;
        padding: 15px 20px;
        z-index: 200;
        @media (min-width: 768px) {
            top: 0;
            left: 0;
            width: 15em;
            height: 100vh;
            border-radius: 0;
            background-color: #2b2c37;
            border-right: 1px solid #b3adad99;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 15px;
            .content{
                margin-top: 100px;
                width: 100%;
            }
        }
        &.null{
            display: none;
            @media (min-width: 768px) {
                display: flex;
            }
        }
        &.visible{
            transform: scale(0);
            animation: visible .3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s 1 normal forwards;
            @keyframes visible {100%{transform: scale(1);}}
        }
        &.hidden{
            animation: hidden .3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s 1 normal forwards;
            @keyframes hidden {100%{transform: scale(0);}}
        }
        h3{
            font-size: 12px;
            letter-spacing: 2px;
            color: #9292af;
            font-weight: 300;
        }
        ul{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: fit-content;
            margin: 10px 0;
            li{
                color: #fff;
                padding: 10px 0;
                svg{
                    margin-right: 8px;
                    path{
                        fill: #fff;
                    }
                }
            }
        }
        .create-board{
            color: #635fc7;
            svg{
                margin-right: 8px;
                path{
                    fill: #635fc7;
                }
            }
        }
        .theme-changer{
            width: 100%;
            background-color: #2b2c37;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            height: 2.5em;
            margin-top: 15px;
            @media (min-width: 768px) {
                background-color: #20212c;
            }
            div{
                background-color: #635fc7;
                width: 40px;
                border-radius: 15px;
                height: 20px;
                padding: 2px 4px;
                div{
                    height: 100%;
                    width: 50%;
                    background-color: #fff;
                    border-radius: 50%;
                }
            }
        }
    }
   
`