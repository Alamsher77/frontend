import React, { useState, useRef } from "react";

const ZoomImage = ({ src }) => {
 const [scale, setScale] = useState(1);  // To track the zoom scale
  const [position, setPosition] = useState({ x: 0, y: 0 });  // To track image position
  const [lastPosition, setLastPosition] = useState({ x:0, y: 0 });
  const [startDistance, setStartDistance] = useState(0);  // Track distance for pinch-zoom
  const imageRef = useRef(null);

  const MIN_SCALE = 1;
  const MAX_SCALE = 6;

  // Helper function to get distance between two touches
  const getDistance = (touch1, touch2) => {
    const dx = touch2.pageX - touch1.pageX;
    const dy = touch2.pageY - touch1.pageY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setLastPosition({ x: e.touches[0].pageX, y: e.touches[0].pageY });
    } else if (e.touches.length === 2) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      setStartDistance(distance);
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      // Pan image with one finger
      const deltaX = e.touches[0].pageX - lastPosition.x;
      const deltaY = e.touches[0].pageY - lastPosition.y;
      setPosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      setLastPosition({ x: e.touches[0].pageX, y: e.touches[0].pageY });
    } else if (e.touches.length === 2) {
      // Zoom with two fingers
      const newDistance = getDistance(e.touches[0], e.touches[1]);
      const zoomScale = newDistance / startDistance;
      let newScale = scale * zoomScale;

      if (newScale < MIN_SCALE) newScale = MIN_SCALE;
      if (newScale > MAX_SCALE) newScale = MAX_SCALE;

      setScale(newScale);
      setStartDistance(newDistance);
    }
  };

  const handleTouchEnd = () => {
    setLastPosition({ x: 0, y: 0 });
  };

  return (
      <img
        ref={imageRef}
        src={src}
        alt="Zoomable"
        style={{
          touchAction: 'none',
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0s',  // Smooth movement and zooming
          userSelect: 'none',
          width: '100%',  // Full width image
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={()=> scale == 1 ? setScale(3): setScale(1)}
      />
  );
};

export default ZoomImage;
