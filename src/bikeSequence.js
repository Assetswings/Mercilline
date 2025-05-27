import React, { useState, useEffect, useRef } from "react";
import "./bikeSequence.css";
import Videosource3 from "./assets/website header bike animation 8.mp4";

const totalFrames = 159;
const images = [];

// Predefine image URLs
for (let i = 7; i < totalFrames + 7; i++) {
  const padded = String(i).padStart(5, "0");
  const url = `https://raw.githubusercontent.com/Murali2011/bike/main/1_${padded}.webp`;
  images.push(url);
}

function Bikesequence() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [showSmokeVideo, setShowSmokeVideo] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const bikeContainerRef = useRef(null);
  const bike1Ref = useRef(null);
  const videoRef = useRef(null);
  const animationFrame = useRef(null); // ✅ Added for requestAnimationFrame

  // ✅ IMPROVEMENT 1: Preload all images for smooth scroll
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // ✅ IMPROVEMENT 2: Track window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ IMPROVEMENT 3–5: Smooth scroll-based sequence with requestAnimationFrame
  useEffect(() => {
    const bikeContainer = bikeContainerRef.current;
    const gearElement = bike1Ref.current;

    if (!bikeContainer || !gearElement) return;

    if (!isMobileView) {
      bikeContainer.style.height = "300vh";
      gearElement.style.position = "sticky";
      gearElement.style.top = "0";

      const startScroll = bikeContainer.offsetTop;
      const endScroll = startScroll + bikeContainer.offsetHeight - window.innerHeight;
      const scrollableHeight = endScroll - startScroll;

      const updateFrame = () => {
        const scrollY = window.scrollY;

        if (scrollY >= startScroll && scrollY <= endScroll) {
          const progress = (scrollY - startScroll) / scrollableHeight;
          const index = Math.floor(progress * images.length);
          const clampedIndex = Math.min(Math.max(index, 0), images.length - 1);

          // ✅ Only update if index changes (prevents re-renders)
          if (clampedIndex !== currentImageIndex) {
            setCurrentImageIndex(clampedIndex);
            setShowOverlay(clampedIndex >= 40);
            setShowSmokeVideo(clampedIndex >= 50);
            setVideoOpacity(clampedIndex === 0 ? 1 : 0);
          }
        }
      };

      const onScroll = () => {
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
        }
        animationFrame.current = requestAnimationFrame(updateFrame); // ✅ Syncs scroll to paint frame
      };

      window.addEventListener("scroll", onScroll);
      updateFrame(); // Run once on mount

      return () => window.removeEventListener("scroll", onScroll);
    } else {
      bikeContainer.style.height = "25vh"; // Mobile fallback height
    }
  }, [isMobileView, currentImageIndex]);

  const mobileImageIndex = images.length - 1;

  return (
    <div className="bikeSequence-container" ref={bikeContainerRef}>
      <div className="bikeSequence" ref={bike1Ref}>
        {isMobileView ? (
          <img
            src={images[mobileImageIndex]}
            className="bikeSequence-pic"
            alt={`bike ${mobileImageIndex}`}
          />
        ) : (
          <>
            {currentImageIndex === 0 && (
              <video
                ref={videoRef}
                src={Videosource3}
                loop
                autoPlay
                muted
                className="bikeSequence-video"
                style={{ opacity: videoOpacity }}
              />
            )}
            <img
              src={images[currentImageIndex]}
              className="bikeSequence-pic"
              alt={`bike ${currentImageIndex}`}
            />
            {showOverlay && (
              <img
                src={require("./assets/Group 56.png")}
                className="overlay-image"
                alt="Overlay"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Bikesequence;
