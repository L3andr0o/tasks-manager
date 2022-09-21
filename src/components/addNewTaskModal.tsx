import { useState } from "react"
import styled from "styled-components"

export default function AddNewTaskModal(){

    const [selectState, setSelectState] = useState<string | null>(null);
    const selectHandler =  ()=> (selectState === 'active') ? setSelectState('hidden') : setSelectState('active');

    return(
        <Wrapper>
            <div className="modal">
                <h1>Add New Task</h1>
                <form>
                    <label htmlFor="task">Title</label>
                    <input type="text" placeholder="e.g. Take coffee break" id="title" name="title"/>
                    <label htmlFor="description">Description</label>
                    <input type="text" placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little." id="description" name="description" />
                    <div className="subtasks">
                        <span>Subtasks</span>
                        <div>
                            <input type="text" placeholder="e.g. Make a coffee" />
                            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                        </div>
                        <div>
                            <input type="text" placeholder="e.g. Drink coffe & Smile" />
                            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                        </div>
                        <button className="subtasks-btn">+ Add New Subtask</button>
                    </div>
                    <div className='select'>
                        <span>Status</span>
                        <div className='selected-option' onClick={selectHandler}>
                            <span>Todo</span>
                            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4"/></svg>
                        </div>
                        <ul className={selectState!}>
                            <li>Todo</li>
                            <li>Doing</li>
                            <li>Done</li>
                        </ul>
                    </div>
                    <button className="tasks-btn">Create Task</button>
                </form>
            </div>
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
        input{
            background-color: transparent;
            border: 1px solid #ffffff28;
            color: #fff;
            border-radius: 5px;
            padding: 10px;
            width: 100%;
        }
        h1{
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 15px;
        }
        label, span{
            display: block;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 5px;
            margin-top: 15px;
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
            }
            .subtasks-btn{
                background-color: #fff;
                color: #635fc7;
            }
        }
        .select{
            width: 100%;
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
        .tasks-btn{
            background-color: #635fc7;
            color: #fff;    
            margin-top: 15px;
        }
    }
`