import React from "react";
import { playlist } from "../constants";

const PlaylistCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {playlist.map((item) => (
        <div
          key={item.id}
          className=" min-w-[18rem] lg:min-w-[22rem] md:min-w-[20rem] h-full bg-n-8 border-[1.5px]
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

            <div className="relative z-10 lg:flex sm:flex-col mb-6 items-end text-center justify-end w-full flex-wrap h-full">
              <div className="p-8 md:p-12 lg:p-16 items-baseline text-center justify-end">
                <p className="text-n-1/75 text-sm font-semibold">
                  {item.title}
                </p>
                <p className="text-n-1/50 text-xs">{item.event}</p>
                {/* <p className="text-n-1/50 text-sm">
                  Uploaded on: {item.releaseDate}
                </p> */}
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default PlaylistCard;
