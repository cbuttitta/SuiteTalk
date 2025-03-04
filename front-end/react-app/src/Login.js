import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset error state

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      // ✅ Use response.data (not res.json())
      localStorage.setItem("token", response.data.token);
      //Set login context for use in other pages
      console.log(response.data.message);
      login(response.data.token.username, response.data.token);
      navigate("/"); //redirect to app page;
    } catch (err) {
      // ✅ Use err.response.data.error to get error message from backend
      console.log(err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="centered-content">
      <h2 id="logo">SuiteTalk</h2>
      <p id="slogan">Connect with your community!</p>

      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <input
            className="value-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            className="value-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <button
          id="submit-button"
          disabled={username.length < 1 || password.length < 1}
        >
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
