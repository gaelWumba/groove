import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Track {
  id: number;
  title: string;
  preview: string;
  artist: { name: string };
  album: { cover_big: string };
}

interface TrackCarouselProps {
  tracks: Track[];
  setCurrentTrack: (track: Track | null) => void;
}

const TrackCarousel: React.FC<TrackCarouselProps> = ({ tracks, setCurrentTrack }) => {
  const [slider, setSlider] = useState<Slider | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [volume, setVolume] = useState<number>(0.2);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const playTrack = (index: number) => {
    if (currentAudio) currentAudio.pause();

    const track = tracks[index];
    if (!track?.preview) return;

    const audio = new Audio(track.preview);
    audio.volume = volume;
    audio.play();
    audio.onended = handleNext;

    setCurrentAudio(audio);
    setPlayingIndex(index);
    setCurrentTrack(track);

    slider?.slickGoTo(index);
  };

  const pauseTrack = () => {
    currentAudio?.pause();
    setCurrentAudio(null);
    setPlayingIndex(null);
    setCurrentTrack(null);
  };

  const handlePlayPause = (index: number) => {
    if (playingIndex === index) {
      pauseTrack();
    } else {
      playTrack(index);
    }
  };

  const handleNext = () => {
    if (playingIndex !== null && playingIndex < tracks.length - 1) {
      playTrack(playingIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (playingIndex !== null && playingIndex > 0) {
      playTrack(playingIndex - 1);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (currentAudio) {
      currentAudio.volume = newVolume;
    }
  };

  useEffect(() => {
    return () => {
      if (currentAudio) currentAudio.pause();
    };
  }, [currentAudio]);

  return (
    <div className="w-1/2 px-4 absolute bottom-5 right-0">
      <Slider ref={(s) => setSlider(s)} {...settings}>
        {tracks.map((track, index) => (
          <div key={track.id} className="p-2">
            <div
              className={`relative cursor-pointer rounded-lg overflow-hidden shadow-md text-white ${
                index === playingIndex ? "border-4 border-blue-500" : ""
              }`}
              onClick={() => handlePlayPause(index)}
            >
              <img src={track.album.cover_big} alt={track.title} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </Slider>

      {/* Navigation & Playback Controls */}
      <div className="mt-4 flex items-center space-x-4 ms-3">
        <button
          onClick={handlePrevious}
          disabled={playingIndex === 0 || playingIndex === null}
          className={`px-4 py-2 rounded-md transition ${
            playingIndex === 0 || playingIndex === null
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          Previous
        </button>

        <button
          onClick={() => handlePlayPause(playingIndex ?? 0)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          {playingIndex !== null ? "Pause" : "Play"}
        </button>

        <button
          onClick={handleNext}
          disabled={playingIndex === tracks.length - 1 || playingIndex === null}
          className={`px-4 py-2 rounded-md transition ${
            playingIndex === tracks.length - 1 || playingIndex === null
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          Next
        </button>

        {/* Volume Controller */}
        <div className="flex items-center space-x-2 bg-orange-400 p-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-40 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default TrackCarousel;
