import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useAppSelector } from "../../redux/store";
import "./Navigation.css";

function ProfileButton(): JSX.Element {
  const dispatch = useDispatch();
  const [showPanel, setShowPanel] = useState(false);
  const user = useAppSelector((store) => store.session.user);

  useEffect(() => {
    if (!showPanel) return;

    const handleClickOutside = (e: MouseEvent) => {
      const panel = document.getElementById("profile-panel");
      if (panel && !panel.contains(e.target as Node)) {
        setShowPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPanel]);

  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(thunkLogout());
    setShowPanel(false);
  };

  return (
    <>
      <button className="profile-icon" onClick={() => setShowPanel(true)}>
        <FaUserCircle />
      </button>

      <div id="profile-panel" className={`profile-panel ${showPanel ? "open" : ""}`}>
        <button className="close-panel" onClick={() => setShowPanel(false)}>×</button>
        {user ? (
          <>
            {/* <p><strong>{user.username}</strong></p> */}
            <h3>Hello, {user.first_name}!</h3>
            <NavLink to="/dashboard">User Dashboard</NavLink>
            <button onClick={logout}>Log Out</button>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={() => setShowPanel(false)}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={() => setShowPanel(false)}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
