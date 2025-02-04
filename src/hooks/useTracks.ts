import { useState, useEffect } from 'react';
import axios from 'axios';

const useTracks = () => {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch tracks from Deezer API based on a search term
    const fetchTracks = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('/deezer/search?q=album&type=track');
        if (response.data && response.data.data) {
          setTracks(response.data.data.slice(0, 20));
        } else {
          setError('No tracks found.');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching tracks.');
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return { tracks, loading, error };
};

export default useTracks;
