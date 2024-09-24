import React from 'react';
import "./stats.css"

const PlayerStats = ({ playerStats}) => {
    return (
        <>
            <h2 className='stats_heading'>Player Stats</h2>
            <div className="stats">

                <div className="box">
                    <h3>Daily</h3>
                    <p>Rating: {playerStats.chess_daily?.last?.rating}</p>
                    <p>Best Rating: {playerStats.chess_daily?.best?.rating}</p>
                </div>

                <div className="box">
                    <h3>Rapid</h3>
                    <p>Rating: {playerStats.chess_rapid?.last?.rating}</p>
                    <p>Best Rating: {playerStats.chess_rapid?.best?.rating}</p>
                </div>

                <div className="box">
                    <h3>Blitz</h3>
                    <p>Rating: {playerStats.chess_blitz?.last?.rating}</p>
                    <p>Best Rating: {playerStats.chess_blitz?.best?.rating}</p>
                </div>

                <div className="box">
                    <h3>Bullet</h3>
                    <p>Rating: {playerStats.chess_bullet?.last?.rating}</p>
                    <p>Best Rating: {playerStats.chess_bullet?.best?.rating}</p>
                </div>
            </div>
        </>
    );
};

export default PlayerStats;
