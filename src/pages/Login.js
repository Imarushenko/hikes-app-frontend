import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAdmin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { password });
      if (response.status === 200) {
        setIsAdmin(true);
        // Use secret path from the .env file
        navigate(process.env.REACT_APP_SECRET_PATH);
      }
    } catch (err) {
      setError("Invalid password");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Admin Login</h1>
      <input
        type="password"
        placeholder="Enter Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control mb-3"
      />
      <button onClick={handleLogin} className="btn btn-primary">
        Login
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
