import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import TrackList from './components/TrackList';
import usePlaylists from './hooks/usePlaylists';
import useTracks from './hooks/useTracks';

const App: React.FC = () => {
  const { playlists, loading: playlistsLoading, error: playlistsError } = usePlaylists();
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);
  const { tracks, loading: tracksLoading, error: tracksError } = useTracks(selectedPlaylistId);

  useEffect(() => {
    if (playlists.length > 0 && selectedPlaylistId === null) {
      setSelectedPlaylistId(playlists[0].id);
    }
  }, [playlists, selectedPlaylistId]);

  const handlePlaylistSelect = (playlistId: number) => {
    setSelectedPlaylistId(playlistId);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <Sidebar playlists={playlists} onSelect={handlePlaylistSelect} />
      
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        {playlistsLoading || tracksLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : playlistsError || tracksError ? (
          <p className="text-center text-red-500">{playlistsError || tracksError}</p>
        ) : (
          <>
            {selectedPlaylistId && <TrackList tracks={tracks} />}
            {tracks.length > 0 && <Player tracks={tracks} />}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
