import styled from "styled-components"
import {useState,useEffect} from 'react';
import { useData } from "../context/dataContext";
import { useModals } from "../context/modalsContext";
import { useNavigate, useParams } from "react-router-dom";


export default function IndvTask(){


  const {columns,tasks} = useData();
  const {setTaskState, selectedTask,setDeleteTaskModal,setEditTaskModal} = useModals()
  const [selectedColumn, setSelectedColumn] = useState<any>();
  const [selectState, setSelectState] = useState<string | null>(null);
  const [boardColumns, setBoardColumns] = useState<any>([]);
  const [menuState, setMenuState] = useState<boolean>(false);
  const navigate = useNavigate();
  const board = useParams()

  const closeModal = () =>{
    setTaskState(false);
    navigate(`/${board.board}`);
    selectedTask.column = selectedColumn
  }

  const selectHandler =  ()=> (selectState === 'active') ? setSelectState('hidden') : setSelectState('active');
  const menuHandler = ()=> menuState ? setMenuState(false) : setMenuState(true);
  const deleteModalHandler = () =>{
    setDeleteTaskModal(true);
    setTaskState(false);
  }
  const editModalHandler = () =>{
    setEditTaskModal(true);
    setTaskState(false)
  }

  const actSubtaskState = (e:any,subtask : any) =>{
    subtask.completed = e.target.checked;
    console.log(tasks)
  }
  useEffect(()=>{
    setBoardColumns(columns.filter((column:any)=>column.boardId === board.board));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(()=>{
    // eslint-disable-next-line array-callback-return
    boardColumns.map((column:any)=>{
      if(column.name === selectedTask.column){
        setSelectedColumn(column.name);
        return column
      }else{ console.log('xd')}
    })
  },[boardColumns,selectedTask])

  return(
    <Wrapper>
      {selectedTask &&
        <div className="modal" key={selectedTask.id}>
          <div className="top">
            <h1>{selectedTask.title}</h1>
            <svg width='5' height='20' xmlns='http://www.w3.org/2000/svg' onClick={menuHandler}><g fill='#828FA3' fillRule='evenodd'><circle cx='2.308' cy='2.308' r='2.308'/><circle cx='2.308' cy='10' r='2.308'/><circle cx='2.308' cy='17.692' r='2.308'/></g></svg>
            {menuState && 
            <div className="taskMenu">
              <span className="editTask" onClick={editModalHandler} >Edit Task</span>
              <span className="deleteTask" onClick={deleteModalHandler} >Delete Task</span>
            </div>}
          </div>
          <p>{selectedTask.description}</p>
          <span>
            Subtasks ({selectedTask.subtasks.filter((subtask:any)=>subtask.completed === true).length} of {selectedTask.subtasks.length})
          </span>
          <div className="subtasks">
            {selectedTask.subtasks.map((subtask:any)=>(
              <div className="subtask" key={subtask.id}>
                <input type="checkbox" defaultChecked={subtask.completed} id={subtask.id} onChange={e=>actSubtaskState(e,subtask)} />
                <label htmlFor={subtask.id}>{subtask.content}</label>
              </div>
            ))}
          </div>
          <div className='select'>
            <span>Status</span>
            <div className='selected-option' onClick={selectHandler}>
              {(columns.length > 0) && <span>{selectedColumn}</span>}
              <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4"/></svg>
            </div>
            <ul className={selectState!}>
              {(columns.length > 0) &&
                columns.map((column:any)=>(
                  <li key={column.id} onClick={()=>setSelectedColumn(column.name)}>{column.name}</li>
                ))
              }
            </ul>
          </div>
        </div>}
      <div className="bg" onClick={()=>closeModal()}></div>
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
    }
    .modal{
      width: 90%;
      background-color: #2b2c37;
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
      p{
        font-size: 13px;
        color: #828FA3;
        margin: 20px 0 15px 0;
        text-justify: distribute;
        width: 100%;
        overflow-wrap: break-word;
      }
      span{
        font-size: 12px;
        margin-top: 20px;
      }
      .top{
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        position: relative;
        h1{
          font-size: 16px;
        }
        .taskMenu{
          position: absolute;
          right: -12%;
          z-index: 2000;
          bottom: -100px;
          display: flex;
          flex-direction: column;
          background-color: #20212C;
          width: 8em;
          padding: 10px;
          justify-content: space-around;
          height: 5em;
          border-radius: 5px;
          span{
            height: 50%;
            margin: 0;
            display: flex;
            align-items: center;
            &.editTask{
              color: #828FA3;
            }
            &.deleteTask{
              color: #EA5555;
            }
          }
        }
      }

      .subtasks{
        margin-top: 20px;
        .subtask{
          display: flex;
          align-items: center;
          background-color: #20212C;
          padding: 15px;
          font-size: 12px;
          border-radius: 5px;
          margin: 8px 0;
          label{
            margin-left: 10px;
            width: 100%;
          }
          input[type='checkbox']{
            transform: scale(1.2);
            &:checked{
            accent-color: #635FC7;
            }
            &:focus{
            accent-color: #837fda;
            }
            &:checked + label{
              text-decoration: line-through;
               color: #828FA3;
            }
          }
        }
      }
        .select{
          width: 100%;
          margin-top: 10px;
          .selected-option{
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: transparent;
            border: 1px solid #ffffff28;
            color: #fff;
            border-radius: 5px;
            width: 100%;
            height: fit-content;
            padding: 10px;
            margin-top: 5px;
            span{
              margin: 0;
            }
          }
          ul{
            border-radius: 5px;
            overflow: hidden;
            display: none;
            &.active{
              display: block;
            }
            &.hidden{
              display: none;
            }
            li{
              padding: 10px;
              border: 1px solid #ffffff28;
              font-size: 12px;
              font-weight: 600;
            }
          }
        }
  }

`