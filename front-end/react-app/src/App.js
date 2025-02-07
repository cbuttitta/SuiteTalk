import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ApartmentSearch from "./ApartmentSearch";
import NotFound from "./NotFound";
import Signup from "./Signup";



function App() {
  document.title = "SuiteTalk";

  return (
    <Router>

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/ApartmentSearch" element={<ApartmentSearch />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Login attempt:", { email, password });
      console.log(typeof(email));
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
          <p id="login-option">
            Don't have an account? <Link to="/Signup">Sign up</Link>
          </p>
        </form>
      </div>
    );
  
}

export default App;
