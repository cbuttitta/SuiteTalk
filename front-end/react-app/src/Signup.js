import { useState } from "react";
import "./App.css";

function Signup({setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptableEmail, setAcceptableEmail] = useState(true);
  const [acceptablePassword, setAcceptablePassword] = useState(true);
  const [username, setUsername] = useState("");
  const [acceptableUsername, setAcceptableUsername] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Login attempt:", { email, password });
    console.log(typeof email);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      //regex for email validation
      setAcceptableEmail(false);
    }
    if (
      password.length < 10 ||
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      //checks for valid length > 10, uppercase character, and special character
      setAcceptablePassword(false);
    }
    /*
      if(username is unique){setAcceptableUsername(true);} //check database for unique username
      */
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        username,
        email,
        password,
      });

      // Store JWT token
      localStorage.setItem("token", res.data.token);

      // Set user state
      setUser(res.data.user);
      setSuccess("Signup successful! Redirecting...");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
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
            id="username-input"
            type="text"
            placeholder="Create Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {!acceptableUsername && (
          <div>
            <span style={{ color: "red" }}>Username in use</span>
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
        {!error && (
          <div>
            <span style={{ color: "red" }}>{error} </span>
          </div>
        )}
        <button
          id="submit-button"
          disabled={email.length < 5 || password.length < 5}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
