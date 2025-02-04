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
        setError(null);  // Reset error state

        // Fetch tracks (search query for tracks, adjust as needed)
        const response = await axios.get('/deezer/search?q=album&type=track'); // Example query for tracks
        if (response.data && response.data.data) {
          // Limit the number of tracks as needed
          setTracks(response.data.data.slice(0, 20));  // Adjust the number of tracks
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
