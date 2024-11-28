import React from "react";
import { playlist } from "../constants";
import { FaPlay } from "react-icons/fa";

const PlaylistCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {playlist.map((item) => (
        <div
          key={item.id}
          className=" min-w-[18rem] lg:min-w-[22rem] md:min-w-[20rem] h-full md:max-h-[8rem] lg:max-h-[12rem] max-h-[8rem] bg-n-8 border-[1.5px]
        border-color-7 rounded-[2rem] overflow-clip my-6 relative"
        >
          <a
            href={item.spotifyUrl}
            target="_blank"
            className="transition-all duration-700 ease-in-out hover:cursor-pointer hover:p-2"
          >
            <div className="absolute inset-0 w-full h-full">
              <div
                className="absolute bg-cover bg-center inset-0 rounded-[2rem]"
                style={{ backgroundImage: `url(${item.coverArt})` }}
              ></div>
              <div className="absolute bg-gradient-to-t from-black/10 via-black/60 to-black/100 inset-0 rounded-[2rem] "></div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center justify-between w-full flex-wrap h-full">
              <div className="p-2 lg:p-4 items-baseline text-center justify-end">
                <p className="text-n-1/75 text-sm font-semibold">
                  {item.title}
                </p>
                <p className="text-n-1/50 text-xs">{item.event}</p>
                {/* <p className="text-n-1/50 text-sm">
                  Uploaded on: {item.releaseDate}
                </p> */}
              </div>
              <div className="text-center items-center py-2">
                <FaPlay size={30} className="text-color-4/75" />
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default PlaylistCard;
