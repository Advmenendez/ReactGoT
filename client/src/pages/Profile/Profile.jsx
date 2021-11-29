import React, { useContext } from "react";
import { UserContext } from "../../App";
import "./Profile.css";
const Profile = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="profile">
      <h2>Profile</h2>
      <ul className="profile_list">
        <li>Usuario: {user.name}</li>
        <li>E-mail: {user.email}</li>
      </ul>
    </div>
  );
};

export default Profile;