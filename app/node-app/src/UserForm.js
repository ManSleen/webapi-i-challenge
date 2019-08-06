import React, { useState } from "react";

const UserForm = ({ addUser }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    bio: ""
  });

  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addUser(userInfo);
  };

  return (
    <div>
      <h2>Add a New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={userInfo.name}
          onChange={handleChange}
        />
        <br />
        <input
          name="bio"
          type="text"
          placeholder="Bio"
          value={userInfo.bio}
          onChange={handleChange}
        />
        <br />
        <button>Add New User</button>
      </form>
    </div>
  );
};

export default UserForm;
