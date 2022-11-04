import styled from "styled-components"
import { useData } from "../context/dataContext";
import { useModals } from "../context/modalsContext"

export default function DeleteTaskModal(){

    const {setDeleteTaskModal,selectedTask} = useModals();
    const {tasks,setTasks} = useData();
    
    const deleteTask = (e:any) =>{
        e.preventDefault()
        const tasksAct = tasks.filter((task:any)=>task.id !== selectedTask.id);
        setTasks(tasksAct);
        setDeleteTaskModal(false)
    }

    return(
        <Wrapper>
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
        z-index: 250;
        background-color:#0003;
    }
    .modal{
        width: 90%;
        background-color: #2b2c37;
        padding: 20px;
        border-radius: 5px;
        max-width: 25em;
        animation: show .3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s 1 normal forwards;
        transform: scale(0);
        z-index: 300;
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
            }
            &.cancelBtn{
                background-color: #fff;
                color: #635FC7;
            }
        }
    }

`