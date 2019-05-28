import React, { useEffect, useState } from "react";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

import "./App.css";
import Roomlist from "./components/Roomlist";
import MessagesList from "./components/MessagesList";
import SendMessageForm from "./components/SendMessageForm";
import NewRoomForm from "./components/NewRoomFrom";
import { instanceLocator, tokenUrl } from "./config";

function App() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [joinableRooms, setJoinableRooms] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const chatManager = new ChatManager({
      instanceLocator,
      userId: "artur",
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        setUser(currentUser);

        currentUser
          .getJoinableRooms()
          .then(rooms => {
            setJoinableRooms(prevRooms => [...prevRooms, rooms]);
            setRooms(currentUser.rooms);
          })
          .catch(err => {
            console.log(`Error on getting the rooms: ${err}`);
          });
        currentUser.subscribeToRoomMultipart({
          roomId: "21245599",
          hooks: {
            onMessage: message => {
              setMessages(currentMessages => [...currentMessages, message]);
            }
          }
        });
      })
      .catch(err => {
        console.log(`Connecting error: ${err}`);
      });
  }, []);

  const sendMessage = text => {
    user.sendSimpleMessage({
      text,
      roomId: "21245599"
    });
  };

  return (
    <div className="app">
      <Roomlist rooms={[...rooms, ...joinableRooms]} />
      <MessagesList messages={messages} />
      <SendMessageForm sendMessage={sendMessage} />
      <NewRoomForm />
    </div>
  );
}

export default App;
