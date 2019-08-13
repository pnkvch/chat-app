import React from "react";
import Message from "./Message";

const MessagesList = ({ messages, roomID }) => {
  if (!roomID) {
    return (
      <div className="message-list">
        <div className="join-room">&larr; Join a room!</div>
      </div>
    );
  }
  return (
    <div className="message-list">
      {messages.map((item, index) => {
        return <Message key={index} message={item} />;
      })}
    </div>
  );
};

export default MessagesList;
