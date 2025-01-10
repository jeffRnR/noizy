import React from "react";
import { useNavigate } from "react-router-dom";
import { noizy_logo } from "../../assets";

const TitleBar = () => {
  const navigate = useNavigate();

  // Function to navigate back to the previous page
  const handleBackClick = () => {
    navigate(-1); // -1 moves back in history by one page
  };

  return (
    <div className="fixed left-0 top-0 w-full z-50 border-b border-n-6 bg-n-8/90 lg:backdrop-blur-sm transition-all duration-700 ease-in-out">
      <div className="flex flex-row justify-between mx-6 my-2 px-0 lg:px-7.5 xl:px-10 max-lg:py-4">
        <div>
          <a href="/">
            <img
              src={noizy_logo}
              alt="Noizy Logo"
              className="mr-4 rounded-full"
              width={40}
              height={40}
            />
          </a>
        </div>
        <div>
          <button onClick={handleBackClick} className="text-sm text-n-1">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
