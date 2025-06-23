import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppSelector, RootState } from "../../redux/store";
import './UpdateUserDashboard.css';
import { updateUserThunk } from "../../redux/session";

interface IUpdateUserErrors {
    server?: any;
    first_name?: string;
    last_name?: string;
    email?: string;
    birth_day?: string;
    birth_month?: string;
    birth_year?: string;
}

function UpdateUserDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useAppSelector((state) => state.session.user);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birth_day, setBirthDay] = useState(0);
    const [birth_month, setBirthMonth] = useState(0);
    const [birth_year, setBirthYear] = useState(0);
    const [errors, setErrors] = useState<IUpdateUserErrors>({
        server: "",
        first_name: "",
        last_name: "",
        email: "",
        birth_day: "",
        birth_month: "",
        birth_year: ""
    });

    useEffect(() => {
        if (sessionUser) {
            setFirstName(sessionUser.first_name);
            setLastName(sessionUser.last_name);
            setEmail(sessionUser.email);
            setBirthDay(sessionUser.birth_day);
            setBirthMonth(sessionUser.birth_month);
            setBirthYear(sessionUser.birth_year);
        }
    }, [sessionUser]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("INSIDE HANDLE SUBMIT,, ");

        const serverResponse = await dispatch(
            updateUserThunk(Number(sessionUser?.id), {
                first_name,
                last_name,
                email,
                birth_day,
                birth_month,
                birth_year
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            navigate("/dashboard");
        }
    };

    return (
        <div className="update-user-container">
            <h1>Update User Profile</h1>
            {errors.server && <p>{errors.server}</p>}
            <form className="update-user-form" onSubmit={(e) => handleSubmit(e)}>
                <label className="update-user-label">
                    First Name
                    <input
                        type="text"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                {errors.first_name && <p className="red-error-message">{errors.first_name[0]}</p>}
                <label className="update-user-label">
                    Last Name
                    <input
                        type="text"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                {errors.last_name && <p className="red-error-message">{errors.last_name[0]}</p>}
                <label className="update-user-label">
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p className="red-error-message">{errors.email[0]}</p>}
                <label className="update-user-label">
                    Birth day
                    <input
                        type="number"
                        value={birth_day}
                        onChange={(e) => setBirthDay(Number(e.target.value))}
                        required
                    />
                </label>
                {errors.birth_day && <p className="red-error-message">{errors.birth_day[0]}</p>}
                <label className="update-user-label">
                    Birth month
                    <input
                        type="number"
                        value={birth_month}
                        onChange={(e) => setBirthMonth(Number(e.target.value))}
                        required
                    />
                </label>
                {errors.birth_month && <p className="red-error-message">{errors.birth_month[0]}</p>}
                <label className="update-user-label">
                    Birth year
                    <input
                        type="number"
                        value={birth_year}
                        onChange={(e) => setBirthYear(Number(e.target.value))}
                        required
                    />
                </label>
                {errors.birth_year && <p className="red-error-message">{errors.birth_year[0]}</p>}

                <button className="update-user-button" type="submit">Update Item</button>
            </form>
        </div>
    );
}

export default UpdateUserDashboard;
