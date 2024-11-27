import React, { useRef, useState } from "react";
import { albumPhotos } from "../constants";
import {
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaTh,
  FaBars,
} from "react-icons/fa";

const PhotoCard = () => {
  const [isGridView, setIsGridView] = useState(false);
  const scrollContainer = useRef(null);

  const scrollNext = () => {
    if (scrollContainer.current) {
      const photoWidth = scrollContainer.current.firstChild.clientWidth;
      scrollContainer.current.scrollBy({
        left: photoWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollPrevious = () => {
    if (scrollContainer.current) {
      const photoWidth = scrollContainer.current.firstChild.clientWidth;
      scrollContainer.current.scrollBy({
        left: -photoWidth,
        behavior: "smooth",
      });
    }
  };

  const styles = {
    scrollContainer: {
      display: "flex",
      overflowX: isGridView ? "hidden" : "scroll",
      gap: "0.5rem",
      scrollSnapType: "x mandatory",
      scrollBehavior: "smooth",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
      padding: "0 0.5rem",
      transition: "overflow 10s ease-in-out",
    },
    gridContainer: {
      // display: "grid",
      // gridTemplateColumns: "repeat(3, 1fr)",
      gap: "0.5rem",
      padding: "0",
      width: "100%",
    },
  };

  //Responsive styles for grid view
  // const updateGridTemplateColumns = () => {
  //   const width = window.innerWidth;
  //   if (width >= 1024) {
  //     return "repeat(5, 1fr)";
  //   } else if (width >= 768) {
  //     return "repeat(4, 1fr)";
  //   } else if (width >= 640) {
  //     return "repeat(3, 1fr)";
  //   } else {
  //     return "repeat(2, 1fr)";
  //   }
  // };

  return (
    <div className="flex flex-col items-center gap-2 ">
      {/* Toggle Button */}
      <div className="mb-4 items-center justify-center">
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="bg-color-7/50 hover:bg-color-7/70 p-4 text-white rounded-[2rem] flex items-center transition-all ease-in-out duration-300"
        >
          {isGridView ? <FaBars size={24} /> : <FaTh size={24} />}
        </button>
      </div>

      {/* Scroll/Grid Container */}
      <div
        ref={scrollContainer}
        style={isGridView ? styles.gridContainer : styles.scrollContainer}
        className={`w-full max-w-[80%] mx-auto${
          isGridView
            ? " grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 w-full max-w-[20rem]"
            : "flex"
        } `}
      >
        {albumPhotos.map((item) => (
          <div
            key={item.id}
            className={`snap-center ${
              isGridView
                ? "w-full rounded-0 px-0  grid grid-cols-2  lg:grid-cols-4 md:grid-cols-3"
                : "w-[80%] px-[2] "
            } sm:w-1/2 lg:w-1/3 lg:max-w-[40rem] max-w-[20rem] lg:h-full h-[80%]  flex-shrink-0 relative group`}
          >
            <img
              src={item.url}
              alt={item.title}
              className={`${
                isGridView ? "rounded-0" : "rounded-[2rem]"
              } w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:filter-none hover:cursor-pointer hover:p-2`}
              style={{ filter: "brightness(0.8)" }}
            />

            <a
              href={item.url}
              download
              className="absolute bottom-4 right-4 bg-color-7/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              title="Download"
            >
              <FaDownload size={20} />
            </a>
          </div>
        ))}
      </div>

      {/* Navigation Buttons for Scroll View */}
      {!isGridView && (
        <>
          <div className="absolute inset-y-0 left-4 flex items-center">
            <button
              onClick={scrollPrevious}
              className="bg-color-7/50 hover:bg-color-7/70 text-white rounded-full p-2 transition-all ease-in-out duration-500"
            >
              <FaChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute inset-y-0 right-4 flex items-center">
            <button
              onClick={scrollNext}
              className="bg-color-7/50 hover:bg-color-7/70 text-white rounded-full p-2 transition-all ease-in-out duration-500"
            >
              <FaChevronRight size={24} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PhotoCard;