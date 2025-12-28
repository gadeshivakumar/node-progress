import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/login";
import Signup from "./components/signup";
import Profile from "./components/profile";
import Admin from "./components/Admin";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import Manager from "./components/Manager";
import AuthContext from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
export default function App() {

  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    fetch("http://localhost:5000/api/auth/isLogin",{
      method:"get",
      credentials:"include"
    })
    .then((res)=>{
        return res.json();
    })
    .then(data=>{
      console.log(data);
      setUser({role:data.role,email:data.email,username:data.username});
    })
    .catch(err=>{
      console.log("please Log in to continue");
      setUser(null);
    })
    .finally(()=>{
      setLoading(false)
    }
    )
  }
  ,[])

  return (
    <AuthContext.Provider value={{user,setUser,loading,setLoading}} >
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProtectedRoute allow={["user","admin","manager"]}>
                                            <Profile /> 
                                        </ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allow={["admin"]}>
                                            <Admin />
                                      </ProtectedRoute>} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<ProtectedRoute allow={["user","admin","manager"]}>
                                            <Dashboard /> 
                                        </ProtectedRoute>}/>
        <Route path="/Manager" element={<ProtectedRoute allow={["user","manager"]}>
                                            <Manager /> 
                                        </ProtectedRoute>}/>
    
      </Routes>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}
