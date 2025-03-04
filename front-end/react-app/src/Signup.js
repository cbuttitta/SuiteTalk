import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApartmentSearch from "./ApartmentSearch";

function Signup({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptableEmail, setAcceptableEmail] = useState(true);
  const [acceptablePassword, setAcceptablePassword] = useState(true);
  const [username, setUsername] = useState("");
  const [apartment, setApartmentName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Signup attempt:", { email, username, password, apartment });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      //regex for email validation
      setAcceptableEmail(false);
    } else {
      setAcceptableEmail(true);
    }
    if (
      password.length < 10 ||
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      //checks for valid length > 10, uppercase character, and special character
      setAcceptablePassword(false);
    } else {
      setAcceptablePassword(true);
    }
    if (acceptableEmail && acceptablePassword) {
      try {
        const res = await axios.post("http://localhost:5000/signup", {
          username,
          email,
          password,
          apartment,
        });

        // Store JWT token
        localStorage.setItem("token", res.data.token);

        // Set user state
        setUser(res.data.user);
        setSuccess("Signup successful! Redirecting...");
        navigate("/"); //redirect to app page
      } catch (err) {
        setError(err.response?.data?.error || "Signup failed");
      }
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
            className="value-input"
            type="text"
            placeholder="Create Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="value-input"
            type="password"
            placeholder="Create a Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <ApartmentSearch setApartmentName={setApartmentName} />
        </div>
        {!acceptablePassword && (
          <div>
            <span style={{ color: "red" }}>Password format not accepted</span>
          </div>
        )}
        {error && (
          <div>
            <span style={{ color: "red" }}>{error} </span>
          </div>
        )}
        {success && (
          <div>
            <span style={{ color: "green" }}>{success} </span>
          </div>
        )}
        <button
          id="submit-button"
          disabled={!acceptableEmail || !acceptablePassword || apartment === ""}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
