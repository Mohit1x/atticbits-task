import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSidebarToogle = () => {
    setIsOpen(!isOpen);
  };

  const sidebarRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <button onClick={handleSidebarToogle} className="toggle-btn">
        {isOpen ? "X" : "☰"}
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`} ref={sidebarRef}>
        <div className="logo">FIT SPACE</div>
        <nav>
          <ul>
            <li
              style={{
                color:
                  location.pathname == "/dashboard"
                    ? `var(--accent-yellow)`
                    : "white",
              }}
              onClick={() => navigate("/dashboard")}
              className="active"
            >
              Dashboard
            </li>
            <li
              style={{
                color:
                  location.pathname == "/dummy-list"
                    ? `var(--accent-yellow)`
                    : "white",
              }}
              onClick={() => navigate("/dummy-list")}
            >
              Lists
            </li>
            <li>Groups</li>
            <li>Templates</li>
            <li>Calendar</li>
            <li>Chats</li>
            <li>Help</li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div>Settings</div>
          <div onClick={handleLogout} className="logout-btn">
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
