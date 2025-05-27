// import React, { useRef, useState, useEffect } from 'react';
// import './AudioWavePlayer.css';
// import audioFile from './assets/real-extreme-278133.mp3'; // Update path as needed

// const AudioWavePlayer = () => {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(true);

//   useEffect(() => {
//     const audio = audioRef.current;

//     const playAudio = () => {
//       audio.play().catch((err) => {
//         console.log('Autoplay blocked:', err);
//         setIsPlaying(false); // In case autoplay fails
//       });
//     };

//     // Try to auto-play after slight delay
//     const timeout = setTimeout(() => {
//       playAudio();
//     }, 500);

//     return () => clearTimeout(timeout);
//   }, []);

//   const toggleAudio = () => {
//     const audio = audioRef.current;
//     if (audio.paused) {
//       audio.play();
//       setIsPlaying(true);
//     } else {
//       audio.pause();
//       setIsPlaying(false);
//     }
//   };

//   return (
//     <div className="audio-wave-player" onClick={toggleAudio}>
//       <audio ref={audioRef} loop src={audioFile} />
//       <div className={`bars ${isPlaying ? 'playing' : ''}`}>
//         {[...Array(5)].map((_, i) => (
//           <span key={i}></span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AudioWavePlayer;