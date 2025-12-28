import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import { useEffect } from 'react';
export default function LandingPage() {
    
    const navigator=useNavigate();
    const {user,loading,setLoading}=useContext(AuthContext)

    useEffect(()=>{
        if(user){
            navigator("/dashboard");
        }
    },[loading,user])

    return (
    <div>
      <button onClick={()=>navigator("/login")}>Login</button>
      <button onClick={()=>navigator("/signup")}>Signup</button>
    </div>
  )
}
