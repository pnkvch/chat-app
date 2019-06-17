import React from "react";

const Roomlist = ({ rooms, subscribeToRoom }) => {
  return (
    <div className="rooms-list">
      <h1>Your rooms:</h1>
      <ul>
        {rooms.map(room => {
          console.log(room);
          return (
            <li key={room.id} className="room">
              <button onClick={() => subscribeToRoom(room.id)}>
                {room.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Roomlist;
