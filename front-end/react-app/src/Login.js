import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Signup from "./Signup";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login attempt:", { email, password });
    // Add authentication logic here
  };

  return (
    
    <div className="centered-content">
      <h2 id="logo">SuiteTalk</h2>
      <p id="slogan">Connect with your community!</p>

      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <input
            id="email-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            id="password-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button id="submit-button" disabled={email.length < 5 || password.length < 5}>
          Login
        </button>

        <span id="login-option">
          Don't have an account? <Link to="/Signup">Sign up</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
