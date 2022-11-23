import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../context/themeContext';
import { useData } from '../context/dataContext';
import { useModals } from '../context/modalsContext';

export default function NavBar(){

    const {setAddNewTaskModal,setAddNewBoardModal,setDeleteBoardModal,setEditBoardModal} = useModals();
    const {boards, selectedBoard, setSelectedBoard, columns} = useData();
    const [burgerMenuState, setBurgerMenuState] = useState<null | string>(null);
    const [boardColumns, setBoardColumns] = useState<any>([]);
    const [boardOptions, setBoardOptions] = useState<boolean>(false);
    const boardOptHandler = ()=> boardOptions ? setBoardOptions(false) : setBoardOptions(true);
    const burgerMenuHandler = () => (burgerMenuState !== 'visible') ? setBurgerMenuState('visible') : setBurgerMenuState('hidden');
    const navigate = useNavigate();
    const board = useParams()


    const openAddNewBoardModal = () => {
        setAddNewBoardModal(true);
        setBurgerMenuState('hidden');
    }
    const selectBoard = (board:any)=>{
        setSelectedBoard(board);
        navigate(`/${board.id}`);
        burgerMenuHandler()
    }
    const xd = (dx:any)=>{
        dx(true);
        setBoardOptions(false)
    }
    useEffect(()=>{
        setBoardColumns(columns.filter((column:any)=>column.boardId === board.board))
    },[columns,board])
   
    const {theme,themeHandler,choose} = useTheme();

    return(
        <Wrapper theme={theme}>
            <div className='left'>
                <div className='logo'>
                    <svg width='24' height='25' xmlns='http://www.w3.org/2000/svg'><g fill='#635FC7' fillRule='evenodd'><rect width='6' height='25' rx='2'/><rect opacity='.75' x='9' width='6' height='25' rx='2'/><rect opacity='.5' x='18' width='6' height='25' rx='2'/></g></svg>
                    <h1>kanban</h1>
                </div>
                <div className='burger-menu-toggle' onClick={burgerMenuHandler}>
                    <h2 className={burgerMenuState!}>{selectedBoard ? selectedBoard.name : 'loading'}</h2>
                    <svg width='10' height='7' xmlns='http://www.w3.org/2000/svg' className={burgerMenuState!}>
                        <path stroke='#635FC7' strokeWidth='2' fill='none' d='m1 1 4 4 4-4'/>
                    </svg>
                </div>
            </div>

            <div className='right'>
                <div className={`add-btn ${boardColumns.length > 0}`} onClick={()=> boardColumns.length > 0 && setAddNewTaskModal(true)}>
                    <svg width='12' height='12' xmlns='http://www.w3.org/2000/svg'><path fill='#FFF' d='M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z'/></svg>
                    <span>Add New Task</span>
                </div>
                <div className='more' onClick={boardOptHandler}>
                    <svg width='5' height='20' xmlns='http://www.w3.org/2000/svg'><g fill='#828FA3' fillRule='evenodd'><circle cx='2.308' cy='2.308' r='2.308'/><circle cx='2.308' cy='10' r='2.308'/><circle cx='2.308' cy='17.692' r='2.308'/></g></svg>
                </div>
            </div>

            
            <div className={`burger-menu ${burgerMenuState}`}>
                <div className="content">
                    <h3>ALL BOARDS ({boards.length})</h3>
                    <ul>
                    {
                        boards.map((board:any)=>(
                        <li key={board.id} className={(selectedBoard && selectedBoard.id) === board.id ? 'selectedBoard' : ''} onClick={()=>selectBoard(board)}>
                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#828FA3"/></svg>
                            <span>{board.name}</span>
                        </li> 
                        ))
                    }
                    </ul>
                    <div className='create-board' onClick={()=>openAddNewBoardModal()}>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#828FA3"/></svg>
                        <span>+ Create New Board</span>
                    </div>
                </div>
                <div className='sidebar-bottom'>
                    <div className='theme-changer'>
                        <svg width="19" height="19" xmlns="http://www.w3.org/2000/svg"><path d="M9.167 15.833a.833.833 0 0 1 .833.834v.833a.833.833 0 0 1-1.667 0v-.833a.833.833 0 0 1 .834-.834ZM3.75 13.75a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 0 1-1.18-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm10.833 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.179 1.178l-1.25-1.25a.833.833 0 0 1 .59-1.422ZM9.167 5a4.167 4.167 0 1 1 0 8.334 4.167 4.167 0 0 1 0-8.334Zm-7.5 3.333a.833.833 0 0 1 0 1.667H.833a.833.833 0 1 1 0-1.667h.834Zm15.833 0a.833.833 0 0 1 0 1.667h-.833a.833.833 0 0 1 0-1.667h.833Zm-1.667-6.666a.833.833 0 0 1 .59 1.422l-1.25 1.25a.833.833 0 1 1-1.179-1.178l1.25-1.25a.833.833 0 0 1 .59-.244Zm-13.333 0c.221 0 .433.088.59.244l1.25 1.25a.833.833 0 0 1-1.18 1.178L1.91 3.09a.833.833 0 0 1 .59-1.422ZM9.167 0A.833.833 0 0 1 10 .833v.834a.833.833 0 1 1-1.667 0V.833A.833.833 0 0 1 9.167 0Z" fill="#828FA3"/></svg>
                            <div className="toggle" onClick={themeHandler} >
                                <div className={`${choose}`}></div>
                            </div>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M6.474.682c.434-.11.718.406.481.78A6.067 6.067 0 0 0 6.01 4.72c0 3.418 2.827 6.187 6.314 6.187.89.002 1.77-.182 2.584-.54.408-.18.894.165.724.57-1.16 2.775-3.944 4.73-7.194 4.73-4.292 0-7.771-3.41-7.771-7.615 0-3.541 2.466-6.518 5.807-7.37Zm8.433.07c.442-.294.969.232.674.674l-.525.787a1.943 1.943 0 0 0 0 2.157l.525.788c.295.441-.232.968-.674.673l-.787-.525a1.943 1.943 0 0 0-2.157 0l-.786.525c-.442.295-.97-.232-.675-.673l.525-.788a1.943 1.943 0 0 0 0-2.157l-.525-.787c-.295-.442.232-.968.674-.673l.787.525a1.943 1.943 0 0 0 2.157 0Z" fill="#828FA3"/></svg>
                    </div>
                    <div className="hidde-sidebar-btn" onClick={()=> setBurgerMenuState('hidden')}>
                        <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z" /></svg>
                        <span>Hide Sidebar</span>
                    </div>
                </div>
            </div>
            <div className={`bg ${burgerMenuState}`} onClick={burgerMenuHandler} ></div>
            <div className={`show-sidebar-btn ${burgerMenuState}`}onClick={()=> setBurgerMenuState('visible')}>
                <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z" fill="#FFF"/></svg>
            </div>
            {boardOptions && 
            <div className="boardOptions">
                <span className='editBoard' onClick={()=>xd(setEditBoardModal)}>Edit Board</span>
                <span className='deleteBoard' onClick={()=>xd(setDeleteBoardModal)} >Delete Board</span>
            </div>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 4em;
    background-color: ${({theme})=>theme.bg};
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;
    .show-sidebar-btn{
        display: none;
    }
    @media (min-width: 768px) {
        height: 5em;
        padding: 0 15px;
        .show-sidebar-btn{
        display: block;
        position: absolute;
        left: 0;
        top: 92vh;
        z-index: 20;
        background-color:${({theme})=>theme.primaryColor};
        width: 3em;
        padding: 10px 0;
        text-align: center;
        border-radius: 0 20px 20px 0;
        cursor: pointer;
        &:hover{
            background-color: #A8A4FF;
        }
        &.null{
            display: none;
        }
        &.visible{
            animation: hide .3s cubic-bezier(0.075, 0.82, 0.165, 1) 0s 1 normal forwards;
            @keyframes hide {
                100%{
                    transform: translateX(-100%);
                }
            }
        }
        &.hidden{
            animation: show .3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s 1 normal forwards;
            transform: translateX(-100%);
            @keyframes show {
                100%{
                    transform: translateX(0);
                }
            }
        }
    }
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
                    color: ${({theme})=>theme.font2};
                }
            }
        }
        .burger-menu-toggle{
            display: flex;
            align-items: center;
            margin-left: 10px;
            color: ${({theme})=>theme.font2};
            @media (min-width: 768px) {
                pointer-events: none;
            }
            h2{
                font-size: 16px;
                margin-right: 10px;
                position: relative;
                @media (min-width: 768px) {
                    margin-left: 80px;
                    &::before{
                    content: ' ';
                    position: absolute;
                    top: calc(-2em );
                    left: -15px;
                    width: 1px;
                    height: 5em;
                    background-color: #b3adad99;
                    }
                    &.hidden{
                        margin-left: 80px;
                        animation: test .3s cubic-bezier(0.075, 0.82, 0.165, 1) 0s 1 normal forwards;
                        @keyframes test {
                           100%{
                            margin-left: 35px;
                           } 
                        }
                    }
                    &.visible{
                        margin-left: 35px;
                        animation: translate .3s cubic-bezier(0.165, 0.84, 0.44, 1) .2s 1 normal forwards;
                        @keyframes translate {
                            100%{
                                transform: translateX(40px);
                            }
                        }
                    }
                }
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
            background-color: ${({theme})=>theme.primaryColor};
            min-width: 2em;
            height: 2em;
            width: fit-content;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 15px;
            margin-right: 10px;
            padding: 0 15px;
            cursor: pointer;
            transition: background-color .3s cubic-bezier(0.165, 0.84, 0.44, 1);
            &:hover:not(.false){
                background-color: #A8A4FF;
            }
            &.false{
                opacity: .5;
                cursor: not-allowed;
                user-select: none;
                /* pointer-events: none; */
            }
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
        .more{
            cursor: pointer;
        }
   }
   .bg{
    display: none;
        @media (max-width:768px) {
            position: absolute;
            width: 100vw;
            height: 100vh;
            left: 0;
            top: 0;
            background-color: #1212142f;
            display: none;
            z-index: 20;
            &.visible{
                display: block;
            }
            &.hidden{
                display: none;
            }
        }
    }
    .burger-menu{
        position: absolute;
        top: 5em;
        background-color: ${({theme})=>theme.bg};
        width: 80%;
        height: fit-content;
        left: 10%;
        border-radius: 5px;
        padding: 15px 0px;
        z-index: 80;
        .content{
            height: fit-content;
            align-items: flex-start;
        }
        @media (min-width: 768px) {
            top: 0;
            left: 0;
            width: 15em;
            height: 100vh;
            border-radius: 0;
            background-color: ${({theme})=>theme.bg};
            border-right: 1px solid #b3adad99;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            /* padding: 15px; */
            padding-bottom: 30px;
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
            @media (min-width: 768px) {
                display: flex;
                transform: translateX(-100vw);
                animation: visible .3s cubic-bezier(0.215, 0.610, 0.355, 1) 0s 1 normal forwards;
                @keyframes visible {
                    100%{
                        transform: translateX(0);
                    }
                }
            }
        }
        &.hidden{
            animation: hidden .3s cubic-bezier(0.165, 0.84, 0.44, 1) 0s 1 normal forwards;
            @keyframes hidden {100%{transform: scale(0);}}
            @media (min-width: 768px) {
                display: flex;
                @keyframes hidden {
                    100%{
                        transform: translateX(-100%);
                    }
                }
            }
        }
        
        h3{
            font-size: 12px;
            letter-spacing: 2px;
            color: ${({theme})=>theme.font};
            font-weight: 600;
            margin: 0 15px;
        }
        ul{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: fit-content;
            margin: 10px 0;
            width: 100%;
            li{
                color: ${({theme})=>theme.font};
                padding: 10px 0;
                text-align: left;
                width: 90%;
                position: relative;
                padding-left: 15px;
                font-weight: 600;
                border-radius: 0 25px 25px 0;
                cursor: pointer;
                &:hover:not(.selectedBoard){
                    background-color: ${({theme})=>theme.darkBg};
                    color: ${({theme})=>theme.primaryColor};
                    svg{path{fill: ${({theme})=>theme.primaryColor};}}
                }
               &.selectedBoard{
                color: #fff;
                &::after{
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    background-color: ${({theme})=>theme.primaryColor};
                    z-index: -1;
                    border-radius: 0 25px 25px 0;
                }
                svg{
                    path{
                        fill: #fff;
                    }
                }
               }
                svg{
                    margin-right: 8px;
                    path{
                        fill: ${({theme})=>theme.font};
                    }
                }
            }
        }
        .create-board{
            color: ${({theme})=>theme.primaryColor};
            margin: 0 15px;
            font-weight: 600;
            cursor: pointer;
            svg{
                margin-right: 8px;
                path{
                    fill: ${({theme})=>theme.primaryColor};
                }
            }
        }
        .sidebar-bottom{
            margin: 0 auto;
            width: 90%;
            .theme-changer{
            width: 100%;
            background-color: ${({theme})=>theme.darkBg};
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            height: 2.5em;
            margin-top: 15px;
            div{
                background-color: ${({theme})=>theme.primaryColor};
                width: 40px;
                border-radius: 15px;
                height: 20px;
                padding: 2px 4px;
                cursor: pointer;
                &:hover{background-color: #A8A4FF;}
                div{
                    height: 100%;
                    width: 50%;
                    background-color: #fff;
                    border-radius: 50%;
                    &:hover{background-color: #fff;}
                    &.false{
                        animation: trs .3s ease-in 0s 1 normal forwards;
                        @keyframes trs {100%{transform:translateX(100%);}}
                    }
                    &.true{
                        animation: trsb .3s ease-in 0s 1 normal forwards;
                        @keyframes trsb {
                            0%{transform:translateX(100%);}
                            100%{transform:translateX(0%);}
                        }
                    }
                }
            }
        }
            .hidde-sidebar-btn{
                display: none;
                @media (min-width: 768px) {
                    display: block;
                    margin-top: 20px;
                    font-weight: 600;
                    padding: 10px;
                    border-radius: 5px;
                    cursor: pointer;
                svg{
                    margin-right: 10px;
                    fill: #828FA3;
                }
                span{
                    color: ${({theme})=>theme.font};
                }
                &:hover{
                    background-color: ${({theme})=>theme.darkBg};
                    span{color: ${({theme})=>theme.primaryColor};}
                    svg{fill: ${({theme})=>theme.primaryColor};}
                }
                }
            }
        }
    }
    .boardOptions{
          position: absolute;
          right: 10px;
          z-index: 2000;
          top: 3.5em;
          display: flex;
          flex-direction: column;
          background-color: ${({theme})=>theme.bg};
          width: 40%;
          max-width: 10em;
          padding: 10px;
          justify-content: space-around;
          height: 5em;
          border-radius: 5px;
          span{
            height: 50%;
            margin: 0;
            display: flex;
            align-items: center;
            font-size: 14px;
            cursor: pointer;
            &.editBoard{
              color: ${({theme})=>theme.font};
            }
            &.deleteBoard{
              color: #EA5555;
            }
          }
        }
   
`