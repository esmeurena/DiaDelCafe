import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { AnyAction } from "redux";


interface IErrors {
  email: string;
  password:string
}

function LoginFormModal():JSX.Element {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<IErrors | AnyAction>({email: "", password: ""});
  const { closeModal } = useModal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse.ok) {
      closeModal();
    } else {
      setErrors(serverResponse);
    }
  };

  const setLogin = () => {
    setEmail("email2@email.com");
    setPassword("password");
  };

  return (
    <div className="log-in-container">
      <h1>Log In</h1>
      <button onClick={setLogin}>auto log in</button>
      <form className="log-in-form" onSubmit={(e) => handleSubmit(e)}>
        <label className="log-in-label-modal">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="red-error-message">{errors.email}</p>}
        <label className="log-in-label-modal">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="red-error-message">{errors.password}</p>}
        <button className="log-in-button-modal" type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
