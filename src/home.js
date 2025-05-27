import React, { useEffect, useRef, useState, useLayoutEffect } from "react";

//Packages
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis, { useLenis } from "lenis/react";
import { Canvas } from "@react-three/fiber";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import { Helmet } from "react-helmet-async";

// Component
import Battery from "./batteryrotation";
import Features from "./Features";
import Cursor from "./cursor";
import "./home.css";
import "./Features.css";
import BikeSequence from "./bikeSequence";

//Assets
import Mercelline from "./assets/2img.png";
import Gloves from "./assets/4img.png";
import Bikedoom from "./assets/3img.png";
import BikeFrontView from "./assets/5img.png";
import Display from "./assets/display.gif";
import Gps from "./assets/map.gif";
import Bluetooth from "./assets/Bluetooth.gif";
import Location from "./assets/Compass.gif";
import MeasurementUnit from "./assets/Stability.gif";
import Dot from "./assets/Dot.png";
import Top from "./assets/Top.png";
import LinkedIn from "./assets/LinkedIn.png";
import Youtube from "./assets/youtube.png";
import Instagram from "./assets/Instagram.png";
import Facebook from "./assets/Facebook.png";
import HomeBikeVideo from "./assets/Visual 8 (1).mp4";
import BikeHeadLight from "./assets/footer.webm";
import Gear from "./gear";
import Icon1 from "./assets/LinkedIn.svg";
import Icon2 from "./assets/X.svg";
import Icon3 from "./assets/Instagram.svg";
import Icon4 from "./assets/Facebook.svg";
import Icon5 from "./assets/Youtube.svg";

gsap.registerPlugin(ScrollTrigger);

function Home({ handleNavigateBack }) {
  // const containersRef = useRef(null);
  const maskRef = useRef(null);
  const [bikeSequenceLoaded, setBikeSequenceLoaded] = useState(false); // NEW

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => {
     window.removeEventListener("resize", handleResize);
        };
  }, []);

  const [scroll, setScroll] = useState(0);

    useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (scrollTop / windowHeight) * 100;
      setScroll(scrolled);
    };

    const updateScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const [frameIndex, setFrameIndex] = useState(0);
  const totalFrames = BikeSequence.length;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;

      const scrollFraction = scrollTop / maxScroll;
      const index = Math.min(
        totalFrames - 1,
        Math.floor(scrollFraction * totalFrames)
      );
      setFrameIndex(index);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bike Video Animation

  document.addEventListener("DOMContentLoaded", () => {
    const bikeContainer = document.querySelector(".bike-container");
    const bikeFrontImage = document.querySelector(".Bikefront-image");

    function fadeInBikeFrontImage() {
      setTimeout(() => {
        bikeFrontImage.classList.add("fade-in");
      }, 2000); // 2-second delay
    }

    // Detect when the user scrolls into the bike-container
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fadeInBikeFrontImage();
        }
      });
    });

    observer.observe(bikeContainer);
  });

  // Parallax

  const lenis = useLenis(({ scroll }) => {
    const parallaxElements = document.querySelectorAll(".parallax");

    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-speed");
      const yPos = -(scroll * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });

  // For scrolling to Top

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // About Page Animation

  useEffect(() => {
    // Animation for images coming from the left into their positions
    gsap.fromTo(
      ".section2-container img ",
      {
        x: -300, // Start 300px to the left
        opacity: 0, // Hidden at start
      },
      {
        x: 0, // Move to original position
        opacity: "1", // Fade in
        stagger: 0.3, // Delay between animations for each image
        duration: 0.5, // Animation duration
        ease: "power3.out", // Easing for a smooth effect
        scrollTrigger: {
          trigger: ".section2-container",
          start: "top 75%", // Animation starts when the section is 75% from the top of the viewport
          toggleActions: "play none none reverse", // Reverses when you scroll back up
        },
      }
    );
  }, []);

  //Text Animation

  useEffect(() => {
    Splitting();
    const fx4Titles = [
      ...document.querySelectorAll(
        ".content__title1[data-splitting][data-effect4]"
      ),
    ];
    fx4Titles.forEach((title) => {
      const words = title.querySelectorAll(".word");

      for (const word of words) {
        const chars = word.querySelectorAll(".char");

        gsap.fromTo(
          chars,
          {
            "will-change": "opacity, transform",
            x: (position, _, arr) => 150 * (position - arr.length / 2),
          },
          {
            ease: "power1.inOut",
            x: 2,
            stagger: {
              grid: "auto",
              from: "center",
            },
            scrollTrigger: {
              trigger: word,
              start: "center bottom+=50%",
              end: "top top+=15%",
              scrub: true,
            },
          }
        );
      }
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    Splitting();
    const fx8Titles = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect8]"
      ),
    ];
    const lettersAndSymbols = [
      "a",
      "b",
      "i",
      "j",
      "k",
      "l",
      "x",
      "y",
      "z",
      "!",
      "@",
      "#",
      "$",
      "+",
      "=",
    ];
    fx8Titles.forEach((title) => {
      const chars = title.querySelectorAll(".char");

      chars.forEach((char, position) => {
        let initialHTML = char.innerHTML;

        gsap.fromTo(
          char,
          {
            opacity: 0,
          },
          {
            duration: 0.1,
            innerHTML: () =>
              lettersAndSymbols[
                Math.floor(Math.random() * lettersAndSymbols.length)
              ],
            repeat: 1,
            repeatRefresh: true,
            opacity: 1,
            repeatDelay: 0.01,
            delay: (position + 1) * 0.1,
            onComplete: () =>
              gsap.set(char, { innerHTML: initialHTML, delay: 0.01 }),
            scrollTrigger: {
              trigger: title,
              start: "top bottom",
              end: "bottom center",
              toggleActions: "play resume resume reset",
              onEnter: () => gsap.set(char, { opacity: 0 }),
            },
          }
        );
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    Splitting();
    const fx10Titles = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect10]"
      ),
    ];
    fx10Titles.forEach((title) => {
      const chars = title.querySelectorAll(".char");

      gsap.fromTo(
        chars,
        {
          "will-change": "opacity",
          opacity: 0,
          filter: "blur(20px)",
        },
        {
          duration: 0.25,
          ease: "power1.inOut",
          opacity: 1,
          filter: "blur(0px)",
          stagger: { each: 0.05, from: "random" },
          scrollTrigger: {
            trigger: title,
            start: "top bottom",
            end: "center center",
            toggleActions: "play resume resume reset",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    Splitting();
    const fx10Titles = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect10]"
      ),
    ];
    fx10Titles.forEach((title) => {
      const chars = title.querySelectorAll(".char");

      gsap.fromTo(
        chars,
        {
          "will-change": "opacity",
          opacity: 0,
          filter: "blur(20px)",
        },
        {
          duration: 0.25,
          ease: "power1.inOut",
          opacity: 1,
          filter: "blur(0px)",
          stagger: { each: 0.05, from: "random" },
          scrollTrigger: {
            trigger: title,
            start: "top bottom",
            end: "center center",
            toggleActions: "play resume resume reset",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const wrapElements = (elems, wrapType, wrapClass) => {
    elems.forEach((char) => {
      const wrapEl = document.createElement(wrapType);
      wrapEl.classList = wrapClass;
      char.parentNode.appendChild(wrapEl);
      wrapEl.appendChild(char);
    });
  };

  useEffect(() => {
    Splitting();
    const fx11Titles = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect11]"
      ),
    ];
    fx11Titles.forEach((title) => {
      const chars = title.querySelectorAll(".char");
      wrapElements(chars, "span", "char-wrap");

      gsap.fromTo(
        chars,
        {
          "will-change": "transform",
          transformOrigin: "0% 50%",
          xPercent: 105,
        },
        {
          duration: 1,
          ease: "expo",
          xPercent: 0,
          stagger: 0.042,
          scrollTrigger: {
            trigger: title,
            start: "top bottom",
            end: "top top+=10%",
            toggleActions: "play resume resume reset",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    Splitting();
    const fx27Titles = [
        ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect27]"
      ),
    ];
    fx27Titles.forEach((title) => {
      const words = [...title.querySelectorAll(".word")];
      words.forEach((word) => gsap.set(word.parentNode, { perspective: 1000 }));
      gsap.fromTo(
        words,
        {
          "will-change": "opacity, transform",
          z: () => gsap.utils.random(500, 950),
          opacity: 0,
          xPercent: (pos) => gsap.utils.random(-100, 100),
          yPercent: (pos) => gsap.utils.random(-10, 10),
          rotationX: () => gsap.utils.random(-90, 90),
        },
        {
          ease: "expo",
          opacity: 1,
          rotationX: 0,
          rotationY: 0,
          xPercent: 0,
          yPercent: 0,
          z: 0,
          scrollTrigger: {
            trigger: title,
            start: "center center",
            end: "+=200%",
            scrub: true,
            pin: title.parentNode,
          },
          stagger: {
            each: 0.006,
            from: "random",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    Splitting();
    const fx29Titles = [
      ...document.querySelectorAll(
        ".content__title[data-splitting][data-effect29]"
      ),
    ];
    fx29Titles.forEach((title) => {
      const words = [...title.querySelectorAll(".word")];
      words.forEach((word, pos) => {
        const chars = word.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          {
            "will-change": "transform",
            transformOrigin: `${pos % 2 ? 0 : 100}% ${pos % 2 ? 100 : 0}%`,
            scale: 0,
          },
          {
            ease: "power4",
            scale: 1,
            stagger: {
              each: 0.03,
              from: pos % 2 ? "end" : "start",
            },
            scrollTrigger: {
              trigger: word,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Teaser Animation
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayCursor, setShowPlayCursor] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup

  useEffect(() => {
    // GSAP scroll animation for scaling video
    gsap.fromTo(
      videoRef.current,
      { scale: 0.8 }, // Initial scale
      {
        scale: 1.5, // Zoom in on scroll
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: true, // Smooth scroll effect
          onEnter: () => setShowPlayCursor(true),
          onLeaveBack: () => setShowPlayCursor(false),
        },
      }
    );
  }, []);

  // Handle click to unmute and open popup
  const handleVideoClick = () => {
    if (isMuted) {
      videoRef.current.muted = true; // Unmute the video
      setIsMuted(false);
    }
    setIsPopupOpen(true); // Open the popup
  };

  // Close popup when clicked outside or on close button
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  //

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".section3-container");
      const para = document.querySelector(".para-position");
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight && sectionTop > -sectionHeight) {
        const scrollPercent = Math.min(
          (window.innerHeight - sectionTop) / window.innerHeight,
          2
        );
        para.style.transform = `translateY(${50 - scrollPercent * 60}%)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bikePositionRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the fade-in class when the section is in view
            bikePositionRef.current.classList.add("fade-in-visible");
          }
        });
      },
      {
        threshold: 0.5, // Adjust this value to trigger when half of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const playerRef = useRef(null);

  useEffect(() => {
    // Load the YouTube Iframe API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Create the player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        events: {
          onStateChange: handleVideoStateChange,
        },
      });
    };
  }, []);

  // Pause video at the end
  const handleVideoStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      playerRef.current.seekTo(0); // Go to the start
      playerRef.current.pauseVideo(); // Pause at the start
    }
  };

  return (
    <>
      {/* Bike Section */}
      <Helmet>
        <title>Mercellenie: India's Fastest Electric Super Bike</title>
        <meta
          name="description"
          content="Mercellenie delivers India's fastest electric super bike experience. Blend speed, technology, and sustainability in one thrilling package."
        />
      </Helmet>
      <div className="scrollbar-container">
        <div className="scrollbar-progress" style={{ width: `${scroll}%` }} />
      </div>
      <Cursor />
      <ReactLenis root>
        <div>
          <BikeSequence onSequenceLoaded={() => setBikeSequenceLoaded(true)} />
        </div>

        {/* Only render the rest of the site when the sequence is ready */}
        {bikeSequenceLoaded && (
          <div className="main-site-content">
            {/* Your actual site sections go here */}
          </div>
        )}

        {/* Main content only after bike sequence is ready */}
        <div
          className={`home-container scroll-container ${
            bikeSequenceLoaded ? "fade-in" : "fade-hidden"
          }`}
          onScroll={handleNavigateBack}
        />

        {/* section-1 */}
        <div
          className="home-container scroll-container"
          onScroll={handleNavigateBack}
        >
          <div className="content content--full">
            <span className="home-para1" style={{ color: "white" }}>
              EXPERIENCE THE
            </span>{" "}
            <h2
              className="content__title1"
              {...(!isMobile
                ? { "data-splitting": true, "data-effect4": true }
                : {})}
            >
              <br />
              <span className=" font-larger">INDIA'SFASTEST</span> <br />
              <span className="ride-para font-upper font-sub font-7">
                {" "}
                EV-RIDE
              </span>
            </h2>
          </div>
          <div className="content">
            <p
              className="content__title home-intro"
              {...(!isMobile
                ? { "data-splitting": true, "data-effect8": true }
                : {})}
            >
              <span className="font-8 home-intro">
                {" "}
                WELCOME TO MERCELLENIE - REDEFINING <br />
                THE FUTURE OF ELECTRIC SUPERBIKES{" "}
              </span>
            </p>
          </div>

          <div ref={containerRef} className="image-div">
            <video
              ref={videoRef}
              className="HomeBike-video"
              muted
              loop
              autoPlay
              playsInline
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleVideoClick} // Click to open popup
            >
              <source src={HomeBikeVideo} type="video/mp4" />
            </video>
            {showPlayCursor && isHovered && (
              <div className="play-text-cursor">Play</div>
            )}

            {/* Modal for YouTube video */}
            {isPopupOpen && (
              <div className="popup-overlay" onClick={closePopup}>
                <div
                  className="popup-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="close-btn" onClick={closePopup}>
                    X
                  </button>
                  <iframe
                    id="youtube-player"
                    src="https://www.youtube.com/embed/IMGxW9dFwkw?rel=0&controls=1&modestbranding=1&autoplay=0&loop=0&playlist=IMGxW9dFwkw"
                    title="YouTube video"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* section-2 */}
        <div className="section-container ">
          <div className="background-container">
            <div className="section1-container">
              <div className="section1-flex">
                <div className="col-6 about-col content">
                  <p
                    className="about-01 content__title"
                    {...(!isMobile
                      ? { "data-splitting": true, "data-effect8": true }
                      : {})}
                  >
                    <span className="font-8 font-abouteffect">/01 ABOUT</span>
                  </p>
                </div>
                <div className="col-6">
                  <p className="section-para">
                    DISCOVER THE FREEDOM WITH
                    <br />
                    MERCELLENIE SUPERBIKES,
                    <br />
                    OFFERING UNPARALLELED
                    <br />
                    RANGE AND TOP SPEEDS FOR AN
                    <br />
                    ELECTRIFYING, UNCOMPROMISED
                    <br />
                    JOURNEY.
                  </p>
                </div>
              </div>
            </div>
            <div className="section2-container">
              <div className="col-3 col-3">
                <img src={Mercelline} alt="Logo" className="Mercelline-image" />
              </div>
              <div className="col-3 col-2">
                <div>
                  <img
                    src={BikeFrontView}
                    alt="Logo"
                    className="Image2-image"
                  />
                  <p className="section2-para">
                    SEAMLESS CONNECTIVITY. <br />
                    LIGHTWEIGHT MATERIALS. <br />
                    ADVANCED BATTERY TECHNOLOGY.
                  </p>
                </div>
              </div>
              <div className="col-3 col-1">
                <img src={Bikedoom} alt="Logo" className="Image1-image" />
              </div>
              <div className="col-3 col-4">
                <img src={Gloves} alt="Logo" className="Gloves-image" />
              </div>
            </div>
            <div className="dot">
              <img src={Dot} className="dot-icon" />
            </div>
          </div>
        </div>
        {/* Gear */}
        <div>
          <Gear />
        </div>
        {/* section-3 */}
        <div className="section3-container">
          <div className="para-position">
            <div className=" para-tech content1">
              <p
                className="content__title"
                {...(!isMobile
                  ? { "data-splitting": true, "data-effect8": true }
                  : {})}
              >
                <span className="font-8 para-num">/02 TECHNOLOGY</span>
              </p>
            </div>
            <div className="content">
              <h2
                className="content__title section3-para"
                {...(!isMobile
                  ? { "data-splitting": true, "data-effect11": true }
                  : {})}
              >
                <span className="font-3 font-height font-align">
                  UNMATCHED <br />
                  ELECTRIC <br />
                  PERFORMANCE
                </span>
              </h2>
            </div>
            <p className="section3-shortpara">
              Feel the power surge with our advanced technology, <br />
              delivering thrilling acceleration.We push EV performance <br />
              boundaries to ensure you experience the best drive.
            </p>
          </div>
        </div>
        {/* Battery */}
        <div>
          <Battery />
        </div>
        {/* Features */}
        <div className="feature-heading">
          {isMobile ? (
            // Below 768px content
            <>
              <div className="vison-words">
              <p className="vision">/04 FEATURES</p>
              </div>
              <div>
                <h2 className="vision-larger">
                  AN EVOLUTIONARY VISION <br />
                  FOR REVOLUTIONARY <br />
                  PRODUCTS
                </h2>
              </div>
            </>
          ) : (
            // Above 768px content
            <div className="content">
              <div className="content1">
                <p className="content__title" data-splitting data-effect8>
                  <span className="font-8 vision">/04 FEATURES</span>
                </p>
              </div>
              <h2 className="content__title" data-splitting data-effect27>
                <span className="font-upper font-19 font-medium">
                  AN EVOLUTIONARY VISION <br />
                  FOR REVOLUTIONARY <br />
                  PRODUCTS
                </span>
              </h2>
            </div>
          )}
        </div>
        {/* Bike Mention */}
        <div>
          <Features />
        </div>
        {/* Command your Ride */}
        <div className="command-container">
          <div className="content1 command-dash">
            <p
              className="content__title"
              {...(!isMobile
                ? { "data-splitting": true, "data-effect8": true }
                : {})}
            >
              <span className="font-8 dash-para">/05 DASHBOARD</span>
            </p>
          </div>

          <div className="command-flex">
            <div className="command-arrangement">
              <p className="command-heading">
                COMMAND <br /> YOUR RIDE
              </p>
              <p className="command-para">
                CUTTING-EDGE <br />
                DASHBOARD TECHNOLOGY
              </p>
            </div>
            <div style={{ flex: 7 }}></div>
          </div>
          <div className="row">
            <div className="column1">
              <div className="sub-column text">
                <div className="text-flex">
                  <p className="inch-para">
                    5 INCH TFT <br />
                    DISPLAY
                  </p>
                  <p className="para-command">
                    A vibrant screen providing real-time <br />
                    information and controls.
                  </p>
                </div>
              </div>
              <div className="sub-column image">
                <img src={Display} className="art" alt="Display 1" />
              </div>
            </div>
            <div className="column2">
              <div className="sub-column text">
                <div className="text-flex">
                  <p className="inch-para">
                    INTEGRATED GPS RECEIVER <br />
                    AND BLUETOOTH
                  </p>
                  <p className="para-command">
                    Enables navigation and <br />
                    communication.
                  </p>
                </div>
              </div>
              <div className="sub-column image">
                <img src={Gps} className="art1" alt="Display 2" />
              </div>
            </div>
          </div>
          <div className="row-layout">
            <div className="column-one">
              <div className="content-wrapper">
                <p className="header-text">
                  NFC & BLUETOOTH <br />
                  256 BIT ENCRYPTION
                </p>
                <p className="description-text">
                  Ensures encryption for seamless, <br />
                  protected integration.
                </p>
                <div className="sub-column image">
                  <img
                    src={Bluetooth}
                    className="image-display"
                    alt="Display 1"
                  />
                </div>
              </div>
            </div>
            <div className="column-two">
              <div className="content-wrapper">
                <p className="header-text">
                  GPS FOR REAL
                  <br />
                  TIME TRACKING
                </p>
                <p className="description-text">
                  Provides location based services, <br />
                  ensuring you're always connected to <br />
                  your route.
                </p>
                <div className="sub-column image">
                  <img
                    src={Location}
                    className="image-display"
                    alt="Display 2"
                  />
                </div>
              </div>
            </div>
            <div className="column-three">
              <div className="content-wrapper">
                <p className="header-text">
                  9-AXIS INTERTIAL <br />
                  MEASUREMENT UNIT
                </p>
                <p className="description-text">
                  Tracks orientation and motion for <br />
                  enhanced stability.
                </p>
                <div className="sub-column image">
                  <img
                    src={MeasurementUnit}
                    className="image-display"
                    alt="Display 3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Final Section*/}
        {isMobile ? (
          <div className="content">
            <h2 className="content__title content_ready">
              <span className="font-lower">GET READY TO</span>
              <span className="font-upper">EXPERIENCE THE </span>
              <span className="font-upper">FUTURE OF RIDING!</span>
            </h2>
          </div>
        ) : (
          <div className="content">
            <h2
              className="content__title content_ready"
              data-splitting
              data-effect29
            >
              <span className="font-lower">GET READY TO</span>
              <span className="font-upper">EXPERIENCE THE </span>
              <span className="font-upper">FUTURE OF RIDING!</span>
            </h2>
          </div>
        )}
        <div className="bike-container" ref={sectionRef}>
          <div className="bike-background">
            <div className="content-wrapper1">
              <div className="bike-back">
                <div className="top">
                  <img
                    src={Top}
                    className="top-image"
                    onClick={scrollToTop}
                    alt="Back to top"
                  />
                  <p className="back-top">BACK TO TOP</p>
                </div>
                <div>
                  <p className="policy">
                    <span className="copyrights">©2025 MERCELLENIE</span>
                  </p>
                </div>
              </div>

              <div className="bike-position" ref={bikePositionRef}>
                <video className="Bikefront-image" autoPlay muted>
                  <source src={BikeHeadLight} type="video/webm" />
                </video>
              </div>

              <div className="wings">
                <div className="wings-rights">
                  <div className="icon-flex">
                    <a
                      href="https://www.linkedin.com/in/mercellenie-automotive-9a1910309/"
                      target="_blank"
                      className="link link--helike"
                    >
                      <img src={Icon1} className="icon1" alt="Icon 1" />
                    </a>
                    <a
                      href="https://www.youtube.com/@Mercellenie"
                      target="_blank"
                      className="link link--helike"
                    >
                      <img src={Icon5} className="icon2" alt="Icon 2" />
                    </a>
                    <a
                      href="https://www.instagram.com/mercellenie/"
                      target="_blank"
                      className="link link--helike"
                    >
                      <img src={Icon3} className="icon4" alt="Icon 4" />
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61565197859780"
                      target="_blank"
                      className="link link--helike"
                    >
                      <img src={Icon4} className="icon5" alt="Icon 5" />
                    </a>
                  </div>
                  <p className="wings-work">
                    MADE BY{" "}
                    <a
                      href="https://wings.design/"
                      target="_blank"
                      className="wings-site"
                    >
                      WINGS
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReactLenis>
    </>
  );
}

export default Home;
