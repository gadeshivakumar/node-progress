import React,{useContext, useEffect,useState} from 'react'
import { AuthContext } from './AuthContext'
export default function Admin() {
  const user=useContext(AuthContext)
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    console.log("hello")
    fetch('http://localhost:5000/api/users/get-users',{
      method:"get",
      credentials:"include"
    })
    .then((res)=>{
      if(res.ok){
        console.log("thumbsUp")
        return res.json()
      }
      else{
        console.log("thumbsdown");
        
        throw new Error("something went wrong")
      }
    })
    .then(res=>setUsers(res.data))
    .catch(err=>{
      console.log('something gone wrong')
  })
  },[])

  function handleAdmin(id){
    fetch(`http://localhost:5000/api/users/${id}/make-admin`,{
      method:"PATCH",
      credentials:"include",
      // headers:{"Content-Type":"application/json"}
    })
    .then((res)=>{
      if(res.ok)
      return res.json()
      else throw new Error("gone wrong")
    })
    .catch(err=> console.log("something gone wrong"))
  }
  return (
    <div>
      <h1>
        Welcome Admin Mr.{user.username}
      </h1>
      <div className="users">
          { users.map((u)=>{
                return (
                  <div key={u._id} style={{
                    display:"flex",
                    flexWrap:"wrap",
                    margin:"15px",
                    padding:"20px"
                  }}>
                  <span><p>{u.username}</p></span>
                  <span><p>{u.role}</p></span>
                  <span>{u.role!=="admin" && <button onClick={()=>handleAdmin(u.email)}>make Admin</button>}</span>
                  <span><button>view tasks</button></span>
                  <span><button>delete User</button></span>
                  </div>
                )
            })
          }
      </div>
    </div>
  )
}
