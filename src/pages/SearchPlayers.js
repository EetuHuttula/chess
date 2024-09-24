import React, { useState } from 'react';
import PlayerInfo from '../components/PlayerInfo';
import PlayerStats from '../components/PlayerStats';
import "./search.css"


export default function SearchPlayers() {
    const [playerInfo, setPlayerInfo] = useState(null);
    const [playerStats, setPlayerStats] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      handleSearch(username);
    };

    const fetchPlayer = async (username) => {
        try {
            setLoading(true);
            const res = await fetch(`https://api.chess.com/pub/player/${username}`);
            if (!res.ok) {
                throw new Error('Player not found');
            }
            const data = await res.json();
            const countryUrl = data.country;
            const countryTag = countryUrl ? countryUrl.split('/').pop() : 'N/A';
    
            setPlayerInfo({ ...data, countryTag });
            setError(null);
        } catch (err) {
            setError(err.message);
            setPlayerInfo(null);
        } finally {
            setLoading(false);
        }
    };
    const fetchPlayerStats = async (username) => {
        try {
            setLoading(true);
            const res = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
            if (!res.ok) {
                throw new Error('Player stats not found');
            }
            const data = await res.json();
            setPlayerStats(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setPlayerStats(null);
        }
    };

    const handleSearch = async (username) => {
        setError(null);
        setPlayerInfo(null);
        setPlayerStats(null);

        setLoading(true);
        await Promise.all([fetchPlayer(username), fetchPlayerStats(username)]);
        setLoading(false);
    };

    const formatLastOnline = (timestamp) => {
        const date = new Date(timestamp * 1000);
        
  
        const formattedDate = date.toLocaleDateString(); // returns only the date part
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        return `${formattedDate}, ${formattedTime}`;
    };

    return (
        <>
        <div className="bg-dark">

            <div className="Search">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Chess.com username"
                />
                <button type="submit">Search</button>
            </form>
           
            </div>
            <p className="searchtext">Search your favourite players</p>
            <div>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {playerInfo && <PlayerInfo playerInfo={playerInfo} formatLastOnline={formatLastOnline} />}
                {playerStats && <PlayerStats playerStats={playerStats} />}
            </div>
            
            </div>
        </>
    )
}
