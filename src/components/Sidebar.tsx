import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

interface Playlist {
  id: number;
  title: string;
  picture: string;
}

interface SidebarProps {
  playlists: Playlist[];
  onSelect: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ playlists, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter playlists based on the search query
  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 h-screen p-4 bg-gray-100 border-r border-gray-300 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Playlists</h2>

      {/* Search bar */}
      <TextField
        label="Search Playlists"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-4 bg-white rounded-lg"
      />

      {/* Render filtered playlists */}
      <div className="space-y-2">
        {filteredPlaylists.map((playlist) => (
          <Card
            key={playlist.id}
            onClick={() => onSelect(playlist.id)}
            className="cursor-pointer hover:shadow-md transition duration-300"
          >
            <img 
              src={playlist.picture} 
              className="rounded-t-xl w-full h-32 object-cover"
            />
            <CardContent>
              <p className="font-semibold text-center text-gray-700">{playlist.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
