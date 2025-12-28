import React, { useEffect ,useContext,useState} from 'react'
import { AuthContext } from './AuthContext'
import { useNavigate } from 'react-router-dom'
export default function ViewTasks() {

    const [tasks,setTasks]=useState([])
    const {user,reload,setReload}=useContext(AuthContext)
    const navigator=useNavigate();
    useEffect(()=>{
        fetch(`http://localhost:5000/api/users/${user.email}/view-tasks`,{
            method:"get",
            credentials:"include"
        })
        .then(res=>{
            if(res.ok){
                return res.json()
            }
            else{
                throw new Error("no tasks found")
            }
        })
        .then(res=>{
            setTasks(res.tasks)
        })
        .catch(err=>console.log(err))
    },[reload])

    function handleUpdate(id){

    }

    function handleDelete(id){
        fetch(`http://localhost:5000/api/users/${user.email}/delete-task/${id}`, {
            method: "DELETE",
            credentials: "include"
        })
        .then((res)=>{
            if(res.ok){
                if(reload==0) setReload(1)
                else setReload(0);
                console.log("deleted task")
            }
        })
        .catch(err=>{
            console.log("something went wrong")
        })
    }

  return (
    <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td colSpan="4" align="center">No tasks found</td>
          </tr>
        ) : (
          tasks.map(task => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={()=>navigator('/update-task',{state:{task:{title:task.title,desc:task.description,status:task.status}}})}>
                  Update
                </button>{" "}
                <button onClick={()=>handleDelete(task._id)} >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
