import { createContext, useContext, useState} from 'react';
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

    const [boards, setBoards] = useState<any>(['Plataform Launch']);
    const [columns, setColumns] = useState<any>([]);
    const [tasks, setTasks] = useState<any>([])
    

    return(
        <dataContext.Provider 
        value={{
            boards,
            setBoards,
            columns,
            setColumns,
            tasks,
            setTasks
        }
        }>
            {children}
        </dataContext.Provider>
    )
}