import { createContext, useContext, useState } from 'react';


export const modalsContext = createContext<any>(true);
export const useModals = () =>{
    const context = useContext(modalsContext);
    return context
}

export default function ModalsProvider({children} : any){

    const [editBoardModal, setEditBoardModal] = useState<boolean>(false);
    const [addNewTaskModal, setAddNewTaskModal] = useState<boolean>(false)

    return(
        <modalsContext.Provider 
        value={{
            editBoardModal,
            addNewTaskModal,
            setEditBoardModal,
            setAddNewTaskModal
            }}>
            {children}
        </modalsContext.Provider>
    )

}