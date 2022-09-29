import { createContext, useContext, useState, useEffect } from 'react';
import db from '../firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, where, query} from 'firebase/firestore';
import { data } from '../types/data';
import { useNavigate } from 'react-router-dom';
import { uuidv4 } from '@firebase/util';
import { idText } from 'typescript';


export const dataContext = createContext<any>(true);
export const useData = () =>{
    const context = useContext(dataContext);
    return context
}

export default function DataProvider({children} : any){

    const [columns, setColumns] = useState<any>([]);
    const [tasks, setTasks] = useState<any>([]);
    const [boards, setBoards] = useState<any>(null);
    const [deita, setDeita] = useState<any>(null)
    const navigate = useNavigate()
    // const q = query(dataCollectionRef,where('Boards', '==', true))
 

    const getData = async (d : any) =>{
      const rawData = await getDocs(d);
      const data : any = rawData.docs.map((doc : any)=>({...doc.data(), id: doc.id}));
			const boards : Array<any> = []
			data.map((x : any)=>(
				boards.push(x.board)
			))
			setBoards(boards)
    }
    const createData = async () =>{
      if(!localStorage.getItem('database')){
					localStorage.setItem('database', 'leandro')
          const dataCollectionRef = collection(db,'leandro');
          await addDoc(dataCollectionRef,{board : 'plataform launch', date : Date()});
          getData(dataCollectionRef);
					return
      }
			const dataCollectionRef = collection(db,(localStorage.getItem('database')!));
      getData(dataCollectionRef);
    }


    useEffect(()=>{
        createData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return(
        <dataContext.Provider 
        value={{
            columns,
            tasks,
            boards,
            deita,
            // getData,
            // updateTask
        }
        }>
            {children}
        </dataContext.Provider>
    )
}