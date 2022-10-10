import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyles } from '../assets/globalStyles/globalStyles';
import AddNewTaskModal from '../components/addNewTaskModal';
import EditBoardModal from '../components/editBoardModal';
import NavBar from '../components/navbar';
import { useModals } from '../context/modalsContext';
import { useAuth } from '../context/authContext';
import { useData } from '../context/dataContext';
import IndvTask from '../components/indvTask';
import { useNavigate } from 'react-router-dom';


export default function Home(){

    const {editBoardModal, addNewTaskModal, setEditBoardModal,taskState, setTaskState, setSelectedTask} = useModals()
    const {user, logout} = useAuth();
    const {columns,tasks} = useData();
    const navigate = useNavigate();

    const showTask = (task:any) =>{
        setTaskState(true);
        navigate(task.id)
    }

    console.log(user)
    const handleLogout = async () =>{
        try {
            await logout();
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <Wrapper>
            <GlobalStyles />
            <NavBar />
                {
                    columns.length === 0
                    ?
                    <div className="content">
                        <div className="empty">
                            <h1>This board is empty. Create a new column to get started.</h1>
                            <button onClick={()=> setEditBoardModal(true)}>+ Add New Column</button>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                    :
                    <div className='columns'>
                        <div className="container">
                        {columns.map((column:any)=>(
                            <div className="column" key={column.id}>
                                <h1>
                                    {column.name}
                                    <span>
                                        ( {tasks.filter((task:any)=>task.column === column.name).length} )
                                    </span>
                                </h1>
                                {
                                    // eslint-disable-next-line array-callback-return
                                    tasks.map((task:any)=>{
                                        if(task.column === column.name){
                                          return(
                                             <div key={task.id} className='task' onClick={()=>showTask(task)}>
                                                <h1>{task.title}</h1>
                                                <h2>{
                                                task.subtasks.filter((subtask:any)=>subtask.completed === false).length} of {task.subtasks.length} subtasks
                                                </h2>
                                            </div>)
                                        }
                                    })
                                }
                            </div>
                        ))}
                        </div>
                    </div>

                }
                { editBoardModal && <EditBoardModal />}
                {addNewTaskModal && <AddNewTaskModal />}
                {taskState && <IndvTask />}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;
    background-color: #20212c;
    min-height: 100vh;
    height: 100%;
    overflow: hidden;
    .columns{
        max-width: 98vw;
        width: fit-content;
        height: 82vh;
         overflow: scroll;
        /* display: flex;
        background-color: #2d3;  */
        margin: 20px auto;
        .container{
            display: flex;
            overflow: scroll;
            width: fit-content;
            max-width: 1000vw;
            height: 100%;
            .column{
            width: 17em;
            height: 100%;
            margin: 0 10px;
            /* background-color: #000; */
            h1{
                color: #ccc;
                text-transform: uppercase;
                font-size: 14px;
                font-weight: 300;

            }
            .task{
                width: 100%;
                background-color: #2b2c37;
                border-radius: 5px;
                padding: 20px 15px;
                margin-top: 20px;
                h1{
                    color: #fff;
                    font-weight: 600;
                    text-transform: none;
                }
                h2{
                    color:#ccc;
                    font-size: 12px;
                    font-weight: 200;
                    margin-top: 10px;
                }
            }
        }
        }
    }
    .content{
        height: 90vh;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* background-color: #000; */
        .empty{
        margin: 0 auto;
        width: 80%;
        max-width: 30em;
        text-align: center;
        background-color: #20212c;

        h1{
            font-size: 18px;
            color: #9292af;
        }
        button{
            background-color: #635fc7;
            border: none;
            outline: none;
            color: #fff;
            padding: 15px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            margin-top: 15px;
        }
    }
    }
`