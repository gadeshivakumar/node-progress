import React from 'react'
import { AuthContext } from './AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const {user,setUser}=useContext(AuthContext)
    const navigate=useNavigate()

    function handleSubmit(e){
        e.preventDefault();
        fetch("http://localhost:5000/api/auth/login",{
            method:"post",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email:e.target.email.value,
                password:e.target.password.value
            })
        })
        .then(res=>res.json())
        .then(data=>{
            setUser({
                    username:data.username,
                    role:data.role,
                    email:data.email
                })
            navigate("/dashboard")
        })
        .catch(err=>{
            console.log("error :",err);
        })
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="" /> <br />
        <label htmlFor="password">Password :</label>
        <input type="password" name="password" id="" /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
