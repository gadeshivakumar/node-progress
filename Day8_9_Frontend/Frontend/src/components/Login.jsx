import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

export default function Login() {
  const { setUser, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Login failed");
        }
        return res.json();
      })
      .then((data) => {
        setUser({
          username: data.username,
          role: data.role,
          email: data.email,
        });
        navigate("/");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Email :</label>
        <input type="email" name="email" required />

        <label>Password :</label>
        <input type="password" name="password" required />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
