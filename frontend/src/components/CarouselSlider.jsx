import React, { useEffect, useRef, useState } from "react";

const CarouselSlider = ({ sliderImages }) => {
  const [currentSlide, setCurrentSlide] = useState(1); 
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null); 
  const delay = 3000; 

  useEffect(() => {
    const startSlider = () => {
      sliderRef.current = requestAnimationFrame(autoSlide);
    };

    const stopSlider = () => {
      if (sliderRef.current) {
        cancelAnimationFrame(sliderRef.current);
      }
    };

    const autoSlide = (time) => {
      nextSlide();
      sliderRef.current = requestAnimationFrame(() => setTimeout(autoSlide, delay));
    };

    startSlider();

    return () => stopSlider();
  }, []);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prevSlide) => prevSlide + 1);
    }
  };

  // Handle transition end event to wrap around slides
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentSlide === sliderImages.length + 1) {
      // When moving to the cloned first slide, reset to the actual first slide
      setCurrentSlide(1);
    } else if (currentSlide === 0) {
      // When moving to the cloned last slide, reset to the actual last slide
      setCurrentSlide(sliderImages.length);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div
        className={`flex ${
          isTransitioning
            ? "transition-transform duration-[2s] ease-in-out"
            : ""
        }`}
        style={{
          transform: `translateX(-${currentSlide * 20}%)`,
          width: `${(sliderImages.length + 2) * 100}%`, // +2 for the cloned slides
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="w-1/5 flex justify-center">
          <img
            src={sliderImages[sliderImages.length - 1]}
            alt={`Slide ${sliderImages.length}`}
            className="w-[50%]"
          />
        </div>
        {sliderImages.map((image) => {
          return (
            <div key={image} className="w-1/5 flex justify-center">
              <img src={image} className="w-[50%]" alt="" />
            </div>
          );
        })}
        <div className="w-1/5 flex justify-center">
          <img src={sliderImages[0]} alt={`Slide 1`} className="w-[50%]" />
        </div>
      </div>
      <div className="transform translate-x-1/2 flex space-x-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-200 ease-out ${
              currentSlide - 2 === index ? "bg-gray-900 w-7" : "bg-gray-500"
            }`}
            onClick={() => setCurrentSlide(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselSlider;
