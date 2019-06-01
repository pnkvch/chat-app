import React from "react";

const Roomlist = ({ rooms, subscribeToRoom }) => {
  return (
    <div className="rooms-list">
      <h1>Your rooms:</h1>
      <ul>
        {rooms.map(room => {
          return (
            <li key={room.id} className="room">
              <a onClick={() => subscribeToRoom(room.id)} href="#">
                {room.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Roomlist;
