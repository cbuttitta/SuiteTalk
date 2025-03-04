import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./Post";
import NotFound from "./NotFound";
import Signup from "./Signup";
import Login from "./Login";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";

function App() {
  document.title = "SuiteTalk";
  return (
    <AuthProvider>
    <Router>
      <Routes>
        {/* Public Routes*/}     
        <Route path="/" element={<CheckUserLoggedIn />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        {/* Private Routes*/} 
        <Route path="/Post" element={<ProtectedRoute><Post /></ProtectedRoute>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

function CheckUserLoggedIn() {
  const [user, setUser] = useState(null);

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

  return <div>{user ? <Post /> : <Login setUser={setUser} />}</div>;
}

export default App;
