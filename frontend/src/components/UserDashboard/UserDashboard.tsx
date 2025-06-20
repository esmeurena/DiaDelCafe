import "./UserDashboard.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store";
import { deleteUserThunk } from "../../redux/session";
import { useNavigate } from "react-router-dom";

function UserDashboard(): JSX.Element {
  const sessionUser = useAppSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!sessionUser) {
    return (
      <div className="dashboard-container">
        <h2>Log in to view your dashboard!</h2>
      </div>
    );
  }

  const deleteUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("IN HERE SESSION USER ID, ", sessionUser.id);
    await dispatch(deleteUserThunk());
    navigate("/")
  };

  return (
    <div className="user-dashboard-container">
      <div className="user-dashboard-header">
        <img
          className="user-dashboard-profile-image"
          src="/diadelcafe_insta/insta1.png"
        />
        <h1>
          {sessionUser.first_name} {sessionUser.last_name}
        </h1>
        <p>{sessionUser.email}</p>
      </div>

      <div className="user-dashboard-panel">
        <h2>Contact Info</h2>
        <p><strong>Phone:</strong> {sessionUser.phone_number}</p>
        <p><strong>Email:</strong> {sessionUser.email}</p>
      </div>

      <div className="user-dashboard-panel">
        <h2>Birthday</h2>
        <p>
          {sessionUser.birth_month}/{sessionUser.birth_day}/{sessionUser.birth_year}
        </p>
      </div>

      <div className="user-dashboard-panel">
        <NavLink to={`/users/${Number(sessionUser.id)}/update`} > Update profile </NavLink>
        <button onClick={deleteUser}>Delete account</button>
      </div>
    </div>
  );
}

export default UserDashboard;
