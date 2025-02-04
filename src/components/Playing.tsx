import React from "react";

interface Track {
  title: string;
  artist: { name: string };
  album: { cover_big: string };
}

interface PlayingProps {
  currentTrack: Track | null;
}

const Playing: React.FC<PlayingProps> = ({ currentTrack }) => {
  if (!currentTrack) return null;
  return (
    <div
      className="w-2/5 h-full mt-16 bg-cover bg-center relative text-white rounded-lg shadow-lg overflow-hidden"
      style={{ backgroundImage: `url(${currentTrack.album.cover_big})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative mt-[45rem] z-10 p-6">
        <p className="text-3xl font-black text-orange-400">{currentTrack.title}</p>
        <p className="text-xl">{currentTrack.artist.name}</p>
      </div>
    </div>
  );
};

export default Playing;
