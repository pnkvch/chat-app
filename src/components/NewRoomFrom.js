import React, { useState } from "react";

const NewRoomForm = ({ createRoom }) => {
  const [value, setValue] = useState("");

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    createRoom(value);
    setValue("");
  };

  return (
    <div className="new-room-form">
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={handleChange}
          type="text"
          placeholder="Create a room"
          required
        />
        <button id="create-room-btn" type="submit">
          +
        </button>
      </form>
    </div>
  );
};

export default NewRoomForm;
