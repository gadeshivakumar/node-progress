import React,{useContext} from 'react'
import { AuthContext } from './AuthContext'
import CreateTask from './CreateTask';
import ViewTasks from './ViewTasks';
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {

    const {user,setUser}=useContext(AuthContext);
    const navigator=useNavigate();

  return (
    <div>
      <h1>Profile</h1>
      <span><h2>username: {user.username}</h2></span>
      <span><h2>email   :{user.email}</h2></span>
      <span><h2>role    :{user.role}</h2></span>

      <h1>Create new task :</h1>
      <button onClick={()=>navigator("/create-task")}>create new task</button>
       
       <div className="menu">
        <button onClick={()=>navigator('/admin')}>Admin</button>
        <button onClick={()=>navigator('/manager')}>Manager</button>
       </div>
       <h1>Task History</h1>
       <ViewTasks/>
    </div>
  )
}
