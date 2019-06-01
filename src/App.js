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
  const [roomID, setRoomID] = useState(null);

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
        getRooms(currentUser);
      })
      .catch(err => {
        console.log(`Connecting error: ${err}`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = text => {
    user.sendSimpleMessage({
      text,
      roomId: roomID
    });
  };

  const getRooms = user => {
    user
      .getJoinableRooms()
      .then(rooms => {
        setJoinableRooms(prevRooms => [...prevRooms, rooms]);
        setRooms(user.rooms);
      })
      .catch(err => {
        console.log(`Error on getting the rooms: ${err}`);
      });
  };

  const subscribeToRoom = roomId => {
    setMessages([]);

    user
      .subscribeToRoomMultipart({
        roomId: roomId,
        hooks: {
          onMessage: message => {
            setMessages(currentMessages => [...currentMessages, message]);
          }
        }
      })
      .then(room => {
        setRoomID(room.id);
      });
  };

  return (
    <div className="app">
      <Roomlist
        rooms={[...rooms, ...joinableRooms]}
        subscribeToRoom={subscribeToRoom}
      />
      <MessagesList messages={messages} />
      <SendMessageForm sendMessage={sendMessage} />
      <NewRoomForm />
    </div>
  );
}

export default App;
