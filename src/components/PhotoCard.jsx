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
      const photoWidth = scrollContainer.current.firstChild.offsetWidth;
      scrollContainer.current.scrollBy({
        left: photoWidth + 8,
        behavior: "smooth",
      });
    }
  };

  const scrollPrevious = () => {
    if (scrollContainer.current) {
      const photoWidth = scrollContainer.current.firstChild.offsetWidth;
      scrollContainer.current.scrollBy({
        left: -(photoWidth + 8),
        behavior: "smooth",
      });
    }
  };

  const styles = {
    scrollContainer: {
      display: "flex",
      overflowX: "auto",
      gap: "0.5rem",
      scrollSnapType: "x mandatory",
      scrollBehavior: "smooth",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
      padding: "0.5rem",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))",
      gap: "0.25rem",
      width: "80%",
      margin: "0 auto",
    },
  };

  return (
    <div className="flex flex-col items-center transition-all duration-700 ease-in-out">
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
            ? "items-center justify-center mx-6"
            : "flex my-2 mx-6 overflow-auto"
        } transition-all duration-700 ease-in-out`}
      >
        {albumPhotos.map((item, index) => (
          <div
            key={item.id}
            className={`snap-center ${
              isGridView
                ? "flex-shrink-0 w-[calc(100%-0.2rem)]"
                : "flex-shrink-0 w-[calc(100%-5rem)] lg:max-w-[20rem] md:max-w-[18rem] max-w-[12rem]"
            } relative group transition-all duration-700 ease-in-out `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img
              src={item.url}
              alt={item.title}
              className={`${
                isGridView ? "rounded-0" : "rounded-[2rem]"
              } w-full h-full object-cover duration-700 ease-in-out hover:cursor-pointer hover:scale-95 transition-all`}
              style={{
                filter: "brightness(0.6) contrast(1)",
                // transition: "filter 0.7s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.filter =
                  "brightness(0.8) contrast(1.2) ")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.filter = "brightness(0.6) contrast(1) ")
              }
            />

            <a
              href={item.url}
              download={item.title}
              className="absolute bottom-4 right-4 bg-color-7/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              title="Download"
              target="_blank"
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
