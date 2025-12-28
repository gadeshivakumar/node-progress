import {React,useContext} from "react"
import AuthContext from "./AuthContext";
export default function Profile(){
    const {user,setUser}=useContext(AuthContext);
    return(
    <>
    <h1>Username:{user.username}</h1>
    <h1>Email   :{user.email}</h1>
    <h1>Role    :{user.role}</h1>
    </>
    );

}