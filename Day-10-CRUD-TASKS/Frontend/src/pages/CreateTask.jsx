import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function CreateTask() {

    const navigator=useNavigate()
    const {reload,setReload} = useContext(AuthContext)
    function handleTask(e){
        e.preventDefault();
        fetch("http://localhost:5000/api/users/create-task",{
            method:"post",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                title:e.target.title.value,
                desc:e.target.desc.value,
                status:e.target.status.value
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
        <input type="text" name="title" id="" /><br />
        <label htmlFor="desc">Description</label>
        <input type="text" name="desc" id="" /><br />
        <label htmlFor="status">Status :   </label>
        <input type="radio" name="status" id="" value="completed" />
        <label htmlFor="status">completed</label>
        <input type="radio" name="status" id="" value="pending" defaultChecked/>
        <label htmlFor="status">pending</label>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
