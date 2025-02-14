import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [videoSrc, setVideoSrc] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleVideoInput = (event) => {
      const files = event.target.files;
      if (files.length > 0) {
        const newPlaylist = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const videoURL = URL.createObjectURL(file);
          newPlaylist.push({ url: videoURL, title: file.name });
        }
        setPlaylist(newPlaylist);
        setCurrentVideoIndex(0);
        playVideo(0);
      }
    };

    const videoInput = document.getElementById('videoInput');
    videoInput.addEventListener('change', handleVideoInput);

    return () => {
      videoInput.removeEventListener('change', handleVideoInput);
    };
  }, []);

  const playVideo = (index) => {
    if (playlist.length > 0 && index >= 0 && index < playlist.length) {
      setVideoSrc(playlist[index].url);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      document.getElementById('videoPlayer').pause();
    } else {
      document.getElementById('videoPlayer').play();
    }
  };

  return (
    <div>
      <input type="file" id="videoInput" accept="video/*" multiple />
      <video id="videoPlayer" controls width="640" height="360" src={videoSrc} autoPlay={isPlaying} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
