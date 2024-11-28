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
  const [isGridView, setIsGridView] = useState(false); // State to toggle between grid and scroll view
  const scrollContainer = useRef(null); // Ref for the scrollable container

  // Scroll to the next photo in non-grid view
  const scrollNext = () => {
    if (scrollContainer.current) {
      const photoWidth = scrollContainer.current.firstChild.offsetWidth;
      scrollContainer.current.scrollBy({
        left: photoWidth + 8,
        behavior: "smooth",
      });
    }
  };

  // Scroll to the previous photo in non-grid view
  const scrollPrevious = () => {
    if (scrollContainer.current) {
      const photoWidth = scrollContainer.current.firstChild.offsetWidth;
      scrollContainer.current.scrollBy({
        left: -(photoWidth + 8),
        behavior: "smooth",
      });
    }
  };

  // Styles for the scroll and grid containers
  const styles = {
    scrollContainer: {
      display: "flex",
      overflowX: "auto", // Changed from "scroll" to "auto" for consistency
      gap: "0.5rem",
      scrollSnapType: "x mandatory",
      scrollBehavior: "smooth",
      msOverflowStyle: "none", // Hide scrollbar for IE
      scrollbarWidth: "none", // Hide scrollbar for Firefox
      padding: "0.5rem", // Added padding to prevent cropping of the first image
    },
    gridContainer: {
      // Center the grid and ensure proper alignment
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))", // Dynamically adjust columns
      gap: "0.25rem",
      width: "80%", // Set container width to ensure centering
      margin: "0 auto", // Center the grid container
    },
  };

  return (
    <div className="flex flex-col items-center">
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
        className={`${
          isGridView
            ? "items-center justify-center" // Added classes to center the grid
            : "flex my-2 overflow-auto" // Adjusted to ensure smooth scrolling
        }`}
      >
        {albumPhotos.map((item) => (
          <div
            key={item.id}
            className={`snap-center ${
              isGridView
                ? "flex-shrink-0 w-[calc(100%-0.2rem)]" // Ensured consistent width for grid view
                : "flex-shrink-0 w-[calc(100%-5rem)]" // Adjusted width for non-grid view
            } relative group`}
          >
            <img
              src={item.url}
              alt={item.title}
              className={`${
                isGridView ? "rounded-0" : "rounded-[2rem]"
              } w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:filter-none hover:cursor-pointer hover:p-2`}
              style={{ filter: "brightness(0.8)" }} // Uniform brightness filter
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
