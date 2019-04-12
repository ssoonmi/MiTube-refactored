import React from 'react';

function PlayButton({ togglePlayPause, play }) {
  return (
    <button
      className="play-button"
      onClick={togglePlayPause}>
      {play ? (
        <i className="fas fa-pause"></i>
      ) : (
        <i className="fas fa-play"></i>
      )}
    </button>
  );
}

export default PlayButton;