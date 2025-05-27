

import React, { useState, useRef, useEffect } from "react";
import "./Features.css";
import Line from './assets/Line.svg'; // Update with your image path

function importAll(r) {
  return r.keys().map(r);
}

const imageBaseUrl = "https://raw.githubusercontent.com/Murali2011/bike-images2/main/";

const totalImages = 207; // update as needed based on total images you have

const images = Array.from({ length: totalImages }, (_, i) => {
  const frameNumber = i.toString().padStart(5, "0");
  return `${imageBaseUrl}1_${frameNumber}.jpg`;
});

const edgePoints = [
  { start: 0, end: 0 },
  { start: 1, end: 39 },
  { start: 40, end: 95 },
  { start: 96, end: 150 },
  { start: 151, end: 181 },
  { start: 182, end: 206 },
];

const BikeAnimation = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(7);
  const [activeEdgePoint, setActiveEdgePoint] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const imgRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (isPlaying && !transitioning && !isHovered) {
      animationRef.current = setTimeout(() => {
        autoPlayImages();
      }, 40); // Adjust the speed of image transition here
    }

    return () => {
      clearTimeout(animationRef.current);
    };
  }, [currentImageIndex, isPlaying, transitioning, isHovered]);

  const autoPlayImages = () => {
    // Get the current screen width
    const screenWidth = window.innerWidth;

    if (screenWidth >= 320 && screenWidth <= 768) {
      setCurrentImageIndex(0); 
      return; 
    }

    if (transitioning) return;

    const currentPoint = edgePoints[activeEdgePoint];

    if (currentImageIndex === currentPoint.end) {
      setTransitioning(true);

      setTimeout(() => {
        setTransitioning(false);
        setActiveEdgePoint((prev) => {
          const newActivePoint = prev + 1;
          return newActivePoint >= edgePoints.length ? 0 : newActivePoint;
        });
      }, 2000);
    } else {
      setCurrentImageIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex > currentPoint.end ? currentPoint.end : nextIndex;
      });
    }
  };

  const handleEdgePointClick = async (pointIndex) => {
    clearTimeout(animationRef.current);
    setIsPlaying(false);
    setTransitioning(true);

    const currentPoint = edgePoints[pointIndex];
    const step = currentImageIndex < currentPoint.end ? 1 : -1;

    const transitionToEdgePoint = async () => {
      for (let i = currentImageIndex; i !== currentPoint.end + step; i += step) {
        await new Promise((resolve) => {
          setTimeout(() => {
            setCurrentImageIndex(i);
            resolve();
          }, 50);
        });
      }
    };

    await transitionToEdgePoint();
    setTransitioning(false);
    setTimeout(() => {
      setIsPlaying(true);
    }, 2000);

    setActiveEdgePoint(pointIndex);
  };

  const calculateProgressBarWidth = () => {
    const totalPoints = edgePoints.length - 1;
    const segmentWidth = 100 / totalPoints;
    return `${activeEdgePoint * segmentWidth}%`;
  };

  // Hover handlers for the bike-text-container
  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsPlaying(false); // Stop auto image transition when hovered
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPlaying(true); // Resume auto image transition when hover ends
  };

  return (
    <>
      <div className="bike-flex">
        <div className="bike-placing">
          <img
            src={images[currentImageIndex]}
            className="Bikefront-images"
            alt="Bike Animation"
            ref={imgRef}
          />
        </div>

        {/* Timeline with progress and edge points */}
        <div className="">
          <div className=""></div>
          <div className="" style={{ width: calculateProgressBarWidth() }}></div>
          {edgePoints.map((point, index) => (
            <div
              key={index}
              className={` ${index === activeEdgePoint ? 'active' : ''}`}
              onClick={() => handleEdgePointClick(index)}
              style={{ left: `${(index / (edgePoints.length - 1)) * 100}%` }}
            >
              {currentImageIndex >= point.end && <div className=""></div>}
            </div>
          ))}
        </div>

        {currentImageIndex === 0 && (
          <div
            className="bike-text-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`bike-box ${currentImageIndex === 0 ? "show" : ""}`}>
              <h5 className="bike-information">Regenerative Braking</h5>
              <p className="bike-details">Enhances Energy Efficiency.</p>
            </div>
          </div>
        )}

        {currentImageIndex === 39 && (
          <div
            className="bike-text-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`bike-box1 ${currentImageIndex === 39 ? "show" : ""}`}>
              <h5 className="bike-information">Hill Hold Control</h5>
              <p className="bike-details">
                Keeps the bike stationary <br />on inclines, preventing rollback.
              </p>
            </div>
          </div>
        )}

        {currentImageIndex === 95 && (
          <div
            className="bike-text-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`bike-box2 ${currentImageIndex === 95 ? "show" : ""}`}>
              <h5 className="bike-information">Traction Control</h5>
              <p className="bike-details">
                Manages Wheel Slip, ensuring better grip <br />and stability especially in slippery conditions.
              </p>
            </div>
          </div>
        )}

        {currentImageIndex === 150 && (
          <div
            className="bike-text-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`bike-box3 ${currentImageIndex === 150 ? "show" : ""}`}>
              <h5 className="bike-information">Park Assist & Reverse Throttle</h5>
              <p className="bike-details">Assists in Parking and maneuvering.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BikeAnimation;


