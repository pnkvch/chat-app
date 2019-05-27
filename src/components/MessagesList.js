import React from "react";
import Message from "./Message";

const MessagesList = ({ messages }) => {
  const messagesList = messages.map((item, index) => {
    return <Message index={index} message={item} />;
  });

  return <div className="message-list">{messagesList}</div>;
};

export default MessagesList;
