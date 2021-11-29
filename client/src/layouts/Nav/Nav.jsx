import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Nav.css";

const Nav = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <nav className="nav">
      {user ? (
        <Link to="/">
          <button className="css-button-shadow--sand">Home</button>
        </Link>
        ) : null}
        {user ? (
        <Link to="/gots">
          <button className="css-button-shadow--sand">Houses</button>
        </Link>
        ) : null}

        <>
        {user ? (
          <Link to="/profile">
            <button className="css-button-shadow--sand">Profile</button>
          </Link>
          ) : null}
        </>
        <>
          {!user ? (
            <Link to="/register">
              <button className="css-button-shadow--sand">Register</button>
            </Link>
          ) : null}
        </>
        <>
          {user ? (
            <Link to="/logout" onClick={() => (window.location.href = "/")}>
              <button className="css-button-shadow--sand">Logout</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="css-button-shadow--sand">Login</button>
            </Link>
          )}
        </>
      </nav>
    </>
  );
};

export default Nav;
