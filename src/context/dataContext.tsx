import { createContext, useContext, useEffect, useState} from 'react';
// import db from '../firebase';
// import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, where, query} from 'firebase/firestore';
// import { data } from '../types/data';
// import { useNavigate } from 'react-router-dom';
import { uuidv4 } from '@firebase/util';
// import { idText } from 'typescript';


export const dataContext = createContext<any>(true);
export const useData = () =>{
    const context = useContext(dataContext);
    return context
}

export default function DataProvider({children} : any){

    const [boards, setBoards] = useState<any>([{name:'Plataform Launch',id:uuidv4()}]);
    const [columns, setColumns] = useState<any>([]);
    const [tasks, setTasks] = useState<any>([])
    const [selectedBoard, setSelectedBoard] = useState<any>();
    useEffect(()=>{
        setSelectedBoard(boards[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    return(
        <dataContext.Provider 
        value={{
            boards,
            setBoards,
            columns,
            setColumns,
            tasks,
            setTasks,
            selectedBoard,
            setSelectedBoard
        }
        }>
            {children}
        </dataContext.Provider>
    )
}