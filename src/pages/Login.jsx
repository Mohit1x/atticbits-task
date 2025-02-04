import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import "../styles/Login.css";

const Login = () => {
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password.length < 5 && userData.username.length < 5) {
      setMessage("please fill username and password upto atleast 5 letters.");
      return;
    }
    dispatch(login({ username: userData.username }));
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
        <input
          onFocus={() => setMessage("")}
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        {message && <span className="error">{message}</span>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
