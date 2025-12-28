import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {

    const navigate=useNavigate();
    
    function handleSubmit(e){
        e.preventDefault();
        fetch("http://localhost:5000/api/auth/signup",{
            method:"post",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                username:e.target.username.value,
                email:e.target.email.value,
                password:e.target.password.value
            })
        })
        .then(res=>{
            if(res.ok){
                navigate("/login");
            }
        })
        .catch(err=>{
            console.log("error :",err);
        })
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="" /> <br />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="" /> <br />
        <label htmlFor="password">Password :</label>
        <input type="password" name="password" id="" /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
