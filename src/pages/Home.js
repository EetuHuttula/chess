import React, { useState, useEffect } from 'react';
import "./home.css"

const Leaderboards = () => {
  const [leaderboards, setLeaderboards] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const response = await fetch('https://api.chess.com/pub/leaderboards');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLeaderboards(data);
        setSelectedCategory(Object.keys(data)[0]); // Set the first category by default
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboards();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const players = leaderboards[selectedCategory] || [];
  
  // Sort players by score in descending order
  const sortedPlayers = players.sort((a, b) => b.score - a.score);
  const topPlayers = sortedPlayers.slice(0, 10);
  const firstPlayer = topPlayers[0];
  const lastPlayer = topPlayers[topPlayers.length - 1];

  return (
    <div className="home">
      <h1>Chess.com Leaderboards</h1>
      <p>Select category to see top 10 players at the moment!</p>
      <select className="select" value={selectedCategory} onChange={handleCategoryChange}>
        {leaderboards && Object.keys(leaderboards).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
   
      {leaderboards && selectedCategory && (
        <div className="boards">
          <h2>{selectedCategory}</h2>
          {firstPlayer && <p>Top Player: <strong>{firstPlayer.username}</strong> - Rating: {firstPlayer.score}</p>}
          {lastPlayer && <p>Last in Top 10: <strong>{lastPlayer.username}</strong> - Rating: {lastPlayer.score}</p>}
          <ul className="list">
            {topPlayers.map((player, index) => (
              <li className="players" key={index}>
                {index + 1}. <strong>{player.username}</strong> - Rating: {player.score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Leaderboards;
