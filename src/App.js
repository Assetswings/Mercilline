import React, { useState } from "react";
import "./App.css";
import Header from "./header";
import Home from "./home";
import Contact1 from "./Contact";
import About from "./About";
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Canvas, extend } from "@react-three/fiber";
import Preloader from './preload'
import { OrbitControls, useGLTF, PerspectiveCamera, Environment, Stats, CameraShake } from '@react-three/drei';
import * as THREE from 'three';
import { HelmetProvider } from 'react-helmet-async';
import { Scroll, ScrollControls } from "@react-three/drei";
import AudioWavePlayer from './AudioWavePlayer';



extend(THREE);

function App() {
  // State to track if preloading is complete
  const [isPreloadingComplete, setIsPreloadingComplete] = useState(false);

  // Function to handle preloading completion
  const handlePreloadingComplete = () => {
    setIsPreloadingComplete(true); // Set state to true when preloading is complete
  };

  return (
    // <div style={{ backgroundColor: "black" }}>
    //   {/* Show the Preloader until assets are fully loaded */}
    //   {!isPreloadingComplete ? (
    //     <Preloader onComplete={handlePreloadingComplete} />
    //   ) : (
    //      <Router>
    //       <Header />
    //       <Routes>
    //          <Route path="/" element={<Home />} />
    //         <Route path="/about" element={<About />} />
    //         <Route path="/contact" element={<Contact1 />} />
    //       </Routes>
    //       </Router>
    //     )}  
    // </div>
    <>
      <HelmetProvider>
        <Router>
          {!isPreloadingComplete ? (
            <Preloader onComplete={handlePreloadingComplete} />
          ) : (
            <>
              <div style={{ backgroundColor: "black" }}>

                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact1 />} />
                </Routes>
              
              {/* <AudioWavePlayer /> */}

              </div>
            </>
          )}
        </Router>
      </HelmetProvider>
    </>



    // <div style={{ height: '100vh' }}>
    //   <Canvas id="webgi-canvas" shadows style={{ background: 'black' }} gl={{ antialias: true }} dpr={[1, 1.5]}>
    //   <ScrollControls pages={10}>
    //     <Scroll>
    //       <Bike />
    //     </Scroll>
    //     <Scroll html>
    //       <Home />
    //     </Scroll>
    //   </ScrollControls>
    //   </Canvas>
    // </div>

  );
}

export default App;
