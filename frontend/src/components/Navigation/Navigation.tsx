import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation():JSX.Element {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img className="logo" src="/diadelcafe_logo.jpg" />
      </div>

      <div className="navbar-top">
        <NavLink className = "nav-text" to="/">HOME</NavLink>
        <NavLink className = "nav-text" to="/order">ORDER ONLINE</NavLink>
      </div>

      <div className="navbar-right">
        <div className="navbar-top">
          {/* <NavLink to="/">Home</NavLink>
          <NavLink to="/order">Order Online</NavLink> */}
          <ProfileButton />
        </div>
        {/* <div className="navbar-bottom">
          <h3>M-F: 7:30 am - 4 pm PT; Weekends: 8 am - 2 pm PT</h3>
        </div> */}
      </div>
    </nav>
  );
}

export default Navigation;
