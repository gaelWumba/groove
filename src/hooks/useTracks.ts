import { useState, useEffect } from 'react';

const useTracks = (playlistId: number | null) => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (playlistId === null) return;

    setLoading(true);
    const script = document.createElement('script');
    script.src = `https://api.deezer.com/playlist/${playlistId}?output=jsonp&callback=handleTrackResponse`;
    document.body.appendChild(script);

    // Define callback function for JSONP response
    (window as any).handleTrackResponse = (data: any) => {
      if (data && data.tracks && data.tracks.data) {
        setTracks(data.tracks.data);
      } else {
        setError('No tracks found');
      }
      setLoading(false);
    };

    return () => {
      document.body.removeChild(script);
      delete (window as any).handleTrackResponse; // Cleanup function
    };
  }, [playlistId]);

  return { tracks, loading, error };
};

export default useTracks;
