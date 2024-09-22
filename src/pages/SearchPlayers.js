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
            setPlayerInfo(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setPlayerInfo(null);
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
        setError(null); // Clear any existing errors
        setPlayerInfo(null); // Reset player info and stats for new searches
        setPlayerStats(null);

        setLoading(true);
        await Promise.all([fetchPlayer(username), fetchPlayerStats(username)]);
        setLoading(false);
    };

    const formatLastOnline = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
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
