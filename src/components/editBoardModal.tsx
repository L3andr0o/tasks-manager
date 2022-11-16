import styled from "styled-components"
import { useModals } from "../context/modalsContext"
import { v4 as uuidv4 } from 'uuid';
import { useData } from "../context/dataContext";
import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useTheme } from "../context/themeContext";

export default function EditBoardModal(props : any){

    const {setEditBoardModal} = useModals();
    const {columns, setColumns,tasks,setTasks,selectedBoard} = useData();
    const [modalColumns,setModalColumns] = useState<any>([]);
    const [autoFocus, setAutoFocus] = useState<boolean>(false);
    const [boardName,setBoardName] = useState<any>();
    const [falseTasks, setFalseTasks] = useState<any>();

    const board = useParams().board;

    const addNewColumn = (e:any,column:any)=>{
        e.preventDefault()
        const columnsAct = [];
        columnsAct.push(...modalColumns,column)
        setModalColumns(columnsAct)
        setAutoFocus(true)
    };
    const deleteColumn = (id:any)=>{
        const columnsAct = modalColumns.filter((column :any)=> column.id !== id);
        const tasksAct = falseTasks.filter((task:any)=>task.column !== id);
        setFalseTasks(tasksAct);
        setModalColumns(columnsAct);
    }
    const actColumnName = (e:any,id:any)=>{
        const columnsAct = modalColumns.map((column:any)=>{
            if(column.id === id){
                column.name = e.target.value;
            }
            return column
        });
        setModalColumns(columnsAct)
    }
    const actBoardName = (e:any)=>{
        setBoardName(e.target.value)
    }
    const saveChanges = (e:any) =>{
        e.preventDefault();
        const validation = modalColumns.map((c:any)=>c.name.length > 0);
        const revalidation = validation.find((f:any)=>f === false);
       if(boardName.length > 0 && revalidation === undefined){ 
        setEditBoardModal(false)
        selectedBoard.name = boardName
        const testx = columns.filter((column:any)=>column.boardId !== board);
        setColumns([...modalColumns,...testx]);
        setTasks(falseTasks)
        setAutoFocus(false);
        return
        }alert(`Can't be empty fields`);
    }
    useEffect(()=>{
        setModalColumns(columns.filter((column:any)=>column.boardId === board));
        setBoardName(selectedBoard.name);
        setFalseTasks(tasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  
    const {theme} = useTheme();

    return(
        <Wrapper theme={theme}>
            <div className="modal">
                <h1>Edit Board</h1>
                <h2>Board Name</h2>
                <div className="boardInput">
                    <input type="text" defaultValue={boardName} id="board-name" onChange={e=>actBoardName(e)} />
                </div>
                <form className="board-columns">
                    <span>Board Columns</span>
                    {
                        modalColumns.map((column:any)=>(
                        <div key={column.id} className='columnInfo'>
                            <div className="input">
                                <input type="text" defaultValue={column.name} onChange={(e)=>actColumnName(e,column.id)} autoFocus={autoFocus} />
                            </div>
                            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" 
                            onClick={()=>deleteColumn(column.id)}><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                        </div>
                        ))
                    }
                    <div className="buttons">
                        <button className="add-new-column" onClick={(e)=>{addNewColumn(e,{name:'',id:uuidv4(),boardId:board})}}>+ Add New Column</button>
                        <button className="save-changes" onClick={e=>saveChanges(e)}>Save Changes</button>
                    </div>
                </form>

            </div>
            <div className="bg" onClick={()=> setEditBoardModal(false)}></div>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color:#0003;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .bg{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
    }
    .modal{
        width: 90%;
        background-color: ${({theme})=>theme.bg};
        padding: 25px 20px;
        color: #fff;
        border-radius: 5px;
        max-width: 25em;
        animation: show .3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s 1 normal forwards;
        transform: scale(0);
        z-index: 200;
        @keyframes show {
            100%{transform:scale(1)}
        }
        input{
            background-color: transparent;
            border: 1px solid #828FA3;
            color: ${({theme})=>theme.font2};
            border-radius: 5px;
            padding: 10px;
            outline: none;
            transition: background-color .3s cubic-bezier(0.165, 0.84, 0.44, 1);
            &.red{
                border: 1px solid red;
            }
            &:focus{
                background-color: ${({theme})=>theme.darkBg};
                border: 1px solid #635FC7;
            }
        }
        .boardInput{
            position: relative;
        }
        h1{
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 15px;
            color: ${({theme})=>theme.font2};
        }
        h2{
            display: block;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 5px;
            color:${({theme})=>theme.font2};
        }
        #board-name{
            width: 100%;
        }
        form{
            margin-top: 15px;
            span{
                font-size: 12px;
                font-weight: 600;
                color: ${({theme})=>theme.font2};
            }
            div{
                margin-top: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                div{
                    position: relative;
                    width: 90%;
                    input{
                    width: 100%;
                    }   
                }
                svg{
                    cursor: pointer;
                    &:hover{
                        path{
                            fill: red;
                        }
                    }
                }
            }
            .buttons{
                display: flex;
                flex-direction: column;
                width: 100%;
                margin-top: 15px;
                button{
                    width: 100%;
                    padding: 10px;
                    border-radius: 25px;
                    border: none;
                    outline: none;
                    font-weight: 600;
                }
                .add-new-column{
                    background: (#635FC7,#fff);
                    color: #635fc7;
                    cursor: pointer;
                    transition: background-color .3s cubic-bezier(0.165, 0.84, 0.44, 1);
                    &:hover{background-color:#b7b5f0;}
                }
                .save-changes{
                    background-color: #635fc7;
                    color: #fff;
                    margin-top: 15px;
                    cursor: pointer;
                    transition: background-color .3s cubic-bezier(0.165, 0.84, 0.44, 1);
                    &:hover{background-color:#A8A4FF;}
                }
            }
        }
    }

`