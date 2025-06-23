import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";



interface ISignUpErrors {
  server?: any;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  birth_day?: string;
  birth_month?: string;
  birth_year?: string;
}


function SignupFormModal() {
  const dispatch = useDispatch();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    birth_day: "",
    birth_month: "",
    birth_year: ""
  });
  const { closeModal } = useModal();

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
        birth_day,
        birth_month,
        birth_year
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const setSignUp = () => {
    setFirstName("FirstName");
    setLastName("LastName");
    setEmail("email11@email.com");
    setPassword("password");
    setConfirmPassword("password");
    setBirthDay(1);
    setBirthMonth(2);
    setBirthYear(1988)
  };

  return (
    <div className="sign-up-container-modal">
      <h1>Sign Up</h1>
      <button onClick={setSignUp}>pre-fill sign up</button>
      {errors.server && <p>{errors.server}</p>}
      <form className="sign-up-form-modal" onSubmit={handleSubmit}>
        <label className="sign-up-label-modal">
          First Name
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.first_name && <p className="red-error-message">{errors.first_name}</p>}
        <label className="sign-up-label-modal">
          Last Name
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.last_name && <p className="red-error-message">{errors.last_name}</p>}
        <label className="sign-up-label-modal">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="red-error-message">{errors.email}</p>}
        <label className="sign-up-label-modal">
          Birth day
          <input
            type="number"
            value={birth_day}
            onChange={(e) => setBirthDay(Number(e.target.value))}
            required
          />
        </label>
        {errors.birth_day && <p className="red-error-message">{errors.birth_day}</p>}
        <label className="sign-up-label-modal">
          Birth month
          <input
            type="number"
            value={birth_month}
            onChange={(e) => setBirthMonth(Number(e.target.value))}
            required
          />
        </label>
        {errors.birth_month && <p className="red-error-message">{errors.birth_month}</p>}
        <label className="sign-up-label-modal">
          Birth year
          <input
            type="number"
            value={birth_year}
            onChange={(e) => setBirthYear(Number(e.target.value))}
            required
          />
        </label>
        {errors.birth_year && <p className="red-error-message">{errors.birth_year}</p>}
        <label className="sign-up-label-modal">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="red-error-message">{errors.password}</p>}
        <label className="sign-up-label-modal">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="red-error-message">{errors.confirmPassword}</p>}
        <button className="sign-up-button-modal" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
