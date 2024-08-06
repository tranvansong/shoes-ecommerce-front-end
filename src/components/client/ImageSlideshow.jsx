import React, { useState, useEffect, useRef } from "react";

function ImageSlideshow({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailsRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbnailWidth = thumbnailsRef.current.children[0].clientWidth;
      const thumbnailOffset = currentIndex - 1;
      thumbnailsRef.current.scrollTo({
        left: thumbnailOffset * thumbnailWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className="relative">
      {/* Current Image */}
      {images.length > 0 && (
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-auto object-cover border-2 rounded-lg"
        />
      )}

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white text-2xl px-4 cursor-pointer">
        <button
          onClick={() =>
            setCurrentIndex(
              currentIndex === 0 ? images.length - 1 : currentIndex - 1
            )
          }
          className="bg-black bg-opacity-50 p-2 rounded-full"
        >
          &#10094;
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white text-2xl px-4 cursor-pointer">
        <button
          onClick={() =>
            setCurrentIndex(
              currentIndex === images.length - 1 ? 0 : currentIndex + 1
            )
          }
          className="bg-black bg-opacity-50 p-2 rounded-full"
        >
          &#10095;
        </button>
      </div>

      {/* Thumbnails */}
      <div className="mt-2 overflow-x-auto whitespace-nowrap thin-scrollbar" ref={thumbnailsRef}>
        <div className="inline-flex gap-x-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              className={`w-28 h-28 object-cover cursor-pointer border-2 rounded-lg ${currentIndex === index ? 'border-blue-500' : 'border-transparent'}`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageSlideshow;
