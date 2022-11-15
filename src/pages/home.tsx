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
import { useNavigate, useParams } from 'react-router-dom';
import AddNewBoardModal from '../components/addNewBoardModal';
import DeleteTaskModal from '../components/deleteTaskModal';
import EditTaskModal from '../components/editTaskModal';
import DeleteBoardModal from '../components/deleteBoardModal';
import { useTheme } from '../context/themeContext';

export default function Home(){

  const {editBoardModal, addNewTaskModal, setEditBoardModal,taskState, setTaskState, addNewBoardModal,setSelectedTask,deleteTaskModal,editTaskModal,deleteBoardModal} = useModals()
  const {user, logout} = useAuth();
  const {columns,tasks,selectedBoard,boards} = useData();
  const [boardTasks, setBoardTasks] = useState<any>(null);
  const [boardColumns, setBoardColumns] = useState<any>([]);
  const navigate = useNavigate();
  const boardId = useParams();
  const {theme} = useTheme();

  const showTask = (task:any) =>{  
  	setTaskState(true);
		setSelectedTask(task)
};
  
  const handleLogout = async () =>{
    try {
      await logout();
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(()=>{
    navigate(`/${selectedBoard.id}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(()=>{
    setBoardColumns(columns.filter((column:any)=>column.boardId === boardId.board));
    setBoardTasks(tasks.filter((task:any)=>task.board === boardId.board));
  },[columns,boardId,tasks])

  return(
    <Wrapper theme={theme}>
        <GlobalStyles />
        <NavBar />
        {
          boardColumns.length === 0
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
              {boardColumns.length > 0 && boardColumns.map((column:any)=>(
              <div className="column" key={column.id}>
                <h1>
                  {column.name} 
                  <span>
                    ( {tasks.filter((task:any)=>task.column === column.id).length} )
                  </span>
                </h1>
                  {
                  // eslint-disable-next-line array-callback-return
                  boardTasks && boardTasks.map((task:any)=>{
                    if(task.column === column.id && task.board === boardId.board){
                      return(
                        <div key={task.id} className='task' onClick={()=>showTask(task)}>
                          <h1>{task.title}</h1>
                          <h2>{
                          task.subtasks.filter((subtask:any)=>subtask.completed === true).length} of {task.subtasks.length} subtasks
                          </h2>
                        </div>)
                    }
                  })
                  }
              </div>
              ))} 
              <div className="addColumn" onClick={()=>setEditBoardModal(true)}>
                <span>+ New Column</span>
              </div>
            </div>
            
          </div>
        }
        {editBoardModal && <EditBoardModal />}
        {addNewTaskModal && <AddNewTaskModal />}
        {taskState && <IndvTask />}
        {addNewBoardModal && <AddNewBoardModal />}
        {deleteTaskModal && <DeleteTaskModal />}
        {editTaskModal && <EditTaskModal />}
        {deleteBoardModal && <DeleteBoardModal />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  background-color: ${({theme})=>theme.darkBg};
  min-height: 100vh;
  height: 100%;
  overflow: hidden;
  .columns{
    max-width: 98vw;
    width: fit-content;
    height: 86vh;
    overflow: scroll;
    margin: 20px auto;
    .container{
      display: flex;
      overflow: scroll;
      width: fit-content;
      max-width: 1000vw;
      height: 100%;
      padding-right: 20px;
      .column{
        width: 17em;
        height: 100%;
        margin: 0 10px;
        h1{
          color: ${({theme})=>theme.font};
          text-transform: uppercase;
          font-size: 14px;
          font-weight: 300;
          }
        .task{
          width: 100%;
          background-color: ${({theme})=>theme.bg};
          border-radius: 5px;
          padding: 20px 15px;
          margin-top: 20px;
        h1{
          color: ${({theme})=>theme.font2};
          font-weight: 600;
          text-transform: none;
          }
        h2{
          color:${({theme})=>theme.font};
          font-size: 12px;
          font-weight: 200;
          margin-top: 10px;
          }
        }
      }
      .addColumn{
        width: 17em;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(${({theme})=>theme.bg},#0001);
        border-radius: 5px;
        span{
          color: ${({theme})=>theme.font};
          font-size: 22px;
          font-weight: 600;
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
    .empty{
      margin: 0 auto;
      width: 80%;
      max-width: 30em;
      text-align: center;
      background-color: ${({theme})=>theme.darkBg};
      h1{
        font-size: 18px;
        color: #9292af;
      }
      button{
        background-color: ${({theme})=>theme.primaryColor};
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