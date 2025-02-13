import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ApartmentSearch from "./ApartmentSearch";
import NotFound from "./NotFound";
import Signup from "./Signup";
import Login from "./Login";
import jwtDecode from "jwt-decode";


function App() {
  document.title = "SuiteTalk";
  return (
    <Router>

      <Routes>
        <Route path="/" element={<CheckUserLoggedIn />} />
        <Route path="/ApartmentSearch" element={<ApartmentSearch />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

function CheckUserLoggedIn() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  return (
    <div>
      {user ? (
        <Profile />
      ) : showSignup ? (
        <Signup setUser={setUser} />
      ) : (
        <Login setUser={setUser} />
      )}
      <button onClick={() => setShowSignup(!showSignup)}>
        {showSignup ? "Switch to Login" : "Switch to Signup"}
      </button>
    </div>
  );
};

export default App;
