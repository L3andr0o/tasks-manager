import { createContext, useContext, useState } from 'react';


export const modalsContext = createContext<any>(true);
export const useModals = () =>{
    const context = useContext(modalsContext);
    return context
}

export default function ModalsProvider({children} : any){

    const [editBoardModal, setEditBoardModal] = useState<boolean>(false);
    const [addNewTaskModal, setAddNewTaskModal] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [taskState, setTaskState] = useState<any>(false);
    const [addNewBoardModal, setAddNewBoardModal] = useState<any>(false);
    const [deleteTaskModal, setDeleteTaskModal] = useState<boolean>(false);
    const [editTaskModal,setEditTaskModal] = useState<boolean>(false);
    const [deleteBoardModal,setDeleteBoardModal] = useState<boolean>(false);

    return(
        <modalsContext.Provider 
        value={{
            editBoardModal,
            addNewTaskModal,
            setEditBoardModal,
            setAddNewTaskModal,
            selectedTask,
            setSelectedTask,
            taskState,
            setTaskState,
            addNewBoardModal,
            setAddNewBoardModal,
            deleteTaskModal,
            setDeleteTaskModal,
            editTaskModal,
            setEditTaskModal,
            deleteBoardModal,
            setDeleteBoardModal
            }}>
            {children}
        </modalsContext.Provider>
    )

}