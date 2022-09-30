import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({children} : any){
    const {user, loader} = useAuth();

    if(loader) return <h1>loading</h1>
    if(!user) return <Navigate to='/login'/>

    return <>{children}</>
}