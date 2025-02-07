import { useState } from "react";
import "./App.css";


function Login() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [acceptableEmail, setAcceptableEmail] = useState(true);
    const [acceptablePassword, setAcceptablePassword] = useState(true);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Login attempt:", { email, password });
      console.log(typeof(email));
      if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) { //regex for email validation
        setAcceptableEmail(false);
      }
      if(password.length < 10 || !/[A-Z]/.test(password) || !(/[!@#$%^&*(),.?":{}|<>]/.test(password))) { //checks for valid ength > 10, uppercase character, and special character
        setAcceptablePassword(false);
      }
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
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {!acceptableEmail && (
            <div>
              <span style={{ color: "red" }}>Email format not accepted</span>
            </div>
          )}
        <div>
          <input
            id="password-input"
            type="password"
            placeholder="Create a Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!acceptablePassword && (
            <div>
              <span style={{ color: "red" }}>Password format not accepted</span>
            </div>
          )}
        <button id="submit-button" disabled={email.length < 5 || password.length < 5}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Login;
