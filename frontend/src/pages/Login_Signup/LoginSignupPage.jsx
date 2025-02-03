import React from "react";
// import corouselBg from "../../assets/corousel-bg.svg";
// import images from "../../constants/sliderImages.js";
// import CarouselSlider from "../../components/carouselSlider.jsx";
// import logo from "../../assets/Chat_Application-logo.png";
import yoga1 from "../../assets/yoga1.png";
import LoginSignupForm from "../components/LoginSignupForm";
import { useLocation } from "react-router-dom";

const LoginSignupPage = () => {
  const location = useLocation();
  const page = location.pathname.split("/").filter(Boolean).pop();

  return (
    <div className="flex items-center justify-center h-full w-full relative">
      <div
        className={`w-full h-full bg-[#e4dfbe] hidden md:block`}
        style={{
          // backgroundImage: `url(${corouselBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        <div className="flex h-full justify-center items-center">
          <img className="w-[85%]" src={yoga1} alt="" />
        </div>
      </div>

      <div className="w-full h-full bg-[#74936c] text-slate-100 flex flex-col items-center justify-center gap-2">
        <div className="w-full flex flex-col justify-start items-center gap-1">
          <div className="w-[40%] md:w-[25%] sm:w-[30%] lg:w-[30%]"></div>
          <div className="w-11/12 max-w-[30rem]">
            <LoginSignupForm page={page} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
