import React, { useState } from "react";
import useTracks from "./hooks/useTracks";
import TrackCarousel from "./components/TrackCarousel";
import Playing from "./components/Playing";
import Hero from "./components/Hero";

interface Track {
  id: number;
  title: string;
  artist: { name: string };
  album: { cover_big: string };
}

const App: React.FC = () => {
  const { tracks, loading, error } = useTracks();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  return (
    <div className="flex flex-col h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-black mb-4 border-b border-b-orange-400 pb-5">GROOVE</h1>

      <Playing currentTrack={currentTrack} />

      <Hero />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {loading ? (
          <p className="text-center text-gray-400">Loading tracks...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <TrackCarousel tracks={tracks} setCurrentTrack={setCurrentTrack} />
        )}
      </div>
    </div>
  );
};

export default App;
