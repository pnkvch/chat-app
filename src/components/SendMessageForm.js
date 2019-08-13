import React, { useState } from "react";

const SendMessadgeForm = ({ sendMessage, disabled }) => {
  const [value, setValue] = useState("");

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    sendMessage(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="send-message-form">
      <input
        disabled={disabled}
        placeholder="Type your message here and press Enter to send it"
        type="text"
        value={value}
        onChange={handleChange}
      />
    </form>
  );
};

export default SendMessadgeForm;
