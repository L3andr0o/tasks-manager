import { doc, updateDoc } from "firebase/firestore";
import styled from "styled-components"
import { useAuth } from "../context/authContext";
import { useData } from "../context/dataContext";
import { useModals } from "../context/modalsContext"
import { useTheme } from "../context/themeContext";
import db from "../firebase";

export default function DeleteTaskModal(){

    const {setDeleteTaskModal,selectedTask} = useModals();
    const {tasks,setTasks,boards,columns,id,getData} = useData();
    const {user} = useAuth();
    
    const deleteTask = async (e:any) =>{
        e.preventDefault()
        const tasksAct = tasks.filter((task:any)=>task.id !== selectedTask.id);
        setTasks(tasksAct);
        setDeleteTaskModal(false)
        const tasksDoc = doc(db,user.uid,id);
        const update = {boards : boards,columns : columns, tasks :  tasksAct}
        await updateDoc(tasksDoc, update);
        getData()
    }

    const {theme} = useTheme();

    return(
        <Wrapper theme={theme}>
            <div className="modal">
                <h1>Delete this task?</h1>
                <p>Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.</p>
                <button className="deleteBtn" onClick={e=>deleteTask(e)}>Delete</button>
                <button className="cancelBtn" onClick={()=>setDeleteTaskModal(false)} >Cancel</button>
            </div>
            <div className="bg" onClick={()=>setDeleteTaskModal(false)} ></div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
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
        background-color:#0003;
    }
    .modal{
        width: 90%;
        background-color: ${({theme})=>theme.bg};
        padding: 20px;
        border-radius: 5px;
        max-width: 25em;
        animation: show .3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s 1 normal forwards;
        transform: scale(0);
        z-index: 200;
        h1{
            color: #EA5555;
            font-size: 18px;
        }
        p{
            margin: 15px 0;
            color: #828FA3;
            font-size: 14px;
        }
        button{
            width: 100%;
            border-radius: 25px;
            margin: 5px 0;
            padding: 10px;
            border: none;
            outline: none;
            font-weight: 500;
            &.deleteBtn{
                background-color: #EA5555;
                color: #fff;
                cursor: pointer;
                transition: background-color .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                &:hover{background-color:#FF9898;}
            }
            &.cancelBtn{
                background: (#635FC7,#fff);
                color: #635FC7;
                cursor: pointer;
                transition: background-color .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                &:hover{background-color:#b7b5f0;}
            }
        }
    }

`