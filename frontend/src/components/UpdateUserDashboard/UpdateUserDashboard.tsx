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
    phone_number?: string;
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
    const [phone_number, setPhoneNumber] = useState(0);
    const [birth_day, setBirthDay] = useState(0);
    const [birth_month, setBirthMonth] = useState(0);
    const [birth_year, setBirthYear] = useState(0);
    const [errors, setErrors] = useState<IUpdateUserErrors>({
        server: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        birth_day: "",
        birth_month: "",
        birth_year: ""
    });

    useEffect(() => {
        if (sessionUser) {
            setFirstName(sessionUser.first_name);
            setLastName(sessionUser.last_name);
            setEmail(sessionUser.email);
            setPhoneNumber(sessionUser.phone_number);
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
                phone_number,
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
        <>
            <h1>Update Menu item</h1>
            {errors.server && <p>{errors.server}</p>}
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    First Name
                    <input
                        type="text"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                {errors.first_name && <p>{errors.first_name}</p>}
                <label>
                    Last Name
                    <input
                        type="text"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                {errors.last_name && <p>{errors.last_name}</p>}
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p>{errors.email}</p>}
                <label>
                    Phone Number
                    <input
                        type="number"
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(Number(e.target.value))}
                        required
                    />
                </label>
                {errors.phone_number && <p>{errors.phone_number}</p>}
                <label>
                    Birth day
                    <input
                        type="number"
                        value={birth_day}
                        onChange={(e) => setBirthDay(Number(e.target.value))}
                        required
                    />
                </label>
                {errors.birth_day && <p>{errors.birth_day}</p>}
                <label>
                    Birth month
                    <input
                        type="number"
                        value={birth_month}
                        onChange={(e) => setBirthMonth(Number(e.target.value))}
                        required
                    />
                </label>
                {errors.birth_month && <p>{errors.birth_month}</p>}
                <label>
                    Birth year
                    <input
                        type="number"
                        value={birth_year}
                        onChange={(e) => setBirthYear(Number(e.target.value))}
                        required
                    />
                </label>
                {errors.birth_year && <p>{errors.birth_year}</p>}

                <button type="submit">Update Item</button>
            </form>
        </>
    );
}

export default UpdateUserDashboard;
