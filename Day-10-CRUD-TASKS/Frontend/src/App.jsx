import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./pages/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./pages/ProtectedRoute";
import Admin from "./pages/Admin";
import Manager from "./pages/Manager";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/CreateTask";
import Error from "./pages/Error";
import Update from "./pages/Update";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload,setReload]=useState(0);
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/isLogin", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => {
        setUser({
          username: data.username,
          role: data.role,
          email: data.email,
        });
        // navigator('/dashboard')
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading,reload,setReload}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "user", "manager"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <Manager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-task"
            element={
              <ProtectedRoute allowedRoles={["user","admin", "manager"]}>
                <CreateTask />
              </ProtectedRoute>
            }
          />

          <Route
            path="/update-task"
            element={
              <ProtectedRoute allowedRoles={["user","admin", "manager"]}>
                <Update />
              </ProtectedRoute>
            }
          />
          
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
