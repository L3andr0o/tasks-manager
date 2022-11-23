import { createContext, useContext, useEffect, useState} from 'react';
import { uuidv4 } from '@firebase/util';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import db from '../firebase';
import { useAuth } from './authContext';


export const dataContext = createContext<any>(true);
export const useData = () =>{
    const context = useContext(dataContext);
    return context
}

export default function DataProvider({children} : any){

    const [boards, setBoards] = useState<any>([{name:'Plataform Launch',id:uuidv4()}]);
    const [columns, setColumns] = useState<any>([]);
    const [tasks, setTasks] = useState<any>([])
    const [selectedBoard, setSelectedBoard] = useState<any>(null);
    const [id, setId] = useState<string | null>(null);
    const {user} = useAuth();

    const getData = async (board:any)=>{
        if(user){
            const dataCollection = collection(db,user.uid);
            const rawData = await getDocs(dataCollection);
            const data = rawData.docs.map((doc:any)=>({...doc.data(),id:doc.id}));
            if(data.length > 0){
                setSelectedBoard(board ? board : data[0].boards[0])
                setId(data[0].id);
                setBoards(data[0].boards)
                setColumns(data[0].columns)
                setTasks(data[0].tasks)
                return
            }addDoc(dataCollection,{boards : boards,columns : columns, tasks : tasks});
            setSelectedBoard(boards[0])
        }else{
            console.log('no user login')
        }
    }
    useEffect(()=>{
        getData(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])

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
            setSelectedBoard,
            id,
            getData
        }
        }>
            {children}
        </dataContext.Provider>
    )
}