import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import { useAppSelector } from "../../redux/store";


interface ISignUpErrors {
  server?: any;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone_number?: string;
  birth_day?: string;
  birth_month?: string;
  birth_year?: string;
}

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useAppSelector((state) => state.session.user);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState(0);
  const [birth_day, setBirthDay] = useState(0);
  const [birth_month, setBirthMonth] = useState(0);
  const [birth_year, setBirthYear] = useState(0);
  const [errors, setErrors] = useState<ISignUpErrors>({
    server: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
    birth_day: "",
    birth_month: "",
    birth_year: ""
  });

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        first_name,
        last_name,
        email,
        password,
        phone_number,
        birth_day,
        birth_month,
        birth_year
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };



  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={(e) => handleSubmit}>
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
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
