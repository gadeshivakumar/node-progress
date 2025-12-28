import { React,useContext} from "react";
import AuthContext from "./AuthContext";
import { Navigate } from "react-router-dom";
const ProtectedRoute=({allow,children})=>{

    const {user,setUser,loading}=useContext(AuthContext);
    console.log(user);
    if(loading) return <h1>Loading.....</h1>
    if(!user) return <Navigate to="/"/>
    try{
        if(allow.includes(user.role)){
            return children
        }
    }
    catch(err){
        return <Navigate to="/login" />
    }
}

export default ProtectedRoute;
