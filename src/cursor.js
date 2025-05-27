// Cursor.js
import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import gsap from 'gsap';
import './cursor.css'; // Import the CSS file

const Cursor = () => {
  const cursor = useRef();
  const [isGrab, setIsGrab] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  const onMouseMove = useCallback(({ clientX, clientY }) => {
    gsap.to(cursor.current, {
      x: clientX,
      y: clientY,
      duration: hasMoved ? 0.6 : 0,
      ease: 'expo.out',
    });
    setHasMoved(true);
  }, [hasMoved]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, false);

    return () => {
      window.removeEventListener('mousemove', onMouseMove, false);
    };
  }, [onMouseMove]);

  useEffect(() => {
    document.documentElement.classList.add('has-custom-cursor');

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  useEffect(() => {
    const elements = [
      ...document.querySelectorAll("button,a,input,label,[data-cursor='pointer']")
    ];

    elements.forEach((element) => {
      element.addEventListener('mouseenter', () => setIsPointer(true), false);
      element.addEventListener('mouseleave', () => setIsPointer(false), false);
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener('mouseenter', () => setIsPointer(true), false);
        element.removeEventListener('mouseleave', () => setIsPointer(false), false);
      });
    };
  }, []);

  return (
    <div style={{ opacity: hasMoved ? 1 : 0 }} className="container">
      <div ref={cursor}>
        <div className={cn('cursor', isGrab && 'grab', isPointer && 'pointer')} />
      </div>
    </div>
  );
};

export default Cursor;
