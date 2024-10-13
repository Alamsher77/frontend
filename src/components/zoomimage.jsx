import React, { useState, useRef } from "react";


const ZoomImage = ({ src }) => {

  const [scale, setScale] = useState(1); // Start with no zoom
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Image position
  const containerRef = useRef(null);
  const lastTouchRef = useRef(null); // To store last touches for movement

  const maxScale = 3;
  const minScale = 1;

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      // Pinch zoom
      const distance = getDistance(e.touches);
      const lastDistance = getDistance(lastTouchRef.current);

      const newScale = scale * (distance / lastDistance);
      setScale(Math.min(Math.max(newScale, minScale), maxScale));
      lastTouchRef.current = [...e.touches];
    } else if (e.touches.length === 1) {
      // Pan (move the image)
      const deltaX = e.touches[0].clientX - lastTouchRef.current[0].clientX;
      const deltaY = e.touches[0].clientY - lastTouchRef.current[0].clientY;

      setPosition((prev) => {
        const newX = prev.x + deltaX;
        const newY = prev.y + deltaY;

        // Get container dimensions and limit the movement
        const container = containerRef.current;
        const maxX = (container.offsetWidth * (scale - 1)) / 2;
        const maxY = (container.offsetHeight * (scale - 1)) / 2;

        return {
          x: Math.max(Math.min(newX, maxX), -maxX),
          y: Math.max(Math.min(newY, maxY), -maxY),
        };
      });

      lastTouchRef.current = [...e.touches];
    }
  };

  const handleTouchStart = (e) => {
    lastTouchRef.current = [...e.touches];
  };

  const getDistance = (touches) => {
    const [touch1, touch2] = touches;
    const distanceX = touch2.clientX - touch1.clientX;
    const distanceY = touch2.clientY - touch1.clientY;
    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "400px",
        overflow: "hidden",
        position: "relative",
        touchAction: "none", // To prevent default behavior
      }}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onDoubleClick={()=> scale == 1 ? setScale(3) : setScale(1)}
    >
      <img
        src={src}
        alt="Zoomable"
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: "center center",
          transition: "transform 0.1s ease",
          width: "100%",
          height: "auto",
          position: "absolute",
        }}
      />
    </div>
  );
};

export default ZoomImage;
