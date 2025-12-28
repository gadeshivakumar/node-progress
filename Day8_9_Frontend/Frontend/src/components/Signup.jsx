import React from "react";

export default function Signup(){
    
    function handleSubmit(e){
        e.preventDefault();
        console.log("email:",e.target.email.value,
                "password:",e.target.password.value,
                "username:",e.target.username.value)
        fetch("http://localhost:5000/api/auth/signup",{
            method:"post",
            credentials:"include",
            headers: {
                     "Content-Type": "application/json"
                    },
            body:JSON.stringify({email:e.target.email.value,
                                 password:e.target.password.value,
                                 username:e.target.username.value})
        })
        .then()
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username :</label>
            <input type="text" name="username"  />
            <label htmlFor="email">Email :</label>
            <input type="email" name="email" />
            <label htmlFor="password">Password :</label>
            <input type="password" name="password" />
            <button type="submit">SignUp</button>
        </form>
        
        </>
    )

}