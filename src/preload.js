// import React, { useState, useEffect } from "react";
// import "./preload.css";

// const Preloader = ({ onComplete }) => {
//   const [count, setCount] = useState(0); // Progress percentage starts from 0
//   const [fade, setFade] = useState(true); // Fade animation control
//   const [totalAssets, setTotalAssets] = useState(0); // Total number of assets
//   const [loadedAssets, setLoadedAssets] = useState(0); // Track loaded assets

//   // Function to detect if the device is a mobile (specifically iPhone)
//   const isMobileDevice = () => {
//     const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//     return /iPhone|iPad|iPod|Android/i.test(userAgent);
//   };

//   // Function to require all images in a directory
//   const importAllImages = (r) => r.keys().map(r);

//   // Arrays of media assets (lazy load large assets in chunks)
//   const gearImages = Array.from({ length: 89 }, (_, i) =>
//     require(`./assets/GearImages/Gear_${String(i).padStart(5, "0")}.jpg`)
//   );
//   const bikeSequenceImages1 = Array.from({ length: 158 }, (_, i) =>
//     require(`./assets/BikeSequence3/website header bike animation_${String(i + 7).padStart(5, "0")}.jpg`)
//   );
//   const videos = [
//     require("./assets/Light alphs.mp4"),
//     require("./assets/website header bike animation_1.mp4"),
//     require("./assets/Visual 8 (1).mp4"),
//   ];

//   // Preload all SVG, PNG, JPG images in the assets folder
//   const svgImages = importAllImages(require.context('./assets', false, /\.svg$/));
//   const pngImages = importAllImages(require.context('./assets', false, /\.png$/));
//   const jpgImages = importAllImages(require.context('./assets', false, /\.jpg$/));

//   // Function to preload media assets in chunks (for faster loads)
//   const preloadInChunks = async (mediaPaths, type, chunkSize = 10) => {
//     const chunks = [];
//     for (let i = 0; i < mediaPaths.length; i += chunkSize) {
//       chunks.push(mediaPaths.slice(i, i + chunkSize));
//     }
//     for (const chunk of chunks) {
//       await Promise.all(
//         chunk.map((path) =>
//           new Promise((resolve, reject) => {
//             const updateProgress = () => setLoadedAssets((prev) => prev + 1);
//             if (type === "image") {
//               const img = new Image();
//               img.src = path;
//               img.onload = () => {
//                 updateProgress();
//                 resolve();
//               };
//               img.onerror = () => reject(new Error(`Failed to load ${path}`));
//             } else if (type === "video") {
//               const video = document.createElement("video");
//               video.src = path;
//               video.preload = "auto";
//               video.onloadeddata = () => {
//                 updateProgress();
//                 resolve();
//               };
//               video.onerror = () => reject(new Error(`Failed to load ${path}`));
//             }
//           })
//         )
//       );
//     }
//   };

//   // Function to preload media assets
//   const preloadAssets = async () => {
//     try {
//       setTotalAssets(
//         gearImages.length + bikeSequenceImages1.length + svgImages.length +
//         pngImages.length + jpgImages.length + videos.length
//       );
//       await Promise.all([
//         preloadInChunks([...gearImages, ...bikeSequenceImages1, ...svgImages, ...pngImages, ...jpgImages], "image"),
//         preloadInChunks(videos, "video"),
//         document.fonts.ready,
//       ]);
//       console.log("Assets loaded");
//     } catch (error) {
//       console.error("Error during asset loading:", error);
//     }
//   };

//   // Update progress based on loaded assets
//   useEffect(() => {
//     if (totalAssets > 0) {
//       const progress = Math.round((loadedAssets / totalAssets) * 100);
//       setCount(progress);
//     }
//   }, [loadedAssets, totalAssets]);

//   useEffect(() => {
//     if (count >= 100) {
//       setTimeout(() => {
//         setFade(false); // Trigger fade-out animation
//         onComplete(); // Call onComplete to show the site
//       }, 500); // Optional delay for smoother transition
//     }
//   }, [count, onComplete]);

//   // Start preloading assets when the component mounts
//   useEffect(() => {
//     if (isMobileDevice()) {
//       setFade(false); // Skip the preloader animation
//       onComplete(); // Directly show the site for mobile devices
//     } else {
//       preloadAssets(); // Start preloading assets for non-mobile devices
//     }
//   }, []);

//   // Render nothing for mobile devices, bypassing the preloader
//   if (isMobileDevice()) {
//     return null;
//   }

//   return (
//     <div id="loadingScreen" className="preloader">
//       <img
//         src={require("./assets/1400.gif")}
//         alt="Loading"
//         className="loading-image"
//       />
//       <h1 className={`loading-text ${fade ? "fade-in" : "fade-out"}`}>
//         {count}
//       </h1>
//     </div>
//   );
// };

// export default Preloader;

import React, { useState, useEffect } from "react";
import "./preload.css";

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0); // Actual loading progress
  const [smoothCount, setSmoothCount] = useState(0); // Displayed smooth progress
  const [fade, setFade] = useState(true); // Fade animation control
  const [totalAssets, setTotalAssets] = useState(0);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /iPhone|iPad|iPod|Android/i.test(userAgent);
  };

  // For Bike Images (starts from 00007 and goes to 00156)
const totalBikeFrames = 150;
const bikeImages = Array.from({ length: totalBikeFrames }, (_, i) =>
  require(`./assets/BikeSequence3/website header bike animation_${String(i + 7).padStart(5, '0')}.jpg`)
);

// For Gear Images (starts from 00000 to 00085)
const totalGearFrames = 86;
const gearImages = Array.from({ length: totalGearFrames }, (_, i) =>
  require(`./assets/GearImages/1_${String(i).padStart(5, '0')}.webp`)
);

  const allImages = [...bikeImages, ...gearImages];

  const preloadInChunks = async (mediaPaths, type, chunkSize = 30) => {
    const chunks = [];
    for (let i = 0; i < mediaPaths.length; i += chunkSize) {
      chunks.push(mediaPaths.slice(i, i + chunkSize));
    }
    for (const chunk of chunks) {
      await Promise.all(
        chunk.map((path) =>
          new Promise((resolve, reject) => {
            const updateProgress = () => setLoadedAssets((prev) => prev + 1);
            if (type === "image") {
              const img = new Image();
              img.src = path;
              img.onload = () => {
                updateProgress();
                resolve();
              };
              img.onerror = () => {
                updateProgress(); // still count errors to avoid stalling
                resolve();
              };
            }
          })
        )
      );
    }
  };

  const preloadAssets = async () => {
    try {
      setTotalAssets(allImages.length);

      const initialImages = [
        ...bikeImages.slice(0, 10),
        ...gearImages.slice(0, 10),
      ];

      await preloadInChunks(initialImages, "image", 10);

      // Set initial fake progress
      setCount(50);

      // Background preload all
      await preloadInChunks(allImages, "image", 30);
      setCount(100); // Set actual count to 100
      setLoadingComplete(true);
    } catch (error) {
      console.error("Error during asset loading:", error);
      setLoadingComplete(true); // Allow progress to continue even if some fail
    }
  };

  useEffect(() => {
    if (totalAssets > 0) {
      const progress = Math.round((loadedAssets / totalAssets) * 100);
      setCount(progress > 100 ? 100 : progress);
    }
  }, [loadedAssets, totalAssets]);

  // Smooth animation toward the target count
  useEffect(() => {
    const interval = setInterval(() => {
      setSmoothCount((prev) => {
        if (prev < count) {
          return Math.min(prev + 1, 100);
        } else if (loadingComplete && prev < 100) {
          return Math.min(prev + 1, 100);
        } else {
          return prev;
        }
      });
    }, 20);

    return () => clearInterval(interval);
  }, [count, loadingComplete]);

  useEffect(() => {
  if (smoothCount === 100 && loadingComplete) {
    setTimeout(() => {
      setFade(false);
      onComplete();
    }, 500);
  }
}, [smoothCount, loadingComplete, onComplete]);

  useEffect(() => {
    if (isMobileDevice()) {
      setFade(false);
      onComplete();
    } else {
      preloadAssets();
    }
  }, []);

  if (isMobileDevice()) {
    return null;
  }

  return (
    <div id="loadingScreen" className="preloader">
      <img
        src={require("./assets/1400.gif")}
        alt="Loading"
        className="loading-image"
      />
      <h1 className={`loading-text ${fade ? "fade-in" : "fade-out"}`}>
        {smoothCount}
      </h1>
    </div>
  );
};

export default Preloader;






  {/* <iframe
        src="/light.html"
        className="iframe-background"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          overflow: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      ></iframe> */}
