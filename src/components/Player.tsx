import React, { useState } from "react";

interface PlayerProps {
  tracks: any[];
}

const Player: React.FC<PlayerProps> = ({ tracks }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);

  const handlePlayPreview = (trackId: number) => {
    const track = tracks.find((t) => t.id === trackId);
    if (track && track.preview) {
      const audio = new Audio(track.preview);
      audio.play();
      setCurrentTrackIndex(trackId);

      // Automatically stop after 30 seconds
      setTimeout(() => {
        audio.pause();
        setCurrentTrackIndex(null);
      }, 30000);
    }
  };

  return (
    <div className="player">
      {currentTrackIndex !== null && <p>Now Playing: Track {currentTrackIndex}</p>}
      <button onClick={() => handlePlayPreview(tracks[0]?.id)}>
        Play Preview
      </button>
    </div>
  );
};

export default Player;
