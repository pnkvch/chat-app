import React, { useEffect, useState } from "react";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

import "./App.css";
import Roomlist from "./components/Roomlist";
import MessadgesList from "./components/MessadgesList";
import SendMessadgeForm from "./components/SendMessadgeForm";
import NewRoomForm from "./components/NewRoomFrom";
import { instanceLocator, tokenUrl } from "./config";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatManager = new ChatManager({
      instanceLocator,
      userId: "artur",
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    });

    chatManager.connect().then(currentUser => {
      currentUser.subscribeToRoomMultipart({
        roomId: "21245599",
        hooks: {
          onMessage: message => {
            setMessages(currentMessages => [...currentMessages, message]);
          }
        }
      });
    });
  }, []);
  return (
    <div className="app">
      <Roomlist />
      <MessadgesList messages={messages} />
      <SendMessadgeForm />
      <NewRoomForm />
    </div>
  );
}

export default App;
