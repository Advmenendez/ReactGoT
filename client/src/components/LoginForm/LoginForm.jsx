import React, { useState, useContext } from "react";
import {loginUser} from "../../api/fetch_user";
import { useHistory } from "react-router";
import { UserContext} from "../../App"
import "./LoginForm.css"

const LoginForm = (props) => {
  const { user, saveUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const history = useHistory();

  const submitForm = async (ev) => {
    ev.preventDefault();
    setError("");

    try {
      const { email, password } = ev.target;
      const form = {
        email: email.value,
        password: password.value,
      };

      const userdb = await loginUser(form);
      console.log("USERLOGINUSER", userdb.data.user);
      saveUser(userdb.data.user);
      history.push("/gots")
    } catch (error) {
      console.log("Error -> Login", error);
      setError(error.message);
    }
  };
  return (
    <div className="login">
      <form onSubmit={submitForm}>
        <input type="email" name="email" placeholder="E-mail" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <p>{!user?"No hay usuario logueado":user.name}</p>
    </div>
  );
};

export default LoginForm;