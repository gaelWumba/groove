import { useState, useEffect } from 'react';

const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://api.deezer.com/playlist/3155776842?output=jsonp&callback=handleApiResponse`;
    document.body.appendChild(script);

    // Define callback function for JSONP response
    (window as any).handleApiResponse = (data: any) => {
      if (data && data.tracks && data.tracks.data) {
        setPlaylists(data.tracks.data);
      } else {
        setError('No playlists found');
      }
      setLoading(false);
    };

    return () => {
      document.body.removeChild(script);
      delete (window as any).handleApiResponse; // Cleanup function
    };
  }, []);

  return { playlists, loading, error };
};

export default usePlaylists;
