import React, { useEffect, useState } from "react";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

import "./App.css";
import Roomlist from "./components/Roomlist";
import MessagesList from "./components/MessagesList";
import SendMessageForm from "./components/SendMessageForm";
import NewRoomForm from "./components/NewRoomFrom";
import { instanceLocator, tokenUrl } from "./config";
const App = () => {
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
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
        setUserInfo(currentUser);
        getRooms(currentUser);
      })
      .catch(err => {
        console.log(`Connection error: ${err}`);
      });
  }, []);

  const sendMessage = text => {
    userInfo.sendSimpleMessage({
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

    console.log(joinableRooms);

    userInfo
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
        getRooms(userInfo);
      });
  };

  const createRoom = name => {
    userInfo
      .createRoom({
        name
      })
      .then(room => subscribeToRoom(room.id))
      .catch(err => console.log("Error on connecting to the new room:", err));
  };

  return (
    <div className="app">
      <Roomlist rooms={[...rooms]} subscribeToRoom={subscribeToRoom} />
      <MessagesList roomID={roomID} messages={messages} />
      <SendMessageForm disabled={!roomID} sendMessage={sendMessage} />
      <NewRoomForm createRoom={createRoom} />
    </div>
  );
};

export default App;
