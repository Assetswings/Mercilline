import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import './gear.css';
import mobileImage from './assets/1_00089.png';

  const totalFrames = 86;
  const gearImages = Array.from({ length: totalFrames }, (_, i) => {
  const padded = String(i).padStart(5, '0');
  return `https://raw.githubusercontent.com/Murali2011/bikegear/refs/heads/main/1_${padded}.webp`;
});

function Gear() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGearSticky, setIsGearSticky] = useState(false);
  const [scale, setScale] = useState(0.5);
  const [gearOpacity, setGearOpacity] = useState(0);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const gearContainerRef = useRef(null);
  const gearHeadingRef = useRef(null);
  const gear2Ref = useRef(null);
  const scrollAnimationFrame = useRef(null);

  useEffect(() => {
    const preload = async () => {
      await Promise.all(
        gearImages.map((src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );
      setImagesLoaded(true);
    };
    preload();
  }, []);

     useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    const onScroll = () => {
      if (scrollAnimationFrame.current) return;

      scrollAnimationFrame.current = requestAnimationFrame(() => {
        const gearContainer = gearContainerRef.current;
        const gear2 = gear2Ref.current;
        const gearHeading = gearHeadingRef.current;
        if (!gearContainer || !gear2 || !gearHeading) return;

        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        const headingRect = gearHeading.getBoundingClientRect();
        const triggerY = windowHeight * 0.75;

        // Delay start of gear-power animation
        const rawProgress = Math.min((triggerY - headingRect.top) / triggerY, 1);
        const adjustedProgress = Math.max((rawProgress - 0.2) / 0.8, 0);
const scaleProgress = Math.min(adjustedProgress, 1);

// Only update scale and opacity until frames finish
// If gear sequence hasn't started yet
if (currentImageIndex < totalFrames - 1) {
  setScale(0.5 + scaleProgress * 0.5);
  setGearOpacity(scaleProgress);
} else {
  // Lock scale and opacity once last frame is shown
  setScale(1); // Fully zoomed in
  setGearOpacity(1); // Fully visible
}

        const containerTop = gearContainer.offsetTop;
        const containerHeight = gearContainer.offsetHeight;
        const scrollableHeight = containerHeight - windowHeight;
        const startScroll = containerTop;
        const endScroll = containerTop + scrollableHeight;

        if (scrollY >= startScroll && scrollY <= endScroll) {
          if (scaleProgress >= 1) {
            const progress = (scrollY - startScroll) / scrollableHeight;
            const index = Math.round(progress * (totalFrames - 1));
            setCurrentImageIndex(Math.min(Math.max(index, 0), totalFrames - 1));
          }
        }

        // Sticky logic with release delay
        const stickyStart = containerTop + windowHeight * 0.5;
        const extraDelay = 400;
        const stickyEnd = endScroll + extraDelay;

        const isInStickyRange =
          scaleProgress >= 1 &&
          scrollY >= stickyStart &&
          scrollY <= stickyEnd &&
          currentImageIndex >= totalFrames - 1;

        setIsGearSticky(isInStickyRange);

        scrollAnimationFrame.current = null;
      });
    };

    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollAnimationFrame.current) cancelAnimationFrame(scrollAnimationFrame.current);
    };
  }, [isMobileView, currentImageIndex]);

  const currentImage = isMobileView ? mobileImage : gearImages[currentImageIndex];

  return (
    <div className="gear-container" ref={gearContainerRef}>
      <div className="content">
        <h2
          className="content__title content_ready"
          style={{ color: 'white' }}
          {...(!isMobileView ? { 'data-splitting': true, 'data-effect10': true } : {})}
        >
          <span className="font-medium font-1">THE</span>
          <span className="font-7">ULTIMATE RIDING</span>
          <span className="font-4">EXPERIENCE</span>
        </h2>
      </div>

      <div className='gear-sticky'>
        <div className="gear-heading" ref={gearHeadingRef}>
          <div
            className="gear-power"
            style={{
              transform: `scale(${isMobileView ? 1.2 : scale}) translateY(${(1 - gearOpacity) * 20}px)`,
              opacity: gearOpacity,
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              willChange: 'transform, opacity',
            }}
          ></div>

          <div className={`gear2 ${isGearSticky ? 'sticky' : ''}`} ref={gear2Ref}>
            {imagesLoaded ? (
              <img
                src={currentImage}
                className="gear-pic"
                alt={`gear ${currentImageIndex}`}
                style={{
                  transition: 'opacity 0.3s ease',
                  willChange: 'transform, opacity',
                }}
              />
            ) : (
              <p>Loading Gear...</p>
            )}
          </div>
      
        </div>
        <div className="gear-setting">
        <p className="gear-watt" style={{ left: '20%', opacity: 1 }}>
          POWER <br />
          <span className="font-watt">
            90 <span className="kilowatt-space">KW</span>
          </span>
        </p>
        <p className="gear-torque" style={{ right: '20%', opacity: 1 }}>
          TORQUE <br />
          <span className="font-watt">
            150 <span className="kilowatt-space">NM</span>
          </span>
        </p>
      </div>

      <div className="gear-text">
        <p className="gear-para">
          DISCOVER TRUE FREEDOM WITH MERCELLENIE
          <br />
          SUPERBIKES OFFERING UNPARALLELED RANGE.
        </p>
      </div>
      </div>
    </div>
  );
}

export default Gear;
