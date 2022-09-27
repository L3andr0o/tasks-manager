import { createContext, useContext, useState, useEffect } from 'react';
import db from '../firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc} from 'firebase/firestore';
import { data } from '../types/data';

export const dataContext = createContext<any>(true);
export const useData = () =>{
    const context = useContext(dataContext);
    return context
}

export default function DataProvider({children} : any){

    const dataCollectionRef = collection(db,'data');
    const [columns, setColumns] = useState<any>([]);
    const [tasks, setTasks] = useState<any>([]);
    const [boards, setBoards] = useState<any>([]);
    const [deita, setDeita] = useState<any>(null)
    

    const getData = async () =>{
        const rawData = await getDocs(dataCollectionRef);
        const data : any = rawData.docs.map((doc)=>({...doc.data()}));
        setDeita(data)
        setColumns(data[0].columns);
        setBoards(data[0].boards);
        setTasks(data[0].tasks);
    }
    const updateTask = async ( updated : any) =>{
        const taskDoc = doc(db, 'data','IVSNxeQYIW1NHO5OGrZV');
        // console.log(columns)
        let taskUpdated 
        // taskUpdated.push(updated)
        taskUpdated = {'columns' : [...columns,{'name' : 'Lennoon'}]}
        // const xd = {taskUpdated}

        // const taskUpdated = {'columns' : [{'name' : updated, 'board' : 'Launch Board'},{'name' : 'College', 'board' : 'Launch Board'}]};
        await updateDoc(taskDoc, taskUpdated);
        
      }
    

    useEffect(()=>{
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


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