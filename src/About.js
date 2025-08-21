import './About.css';
import Lenis from '@studio-freight/lenis';
// import Footer from './Footer';
import { useEffect, useRef , useState} from 'react';
import Notebook from './assets/mii.png';
import Leaf from './assets/Leaf.svg';
import Speedometer from './assets/Speedometer.svg';
import Globe from './assets/Globe.svg';
import Cycle from './assets/Cycle.svg';
import Demand from './assets/Demand.svg';
import EBike2 from './assets/mercellenie-about1.png';
import Icon1 from "./assets/LinkedIn.svg";
import Icon2 from "./assets/X.svg";
import Icon3 from "./assets/Instagram.svg";
import Icon4 from "./assets/Facebook.svg";
import Icon5 from "./assets/Youtube.svg";
import BottomBG from "./assets/Group34.png"
import 'splitting/dist/splitting.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import { Helmet } from 'react-helmet-async';
import Cursor from "./cursor";

gsap.registerPlugin(ScrollTrigger);



function About() {
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Clean up when the component unmounts
    };
  }, []);


  // Function to handle scroll-triggered animations
  const handleScrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          // Remove the class when the element leaves the viewport, so it can animate again when re-entered
          entry.target.classList.remove('animate');
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    elements.forEach((el) => observer.observe(el));
  };

  // Apply the scroll animation handling on component mount
  useEffect(() => {
    handleScrollAnimations();
  }, []);

  const electrifyingRef = useRef(null);
  const thrillRef = useRef(null);
  const ridingRef = useRef(null);
  const transformingRef = useRef(null);
  const backgroundImageRef = useRef(null);

  useEffect(() => {
    // Use matchMedia to target screen sizes
    const mm = gsap.matchMedia();

    // Parallax animations for screen sizes above 425px
    mm.add("(min-width: 426px)", () => {
      // Parallax effect for image
      gsap.to(backgroundImageRef.current, {
        yPercent: 20,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: backgroundImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax effect for text: Electrifying
      gsap.to(electrifyingRef.current, {
        y: 50,
        ease: "power4.out",
        scrollTrigger: {
          trigger: electrifyingRef.current,
          start: "top 90%",
          end: "bottom 50%",
          scrub: true,
        },
      });

      // Parallax effect for text: The Thrill
      gsap.to(thrillRef.current, {
        y: 50,
        ease: "power4.out",
        scrollTrigger: {
          trigger: thrillRef.current,
          start: "top 90%",
          end: "bottom 50%",
          scrub: true,
        },
      });

      // Parallax effect for text: OF Riding
      gsap.to(ridingRef.current, {
        y: 50,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ridingRef.current,
          start: "top 90%",
          end: "bottom 50%",
          scrub: true,
        },
      });

      // Parallax effect for text: Transforming Mobility
      gsap.to(transformingRef.current, {
        y: 50,
        ease: "power4.out",
        scrollTrigger: {
          trigger: transformingRef.current,
          start: "top 90%",
          end: "bottom 50%",
          scrub: true,
        },
      });
    });

    // Clean up GSAP when the component is unmounted
    return () => mm.revert();
  }, []);
  useEffect(() => {
    Splitting();
    const fx8Titles = [
      ...document.querySelectorAll(
        ".content__title-about1[data-splitting][data-effect8]"
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
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      Splitting();
      const fx4Titles = [
        ...document.querySelectorAll(
          ".content__title-about2[data-splitting][data-effect4]"
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
    });
    return () => mm.revert();
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".passion-meets-innovation");
      const discoverText = document.querySelector(".discover-effect");
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight && sectionTop > -sectionHeight) {
        const scrollPercent = Math.min((window.innerHeight - sectionTop) / window.innerHeight, 1.5);
        discoverText.style.transform = `translateY(${20 - scrollPercent * 100}%)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".image-text-container");
      const overlayText = document.querySelector(".overlay-text");
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight && sectionTop > -sectionHeight) {
        const scrollPercent = Math.min((window.innerHeight - sectionTop) / window.innerHeight, 1);
        overlayText.style.transform = `translateY(${20 - scrollPercent * 40}%)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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

  return (
    <><Helmet>
      <title>About | Mercellenie</title>
      <meta name="description" content="Mercellenie, born from innovation and perseverance, is set to revolutionize electric mobility. Discover the journey of India's fastest electric super bike." />
    </Helmet>
    <div className="scrollbar-container">
        <div className="scrollbar-progress" style={{ width: `${scroll}%` }} />
      </div>
      <Cursor />
      <div className="about">
        <div className="container-2">
          <div className="top-background">
            <div className='section-1 '>
              <div
                className="about-image"
                ref={backgroundImageRef}
              ></div>
              <span
                className="electrifying"
                ref={electrifyingRef}
              >
                Electrifying
              </span>
              <span className="the-thrill" ref={thrillRef}>
                THE Thrill
              </span>
              <span className="of-riding" ref={ridingRef}>
                OF Riding
              </span>
              <span className="transforming" ref={transformingRef}>
                Transforming Mobility, One<br />Exhilarating Ride at a<br />Time
              </span>
            </div>
          </div>
          <div className="group-18">
            <div className="rectangle-1550"></div>
            <div className="rectangle-1549"></div>
            <div className="rectangle-1548"></div>
          </div>
          <div className="group-49">
            <p className="container-who content__title-about1" data-splitting data-effect8>
              <span>/01 WHO WE ARE</span>
            </p>
          </div>

          <div className="innovators animate-on-scroll content__title-about2" data-splitting data-effect4>
            <span>Innovators<br />In-Motion</span>
          </div>

          <span className="at-mercellenie">
            At Mercellenie Automotive, we epitomize excellence in electric
            mobility. We craft premium electric bikes that set new
            benchmarks for performance and environmental responsibility.
            we deliver exceptional quality and innovation in electric mobility,
            setting new global standards with premium aesthetics,
            unmatched performance, extensive range, and fast charging.
          </span>

          <div className="group-48">
            <p className="container-who content__title-about1" data-splitting data-effect8>
              <span>/02 OUR APPROACH</span>
            </p>
          </div>

          <span className="we-believe">
            We believe in delivering electric vehicles that are not just eco-friendly but also premium and high-performing. We focus on creating a riding experience that is unmatched, where the power of electric meets the sophistication of high-end bikes. Our team is dedicated to pushing the boundaries of technology to build the best electric motorcycles.
          </span>
          <div className="power-style-efficiency">
            <span className="power">POWER</span>
            <span className="separator-left"></span>
            <span className="style">STYLE</span>
            <span className="separator-right"></span>
            <span className="efficiency">EFFICIENCY</span>
          </div>


          <div className="passion-meets-innovation">
            <div className="screenshot-image">
              {/* <img src="./src/pages/assets/Notebook.png" alt="Sketching e-bike design" /> */}
              <img src={Notebook} alt="Sketching e-bike design" />
            </div>
            <div className="innovation-text">
              <h1>PASSION<br />MEETS<br />INNOVATION</h1>

              <p className='discover-effect'>
                From concept to reality, witness the journey of Mercellenie's electric superbike—crafted from scratch and brought to life as a fully functional, high-performance machine. Experience the evolution of our design process and see how our vision has transformed into a powerful reality.
              </p>
            </div>
          </div>

          <div className="why-choose-us">
            <div className="why-text">
              <p className="section-number content__title-about1" data-splitting data-effect8>
                <span>/03 WHY CHOOSE US</span>
              </p>
              <h2>INNOVATIVE ELECTRIC BIKES FOR A BETTER TOMORROW!</h2>
            </div>
            <div className="why-icons">
              <div className="icon-item animate-on-scroll">
                <div className="icon-frame">
                  {/* <img className="vector" src="./src/pages/assets/Leaf.svg" alt="Icon" /> */}
                  <img src={Leaf} className='about-vector' alt="Icon" />
                </div>
                <div className="icon-text ">
                  <h3>SUSTAINABLE FUTURE</h3>
                  <p>Creating eco-friendly bikes for a better tomorrow.</p>
                </div>
              </div>
              <div className="icon-item animate-on-scroll">
                <div className="icon-frame">
                  {/* <img className="vector" src="./src/pages/assets/Speedometer.svg" alt="Icon" /> */}
                  <img src={Speedometer} className='about-vector' alt="Icon" />
                </div>
                <div className="icon-text">
                  <h3>HIGH PERFORMANCE</h3>
                  <p>Experience superior speed and efficiency.</p>
                </div>
              </div>
              <div className="icon-item animate-on-scroll">
                <div className="icon-frame">
                  {/* <img className="vector" src="./src/pages/assets/Globe.svg" alt="Icon" /> */}
                  <img src={Globe} className='about-vector' alt="Icon" />
                </div>
                <div className="icon-text">
                  <h3>GLOBAL IMPACT</h3>
                  <p>Proudly serving customers worldwide, from India.</p>
                </div>
              </div>
              <div className="icon-item animate-on-scroll">
                <div className="icon-frame">
                  {/* <img className="vector" src="./src/pages/assets/Cycle.svg" alt="Icon" /> */}
                  <img src={Cycle} className='about-vector' alt="Icon" />
                </div>
                <div className="icon-text">
                  <h3>PIONEERING INNOVATION</h3>
                  <p>Leading advancements in electric bike technology.</p>
                </div>
              </div>
              <div className="icon-item animate-on-scroll">
                <div className="icon-frame">
                  {/* <img className="vector" src="./src/pages/assets/Demand.svg" alt="Icon" /> */}
                  <img src={Demand} className='about-vector' alt="Icon" />
                </div>
                <div className="icon-text ">
                  <h3>GROWING DEMAND</h3>
                  <p>Positioned to capture the expanding market for electric bikes with our innovative and high-performing products.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="image-text-container">
            {/* <img src="./src/pages/assets/Mercelline.png" alt="Mercelline" className="mercelline-image" /> */}
            <img src={EBike2} className='mercelline-image' alt="mercelline-image" />
            <div className="overlay-text">
              <p>
                “EMBRACE THE THRILL GUILT-FREE WITH THE ELECTRIC SUPERBIKE. <br />
                EXPERIENCE <span className="highlight">POWERFUL SPEED AND ECO-FRIENDLY</span> DESIGN. CONQUER THE ROAD AND REDUCE YOUR CARBON FOOTPRINT WITH MERCELLENIE”
              </p>
            </div>
          </div>



          <div class="milestones-section">
            <div class="section-title">
              <p class="milestone-number  content__title-about1" data-splitting data-effect8>
                <span>/04 MileStones</span>
              </p>
              <h2>A Journey of Innovation and Perseverance</h2>
            </div>
            <div class="milestones">
              <div class="milestone">
                <div class="year">/2024</div>
                <div class="milestone-text">
                  <h3>Ready for soft Launch</h3>
                  <p className='animate-on-scroll'>By early 2024, our pre-production prototype completed rigorous testing and proved itself market-ready. In October, we launched a grand teaser, generating excitement and anticipation for the official release. Mercellenie is now set to redefine electric mobility, delivering a product that combines cutting-edge innovation with high performance.
                  </p>
                </div>
              </div>
              <div class="milestone">
                <div class="year">/2023</div>
                <div class="milestone-text">
                  <h3>Major Developments</h3>
                  <p className='animate-on-scroll'>In 2023 focused on refining the pre-production Prototype with a custom battery pack and chassis. After numerous iterations, we optimized the design for high energy density. Despite setbacks like overheating, we succeeded in creating a stable prototype and prepared for testing.
                  </p>
                </div>
              </div>
              <div class="milestone">
                <div class="year">/2022</div>
                <div class="milestone-text">
                  <h3>Overcoming Challenges</h3>
                  <p className='animate-on-scroll'>In 2022, we focused on improving the prototype by eliminating the bulky CVT system and embracing a more efficient design with a direct drive motor. Rebuilding the team, we achieved weight reduction and enhanced performance, pushing the prototype closer to production readiness.
                  </p>
                </div>
              </div>
              <div class="milestone">
                <div class="year">/2021</div>
                <div class="milestone-text">
                  <h3>Gaining Momentum</h3>
                  <p className='animate-on-scroll'>The second lockdown provided an opportunity to advance my vision, resulting in the first prototype. This phase highlighted the need for better battery technology and component refinement, laying the groundwork for further development.
                  </p>
                </div>
              </div>
              <div class="milestone">
                <div class="year">
                  <span class="start-year">/2018</span>
                  <span class="end-year">-2020</span>
                </div>
                <div class="milestone-text">
                  <h3>Building Foundations</h3>
                  <p className='animate-on-scroll'>
                    During college, I gained practical experience in vehicle dynamics through Baja competitions, leading projects and honing my skills. The 2020 lockdown allowed me to reflect and rekindle my focus on electric bikes, setting the foundation for future progress.
                  </p>
                </div>
              </div>



              <div class="milestone">
                <div class="year">/2017</div>
                <div class="milestone-text">
                  <h3>The Spark of Inspiration</h3>
                  <p>In 2017, a European tour became the turning point. A visit to Italy, rich with stories of automotive excellence, sparked a vision to build revolutionary electric motorcycles in Chennai. Inspired by this, I began sketching out my ideas, turning initial concepts into rough designs. This marked the beginning of a journey driven by passion and ambition to redefine the electric motorcycle industry.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='footer-vector'>
          

            <div className="footer">
              <span className="mercellinie">©2025 MERCELLENIE</span>
              {/* <a href="https://wings.design/" target="_blank" rel="noopener noreferrer" className="made-by-wings">
                Made by wings
              </a> */}
                <div className="download-icons">
              <div className="download-1">
                <a
                  href="https://www.linkedin.com/in/mercellenie-automotive-9a1910309/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={Icon1} className="icon1" alt="Icon 1" />
                </a>
              </div>
              <div className="download-3">
                <a href="https://www.instagram.com/mercellenie/" target="_blank" rel="noopener noreferrer">
                  <img src={Icon3} className="icon3" alt="Icon 3" />
                </a>
              </div>
              <div className="download-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61565197859780"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={Icon4} className="icon4" alt="Icon 4" />
                </a>
              </div>
              <div className="download">
                <a href="https://www.youtube.com/@Mercellenie" target="_blank" rel="noopener noreferrer">
                  <img src={Icon5} className="icon5" alt="Icon 5" />
                </a>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div></>
  )
}

export default About