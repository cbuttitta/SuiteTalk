import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
  



function Login({setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Login attempt:", { email, password });
    // Add authentication logic here
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });

      // Store token in local storage
      localStorage.setItem("token", res.data.token);

      // Set user state
      setUser(res.data.user);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    
    <div className="centered-content">
      <h2 id="logo">SuiteTalk</h2>
      <p id="slogan">Connect with your community!</p>

      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <input
            id="value-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            id="value-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <button id="submit-button" disabled={email.length < 5 || password.length < 5}>
          Login
        </button>

        <p id="login-option">
          Don't have an account? <Link to="/Signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
