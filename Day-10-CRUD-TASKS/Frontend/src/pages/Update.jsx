import React, { useContext, useState } from 'react'
import { useActionData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function Update() {

    const navigator=useNavigate()
    const locator=useLocation();
    const {reload,setReload} = useContext(AuthContext)
    const [task,setTask]=useState(locator.state.task)

    function handleChange(e){
        e.preventDefault();
        k=e.target.name
        setTask({...prev,[k]:e.target.value})
    }
    function handleTask(e){
        e.preventDefault();
        fetch("http://localhost:5000/api/users/update-task",{
            method:"put",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                title:task.title,
                desc:task.desc,
                status:task.status
            })
        })
        .then(res=>{
            if(res.ok){
                e.target.reset();
                if(reload==0){
                    setReload(1);
                }
                else{
                    setReload(0);
                }
                navigator("/dashboard")
            }
        })
        .catch(err=>{
            navigator('/error')
        })
    }
  return (
    <div>
      <form onSubmit={handleTask} >
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" id="" value={task.title} onChange={handleChange} /><br />
        <label htmlFor="desc">Description</label>
        <input type="text" name="desc" id=""  value={task.desc} onChange={handleChange}/><br />
        <label htmlFor="status">Status :   </label>
        <input type="radio" name="status" id="" value="completed" checked={task.status=="completed"}onChange={handleChange} />
        <label htmlFor="status">completed</label>
        <input type="radio" name="status" id="" value="pending" defaultChecked checked={task.status=="pending"}onChange={handleChange}/>
        <label htmlFor="status">pending</label>
        <button type="submit">update</button>
      </form>
    </div>
  )
}
