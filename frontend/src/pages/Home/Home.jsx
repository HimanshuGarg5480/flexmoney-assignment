import React from "react";
import CarouselSlider from "../../components/CarouselSlider";
import yoga1 from "../../assets/yoga1.png";
import yoga2 from "../../assets/yoga2.png";

const Home = () => {
  const images = [yoga1, yoga2];

  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-16 space-y-10 md:space-y-0">
        {/* Left - Carousel */}
        <div className="md:w-1/2">
          <CarouselSlider sliderImages={images} />
        </div>

        {/* Right - Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Elevate Your <span className="text-yellow-500">Mind & Body</span> with Yoga
          </h1>
          <p className="text-lg text-gray-700">
            Join our professional yoga classes to improve flexibility, reduce stress, and enhance well-being.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white px-6 py-3 rounded-lg text-lg shadow-md transition-all duration-300 transform hover:scale-105">
            Enroll Now
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="w-full text-center mt-12 px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Why Choose Our Yoga Classes?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white shadow-lg p-8 rounded-xl transform transition duration-300 hover:scale-105">
            <h3 className="text-2xl font-semibold text-yellow-500">🌿 Expert Trainers</h3>
            <p className="text-gray-700 mt-2">Learn from certified yoga instructors with years of experience.</p>
          </div>
          <div className="bg-white shadow-lg p-8 rounded-xl transform transition duration-300 hover:scale-105">
            <h3 className="text-2xl font-semibold text-yellow-500">⏳ Flexible Schedule</h3>
            <p className="text-gray-700 mt-2">Choose from morning, afternoon, or evening sessions.</p>
          </div>
          <div className="bg-white shadow-lg p-8 rounded-xl transform transition duration-300 hover:scale-105">
            <h3 className="text-2xl font-semibold text-yellow-500">🧘‍♂️ Relaxing Environment</h3>
            <p className="text-gray-700 mt-2">Practice yoga in a calm and peaceful setting.</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="text-center text-xs text-gray-700 mt-16 py-6 bg-yellow-100">
        github repository - https://github.com/HimanshuGarg5480/flexmoney-assignment
      </footer>
    </div>
  );
};

export default Home;
