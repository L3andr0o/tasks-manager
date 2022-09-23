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

    const addColumn = (e: any, name : any, id : any) =>{
        e.preventDefault();
        
        columns.push({
            'name' : name,
            'id' : id
        })
        // setColumns(arr)
        console.log(columns)
    }




    return(
        <Wrapper>
            <GlobalStyles />
            <NavBar />
                {
                    (columns.length < 1) ?
                    <div className="content">
                        <div className="empty">
                            <h1>This board is empty. Create a new column to get started.</h1>
                            <button onClick={()=> setEditBoardModal(true)}>+ Add New Column</button>
                        </div>
                    </div>
                    :
                    <div className='columns'>
                        <div className="test">
                        {columns.map((column : any)=>(
                                <div className='column' id={column.id} key={column.id}>
                                    <h1>{column.name}</h1>
                                </div>
                        ))}
                        </div>
                    </div>
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
    overflow: hidden;
    .columns{
        max-width: 95vw;
        width: fit-content;
        height: 82vh;
         overflow: scroll;
        /* display: flex;
        background-color: #2d3;  */
        margin: 20px auto;
        .test{
            display: flex;
            background-color: #6af;
            overflow: scroll;
            width: fit-content;
            max-width: 1000vw;
            height: 100%;
            .column{
            width: 15em;
            height: 100%;
            margin: 0 10px;
            background-color: #000;
            h1{
                color: #f32;
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