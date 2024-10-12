import React, { useState, useRef } from "react";

const ZoomImage = ({ src }) => {
  const [scale, setScale] = useState(1); // Initial scale of the image
  const [lastDistance, setLastDistance] = useState(null); // To store the last touch distance
  const imageRef = useRef(null);

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      setLastDistance(distance);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && lastDistance) {
      const newDistance = getDistance(e.touches[0], e.touches[1]);
      const newScale = (newDistance / lastDistance) * scale;
      setScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    setLastDistance(null); // Reset distance when the touch ends
  };

  // Helper function to calculate the distance between two touch points
  const getDistance = (touch1, touch2) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };
  console.log(scale)

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        height: "100%",
        touchAction: "none",
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt="Zoomable"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          width: "100%",
          height: "auto",
          transform: `scale(${scale})`,
          transition: "transform 1s ease-in-out",
        }}
      />
    </div>
  );
};

export default ZoomImage;
