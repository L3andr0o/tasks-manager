import styled from 'styled-components'
import { useModals } from '../context/modalsContext'
import {useState, useEffect} from 'react';
import { uuidv4 } from '@firebase/util';
import { useData } from '../context/dataContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/themeContext';

export default function AddNewBoardModal(){

    const {setAddNewBoardModal} = useModals();
    const {setBoards,boards, setColumns, columns, setSelectedBoard} = useData();
    const [boardName, setBoardName] = useState<string|null>(null);
    const [boardId, setBoardId] = useState<any>();
    const boardInfo = {
        name:boardName,
        id:boardId
    }
    const navigate = useNavigate();
    const [autoFocus,setAutoFocus] = useState<any>(false);
    const [modalColumns,setModalColumns] = useState<any>([]);
    const addNewColumn = (e:any,column:any)=>{
        e.preventDefault()
        const columnsAct = [];
        columnsAct.push(...modalColumns,column)
        setModalColumns(columnsAct)
        setAutoFocus(true)
    };
    const deleteColumn = (id:any)=>{
        const columnsAct = modalColumns.filter((column :any)=> column.id !== id)
        setModalColumns(columnsAct)
    }
    const actColumnName = (e:any,id:any)=>{
        const columnsAct = modalColumns.map((column:any)=>{
            if(column.id === id){
                column.name = e.target.value
            }
            return column
        });
        setModalColumns(columnsAct)
    }
    const saveChanges = (e:any) =>{
        e.preventDefault();
        setBoards([...boards,boardInfo]);
        setColumns([...modalColumns,...columns]);
        setAddNewBoardModal(false);
        setSelectedBoard(boardInfo)
        navigate(`/${boardId}`)
    }
    const handleNameChange = (e:any) =>{
        setBoardName(e.target.value)
    }
    useEffect(()=>{
      setBoardId(uuidv4())
    },[])

    const {theme} = useTheme();

    return(
        <Wrapper theme={theme}>
        <div className="modal">
            <h1>Edit Board</h1>
            <label htmlFor="board-name">Board Name</label>
            {
            <input type="text"id="board-name" onChange={e=>handleNameChange(e)}/>
            }
            <form className="board-columns">
                <span>Board Columns</span>
                {modalColumns.map((column:any)=>(
                        <div key={column.id}>
                            <input type="text" defaultValue={column.name} autoFocus={autoFocus} onChange={(e)=>actColumnName(e,column.id)} />
                            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" 
                            onClick={()=>deleteColumn(column.id)}><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                        </div>
                        ))}
                <div className="buttons">
                    <button className="add-new-column" onClick={e=>addNewColumn(e,{name:'',id:uuidv4(),boardId:boardId})}>+ Add New Column</button>
                    <button className="save-changes" onClick={e=>saveChanges(e)}>Save Changes</button>
                </div>
            </form>

        </div>
        <div className="bg" onClick={()=>{setAddNewBoardModal(false)}}></div>
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
            &:focus{
            background-color: ${({theme})=>theme.darkBg};
            }
        }
        h1{
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 15px;
            color: ${({theme})=>theme.font2};
        }
        label{
            display: block;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 5px;
            color: ${({theme})=>theme.font2};
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
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                input{
                    width: 90%;
                }
            }
            .buttons{
                display: flex;
                flex-direction: column;
                width: 100%;
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
                    
                }
                .save-changes{
                    background-color: #635fc7;
                    color: #fff;
                    margin-top: 15px;
                }
            }
        }
    }


`