import React from "react";

const Message = ({ index, message }) => {
  return (
    <div key={index} className="message">
      <div className="message-username">{message.senderId}</div>
      <div className="message-text">{message.parts[0].payload.content}</div>
    </div>
  );
};

export default Message;
