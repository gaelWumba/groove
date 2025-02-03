import React from "react";

interface TrackListProps {
  tracks: any[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  return (
    <div className="track-list">
      <h3>Tracks</h3>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>{track.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;

