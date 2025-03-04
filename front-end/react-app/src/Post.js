import "./App.css";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Post() {
  return <Chat />;
}

function Chat() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <h1 style={{ color: "red" }}>{user?.username} </h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Post;
