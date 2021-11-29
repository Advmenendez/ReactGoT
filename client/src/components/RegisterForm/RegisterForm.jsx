import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../api/fetch_user";
import "./RegisterForm.css";

const INITIAL_STATE = {
  email: "",
  name: "",
  password: "",
};
const RegisterForm = (props) => {
  const history = useHistory();
  const [registerForm, setRegisterForm] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(registerForm);
      setRegisterForm(INITIAL_STATE);
      setError("");
      history.push("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  return (
    <div>
      <form onSubmit={submitForm} className="registerForm">
        <input
          type="text"
          name="name"
          value={registerForm.name}
          onChange={handleInput}
          placeholder="name"
        />
        <input
          type="text"
          name="email"
          value={registerForm.email}
          onChange={handleInput}
          placeholder="E-mail"
        />
        <input
          type="password"
          name="password"
          value={registerForm.password}
          onChange={handleInput}
          placeholder="Password"
        />
       
        <button type="submit">Register</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
};

export default RegisterForm;
