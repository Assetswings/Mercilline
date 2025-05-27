import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import Logo from "./assets/Logo.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 500);
  const headerRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // Update `isSmallScreen` on resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll for fade effect
  useEffect(() => {
    const handleScroll = () => {
      const fadeStart = window.innerHeight * 2;
      setIsFading(window.scrollY >= fadeStart);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="header"
      ref={headerRef}
      style={{
        margin: 0,
        position: isSmallScreen ? "relative" : "fixed", // Static on small screens, fixed otherwise
        top: "0px",
        opacity: isFading ? 0 : 1,
        width: "100%",
        zIndex: 1000,
        transition: "opacity 0.5s ease",
      }}
    >
      <Link to="/">
        <img className="layer-1" src={Logo} alt="Layer 1 Logo" />
      </Link>
      <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <div className="about-contact1">
          {menuOpen && (
            <>
              <Link to="/" className="link link--helike" onClick={closeMenu}>
                <span>Home</span>
              </Link>
              <span className="separator1"> - </span>
            </>
          )}
          <Link to="/about" className="link link--helike" onClick={closeMenu}>
            <span>About</span>
          </Link>
          <span className="separator1"> - </span>
          <Link to="/contact" className="link link--helike" onClick={closeMenu}>
            <span>Contact</span>
          </Link>
        </div>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <span className={`bar ${menuOpen ? "open" : ""}`}></span>
        <span className={`bar ${menuOpen ? "open" : ""}`}></span>
        <span className={`bar ${menuOpen ? "open" : ""}`}></span>
      </div>
    </header>
  );
};

export default Header;
