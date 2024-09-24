import React from 'react';
import "./stats.css"

const PlayerInfo = ({ playerInfo, formatLastOnline }) => {
  return (
    <div className="infobox">
      <div className="profileimg">
      {playerInfo.avatar && (
        <img src={playerInfo.avatar} alt={`${playerInfo.username}'s avatar`} />
        
      )}
      <p className="Name_bread">{playerInfo.username}</p>
      </div>
      <div className="info_container">
      <h2 className="bread">Player Info</h2>
      <p className="bread">Followers: {playerInfo.followers}</p>
      <p className="bread">Status: {playerInfo.status}</p>
      <p className="bread">Location: {playerInfo.location}</p>
      <p>Country: {playerInfo.countryTag}</p>
      {playerInfo.joined && (
        <p className="bread" >Join Date: {formatLastOnline(playerInfo.joined)}</p>
      )}
      {playerInfo.last_online && (
        <p className="bread">Last Online: {formatLastOnline(playerInfo.last_online)}</p>
      )}
      </div>
    </div>
  );
};

export default PlayerInfo;
