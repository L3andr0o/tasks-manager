import { uuidv4 } from "@firebase/util";
import { updateDoc, doc } from "firebase/firestore";
import { useState } from "react"
import { useParams } from "react-router-dom";
import styled from "styled-components"
import { useAuth } from "../context/authContext";
import { useData } from "../context/dataContext";
import { useModals } from "../context/modalsContext";
import { useTheme } from "../context/themeContext";
import db from "../firebase";

export default function AddNewTaskModal(){

    const {setAddNewTaskModal} = useModals();
    const {boards,columns,tasks,setTasks,selectedBoard,id,getData} = useData();
    const {user} = useAuth();
    const board = useParams().board;
    const [selectedColumn, setSelectedColumn] = useState<any>(columns[0]);
    const [subtasks, setSubtasks] = useState<any>([
        {content:'',
        id:uuidv4(),
        placeholder:'e.g. Take coffee break',
        completed: false
        },
        {content:'',
        id:uuidv4(),
        placeholder:'e.g. Drink coffee & smile',
        completed: false
        }]);
    const [newTask, setNewTask] = useState({title:'',description:''})
    const handleChange = ({target : {name, value}}:any) =>setNewTask({...newTask, [name]: value});

    const addNewSubtask = (e:any,subtask:any)=>{
        e.preventDefault();
        const subtasksAct = [];
        subtasksAct.push(...subtasks,subtask);
        setSubtasks(subtasksAct);
    }
    const deleteSubtask = (id:any)=>{
        const subtasksAct = subtasks.filter((subtask:any)=>subtask.id !== id);
        setSubtasks(subtasksAct)
    }
    const actSubtask = (e:any,id:any)=>{
        const subtasksAct = subtasks.map((subtask:any)=>{
            if(subtask.id === id){
                subtask.content = e.target.value;
            }
            return subtask
        })
        setSubtasks(subtasksAct)
    }


    const [selectState, setSelectState] = useState<string | null>(null);
    const selectHandler =  ()=>(selectState === 'active') ? setSelectState('hidden') : setSelectState('active');
    const selectOptionHandler = (column:any) =>{
        setSelectState('hidden');
        setSelectedColumn(column)
    }

    const createTask = async (e:any)=>{
        e.preventDefault();
        const validation = subtasks.map((st:any)=>st.content.length > 0);
        const revalidation = validation.find((f:any)=>f === false);
       if(
        newTask.title.length > 0 &&
        newTask.description.length > 0 &&
        subtasks.length > 0 &&
        revalidation === undefined
        ){  
        const task : any= {
            id:uuidv4(),
            title:newTask.title,
            description:newTask.description,
            subtasks: subtasks,
            column:selectedColumn.id,
            board:selectedBoard.id
        }
        setTasks([...tasks,task]);
        const taskDoc = doc(db,user.uid,id);
        const update = {boards : boards,columns : columns, tasks :[...tasks,task]}
        await updateDoc(taskDoc, update);
        getData()
        setAddNewTaskModal(false)
        return
       }alert(`Can't be empty fields`)
    }
    const {theme} = useTheme();

    return(
        <Wrapper theme={theme}>
            <div className="modal">
                <h1>Add New Task</h1>
                <form>
                    <label htmlFor="task">Title</label>
                    <input type="text" placeholder="e.g. Take coffee break" id="title" name="title" onChange={handleChange} />
                    <label htmlFor="description">Description</label>
                    <input type="text" placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little." id="description" name="description" onChange={handleChange}/>
                    <div className="subtasks">
                        <span>Subtasks</span>
                        {
                            subtasks.length > 0 && 
                            subtasks.map((subtask:any)=>(
                                <div key={subtask.id}>
                                    <input type="text" placeholder={subtask.placeholder!} onChange={e=>actSubtask(e,subtask.id)}/>
                                    <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" onClick={()=>deleteSubtask(subtask.id)}><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                                </div>
                            ))
                        }
                        <button className="subtasks-btn" 
                        onClick={e=>addNewSubtask(e,{content:'',id:uuidv4(),placeholder:null,completed:false})}>
                            + Add New Subtask
                        </button>
                    </div>
                    <div className='select'>
                        <span className="status">Status</span>
                        <div className={`selected-option ${selectState!}`} onClick={()=>selectHandler()}>
                            <span>{selectedColumn.name}</span>
                            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4"/></svg>
                        </div>
                        <ul className={selectState!}>
                            {columns.map((column:any)=>(
                                column.boardId === board &&  
                                <li key={column.id} onClick={()=>selectOptionHandler(column)} 
                                className={`${column.id === selectedColumn.id} opt`}>{column.name}</li>
                            ))}
                        </ul>
                    </div>
                    <button className="tasks-btn" onClick={e=>createTask(e)}>Create Task</button>
                </form>
            </div>
            <div className="bg" onClick={()=> setAddNewTaskModal(false)}></div>
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
        color: ${({theme})=>theme.font2};
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
            width: 100%;
            outline: none;
            &:focus{
                border: 1px solid #635fc7;
                background-color: ${({theme})=>theme.darkBg};
            }
            &.red{
                border: 1px solid #f00;
            }
        }
        div{
            position: relative;
            i{
            position: absolute;
            top: calc(50% - 6px);
            color: #f00;
            right: 10px;
            font-size: 12px;
        }
        }
        
        h1{
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 15px;
            color: ${({theme})=>theme.font2};
        }
        label, span{
            display: block;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 5px;
            margin-top: 15px;
            color: ${({theme})=>theme.font2};
        }
       
        button{
            width: 100%;
            padding: 10px;
            border-radius: 25px;
            border: none;
            outline: none;
            font-weight: 600;
        }
        .subtasks{
            width: 100%;
            span{
                margin-bottom: 0;
            }
            div{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 5px;
                margin-bottom: 10px;
                input{
                    width: 90%;
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
            .subtasks-btn{
                background: (#635FC7,#fff);
                color: #635fc7;
                cursor: pointer;
                transition: background-color .3s cubic-bezier(0.165, 0.84, 0.44, 1);
                &:hover{background-color:#b7b5f0;}
            }
        }
        .select{
            width: 100%;
            position: relative;
            .selected-option{
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: transparent;
                border: 1px solid #828FA3;
                color: #fff;
                border-radius: 5px;
                width: 100%;
                height: fit-content;
                padding: 10px;
                cursor: pointer;
                &.active{
                    border: 1px solid #635fc7;
                }
                span{
                    margin: 0;
                }
            }
            ul{
                border-radius: 5px;
                overflow: hidden;
                display: none;
                position: absolute;
                width: 100%;
                background-color: ${({theme})=>theme.bg};
                top: 115%;
                &.active{
                    display: block;
                }
                &.hidden{
                    display: none;
                }
                li{
                    padding: 10px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #828FA3;
                    cursor: pointer;
                    &.true{
                    background-color: ${({theme})=>theme.darkBg};
                    }
                    &:hover{
                    border: 1px solid #635fc7;
                    }
                }
            }
        }
        .tasks-btn{
            background-color: #635fc7;
            color: #fff;    
            margin-top: 15px;
            cursor: pointer;
            transition: background-color .3s cubic-bezier(0.165, 0.84, 0.44, 1);
            &:hover{background-color:#A8A4FF;}
        }
    }
`