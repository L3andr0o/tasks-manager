import { createContext, useContext, useState, useEffect } from 'react';
import db from '../firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc} from 'firebase/firestore';
import { data } from '../types/data';
import { useNavigate } from 'react-router-dom';


export const dataContext = createContext<any>(true);
export const useData = () =>{
    const context = useContext(dataContext);
    return context
}

export default function DataProvider({children} : any){

    const dataCollectionRef = collection(db,'data');
    const [columns, setColumns] = useState<any>([]);
    const [tasks, setTasks] = useState<any>([]);
    const [boards, setBoards] = useState<any>(null);
    const [deita, setDeita] = useState<any>(null)
    const navigate = useNavigate()
 

    const getData = async () =>{
        const rawData = await getDocs(dataCollectionRef);
        const data : any = rawData.docs.map((doc)=>({...doc.data()}));
        data.map((d:any)=>(
            setBoards(d.Boards)
        ))
        setDeita(data)
    }
    const updateTask = async ( updated : any) =>{
        const taskDoc = doc(db, 'data','ubI9ffbebRJj7P7WaNb8');
        let taskUpdated 
        taskUpdated = {'columns' : [...columns,{'name' : 'Lennoon'}]}
        await updateDoc(taskDoc, taskUpdated);
      }
    

    useEffect(()=>{
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        const name = boards && boards[0].name.replace(' ', '_');
        boards && navigate(`/${name}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[boards])


    return(
        <dataContext.Provider 
        value={{
            columns,
            tasks,
            boards,
            deita,
            getData,
            updateTask
        }
        }>
            {children}
        </dataContext.Provider>
    )
}