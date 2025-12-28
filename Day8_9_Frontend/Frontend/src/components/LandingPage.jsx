import React, { useEffect,useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "./AuthContext";
export default function LandingPage(){

    const navigator=useNavigate();
    const {user,setUser,loading,setLoading}=useContext(AuthContext);

    return(
        <>
        <center>
            <h1>Welcome to the page</h1>
            <button onClick={()=>navigator('/login')}>Login</button>
            <button onClick={()=>navigator('/signup')}>Signup</button>
            <button onClick={()=>navigator('/dashboard')}>Dashboard</button>
        </center>
        
        </>
    )
}