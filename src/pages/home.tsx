import React, { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyles } from '../assets/globalStyles/globalStyles';
import AddNewTaskModal from '../components/addNewTaskModal';
import EditBoardModal from '../components/editBoardModal';
import NavBar from '../components/navbar';
import { useModals } from '../context/modalsContext';

export default function Home(){

    const {editBoardModal, addNewTaskModal, setEditBoardModal} = useModals()
    const [columns, setColumns] = useState<any>([]);

    const addColumn = (e:any,name : string) =>{
        e.preventDefault()
        columns.push(name)
        console.log(columns)
    }

    return(
        <Wrapper>
            <GlobalStyles />
            <NavBar />
                {
                    (columns < 1) ?
                    <div className="content">
                        <div className="empty">
                            <h1>This board is empty. Create a new column to get started.</h1>
                            <button onClick={()=> setEditBoardModal(true)}>+ Add New Column</button>
                        </div>
                    </div>
                    :
                    <div>holaa</div>
                }
                {
                    (editBoardModal) && <EditBoardModal fun={addColumn}/>
                }
                {
                    (addNewTaskModal) && <AddNewTaskModal />
                }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;
    background-color: #20212c;
    min-height: 100vh;
    height: 100%;
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