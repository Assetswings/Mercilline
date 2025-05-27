import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";
import { easeCubicInOut } from "d3-ease";
import "./home.css";
import * as THREE from "three";
import mobileBatteryImage from './assets/battery.jpg'; // Import your mobile image here

// The Model component handles the 3D model and its animation
const Model = () => {
  const [isVisible, setIsVisible] = useState(0);
  const ref = useRef();
  const obsref = useRef();
  const { nodes, materials } = useGLTF("/BatteryOriginal.glb");
  const [position, setPosition] = useState([1, 1.5, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (obsref.current) {
      observer.observe(obsref.current);
    }
    return () => {
      if (obsref.current) {
        observer.unobserve(obsref.current);
      }
    };
  }, []);

  const [containerHeight, setContainerHeight] = useState(0);
  const [speedFactor, setSpeedFactor] = useState(3);
  const [maxScrollProgress, setMaxScrollProgress] = useState(0.3);
  const [newXFactor, setNewXFactor] = useState(-1.5);
  const [newYFactor, setNewYFactor] = useState(-2);
  const [newZFactor, setNewZFactor] = useState(0.5);
  const [rotationYFactor, setRotationYFactor] = useState((Math.PI / 2) * 0.7);
  const [rotationXFactor, setRotationXFactor] = useState(-0.1);
  const [rotationZFactor, setRotationZFactor] = useState(0.1);
  const [targetRotation, setTargetRotation] = useState(new THREE.Euler(0, 0, 0));
  const [currentRotation, setCurrentRotation] = useState(new THREE.Euler(0, 0, 0));

  const updateDeviceSettings = () => {
    const width = window.innerWidth;
    if (width <= 600) {
      setSpeedFactor(0);
      setMaxScrollProgress(0);
      setNewXFactor(0);
      setNewYFactor(0);
      setNewZFactor(0);
      setRotationYFactor(0);
      setRotationXFactor(0);
      setRotationZFactor(0);
    } else if (width <= 1024) {
      setSpeedFactor(3);
      setMaxScrollProgress(0.20);
      setNewXFactor(-1);
      setNewYFactor(-2.1);
      setNewZFactor(0.55);
      setRotationYFactor((Math.PI / 2) * 3.5);
      setRotationXFactor(-0.11);
      setRotationZFactor(0.11);
    } else if (width <= 1300) {
      setSpeedFactor(2.5);
      setMaxScrollProgress(0.20);
      setNewXFactor(-1.2);
      setNewYFactor(-2.2);
      setNewZFactor(0.6);
      setRotationYFactor((Math.PI / 2) * 4);
      setRotationXFactor(-0.12);
      setRotationZFactor(0.12);
    } else if (width <= 1440) {
      setSpeedFactor(2.5);
      setMaxScrollProgress(0.21);
      setNewXFactor(-1.2);
      setNewYFactor(-2.2);
      setNewZFactor(0.6);
      setRotationYFactor((Math.PI / 2) * 3.7);
      setRotationXFactor(-0.12);
      setRotationZFactor(0.12);
    } else if (width <= 1920) {
      setSpeedFactor(2.5);
      setMaxScrollProgress(0.21);
      setNewXFactor(-1.2);
      setNewYFactor(-2.3);
      setNewZFactor(0.65);
      setRotationYFactor((Math.PI / 2) * 3.7);
      setRotationXFactor(-0.13);
      setRotationZFactor(0.13);
    } else if (width <= 2560) {
      setSpeedFactor(2.5);
      setMaxScrollProgress(0.26);
      setNewXFactor(-1.5);
      setNewYFactor(-2.5);
      setNewZFactor(0.5);
      setRotationYFactor((Math.PI / 2) * 3.1);
      setRotationXFactor(-0.2);
      setRotationZFactor(0.1);
    } else {
      setSpeedFactor(2.5);
      setMaxScrollProgress(0.26);
      setNewXFactor(-1.2);
      setNewYFactor(-2.5);
      setNewZFactor(0.75);
      setRotationYFactor((Math.PI / 2) * 3.2);
      setRotationXFactor(-0.2);
      setRotationZFactor(0.1);
    }
  };

  useLayoutEffect(() => {
    const container = document.getElementById("battery-container");
    setContainerHeight(container.offsetHeight);
    updateDeviceSettings();
    window.addEventListener("resize", updateDeviceSettings);
    return () => {
      window.removeEventListener("resize", updateDeviceSettings);
    };
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      const width = window.innerWidth;
      if (width <= 450) {
        setPosition([0.7, 1, 0]);
      } else {
        setPosition([1, 1.5, 0]);
      }
    };

    updatePosition(); // Set position on initial load
    window.addEventListener("resize", updatePosition); // Update on resize

    return () => {
      window.removeEventListener("resize", updatePosition); // Cleanup listener
    };
  }, []);

  useFrame(() => {
    const scrollY = window.scrollY || window.pageYOffset;
    const container = document.getElementById("battery-container");
    const containerTop = container.offsetTop;
    const width = window.innerWidth;
    if (width > 800) {
      const scrollProgress = Math.min(
        Math.max((scrollY - containerTop) / containerHeight, 0),
        1
      );
      const limitedScrollProgress = Math.min(scrollProgress, maxScrollProgress);
      // Calculate new positions
      const newX = newXFactor * limitedScrollProgress * speedFactor;
      const newY = newYFactor * limitedScrollProgress * speedFactor;
      const newZ = newZFactor * limitedScrollProgress * speedFactor;
      // Calculate the target rotation
      const newYRotation =
        rotationYFactor * limitedScrollProgress * speedFactor;
      const newXRotation =
        rotationXFactor * limitedScrollProgress * speedFactor;
      const newZRotation =
        rotationZFactor * limitedScrollProgress * speedFactor;
      // Set target rotation
      setTargetRotation(
        new THREE.Euler(newXRotation, newYRotation, newZRotation)
      );
      // Easing effect for rotation
      const easeFactor = 5; // Adjust for speed of easing
      const lerpFactor = 0.1; // Adjust this for speed of rotation easing
      // Interpolate rotation
      currentRotation.x += (targetRotation.x - currentRotation.x) * lerpFactor;
      currentRotation.y += (targetRotation.y - currentRotation.y) * lerpFactor;
      currentRotation.z += (targetRotation.z - currentRotation.z) * lerpFactor;
      // Update position and rotation
      ref.current.position.set(newX, newY, newZ);
      ref.current.rotation.set(
        currentRotation.x,
        currentRotation.y,
        currentRotation.z
      );
    } else {
      ref.current.position.set(0, 0, 0);
      ref.current.rotation.set(0, 0, 0);
    }
  });
  
  return (
    <group ref={ref} dispose={null}>
      <group
        position={position}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={1.5}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_1_198008.geometry}
          material={materials["Mtl105.008"]}
          position={[-0.188, 0.66, 0.2]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_1_197008.geometry}
          material={materials["Mtl105.008"]}
          position={[-0.035, 0.62, 0.18]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_1_196008.geometry}
          material={materials["Mtl105.008"]}
          position={[0.1, 0.662, 0.204]}
        />
      </group>
    </group>
  );
};

// Preload the new GLTF model
useGLTF.preload("/BatteryOriginal.glb");

const Battery = () => {
  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => {
    const scrollPosition = window.scrollY || window.pageYOffset;
    setScrollY(scrollPosition);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getParallaxStyle = () => {
    const translateY = scrollY * 0.01;
    return {
      transform: `translateY(${translateY}px)`,
      transition: "transform 0.2s ease-out",
    };
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="battery-container" className="battery-container" style={{}}>
      {isMobile ? (
        <img
          src={mobileBatteryImage}
          alt="Mobile Battery"
          style={{
            width: "100%",
            height: "auto",
            position: "absolute",
            left: 0,
          }}
        />
      ) : (
        <Canvas
          camera={{ position: [0, 1, 4], fov: 50 }}
          shadows
          className="battery-modal"
          style={{ position: "absolute" }}
        >
          <ambientLight intensity={0.1} />
          <directionalLight
            position={[0.5, 1, 7]}
            intensity={0.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <Environment preset="city" blur={1} />
          <Model />
        </Canvas>
      )}
      <div className="content1" style={{ position: "relative", zIndex: 1 }}>
        <p
          className="content__title battery-tech"
          {...(!isMobile ? { "data-splitting": true, "data-effect8": true } : {})}
        >
          <span className="font-8 battery-num">/03 BATTERY</span>
        </p>
      </div>
      <div className="battery-flex" style={{ position: "relative", zIndex: 1 }}>
        <div className="battery-heading">
          <p className="battery-para">
            ADVANCED <br />
            BATTERY <br />
            TECHNOLOGY
          </p>
        </div>
        <div className="battery-heading1">
          <div className="flex-battery">
            <div className="moving-battery">
              <p className="battery-para1">
                Enjoy the ultimate ride with our electric <br /> bikes. With an
                extensive range and rapid <br /> charging, you can hit the road
                with <br />
                confidence. Choose Mercellenie's eco- <br />
                friendly bikes for an exciting and <br />
                sustainable journey.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="extensive-battery"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="battery-rotation"></div>
        <div className="battery-para2">
          <p className="batteryrot-heading">
            EXTENSIVE <br /> RANGE AND FAST <br /> CHARGING.
          </p>
          <div className="batteryrot-flex">
            <p className="batteryrot-para">
              Mercellenie’s battery pack <br /> delivers
              <span style={{ color: "yellow" }}> 2x the power of top</span>{" "}
              <br /> EV batteries for longer rides <br />
              and faster speeds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Battery;
