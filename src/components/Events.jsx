import Section from "./Section";
import Heading from "./Heading";
import { events } from "../constants";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { Link } from "react-router-dom";

const Events = () => {
  return (
    <Section id="events">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl text-center"
          title="Upcoming Events"
        />
        <div className="flex gap-10 mb-10 justify-center flex-wrap">
          {events.map((item) => (
            <div
              className="flex flex-wrap relative p-0.5 bg-no-repeat 
                bg-[length:100%_100%] md:max-w-[24rem] justify-center items-center
                "
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div
                className="relative z-2 flex flex-col min-h-[25rem] 
              p-[2.4rem]  justify-center"
              >
                <h5 className="h5 mb-10 font-bold font-sans">{item.title}</h5>
                <p
                  className="body-1 text-[15px] text-n-1/80 font-code 
                font-semibold uppercase mb-6"
                >
                  {item.date}
                </p>
                <p className="body-1 mb-10 text-n-1/70 font-code text-[13px] uppercase">
                  {item.venue}
                </p>
                <div className="flex items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={40}
                    height={40}
                    alt={item.title}
                  />
                  <Link
                    to={`/purchase/${item.id}`}
                    className="cursor-pointer ml-auto font-mono text-[13px] font-bold text-color-1 uppercase items-center justify-center hover:text-color-1/70"
                  >
                    Buy Tickets
                  </Link>
                  <Link
                    to={`/purchase/${item.id}`}
                    className="ml-2 cursor-pointer hover:opacity-70"
                  >
                    <Arrow />
                  </Link>
                </div>
              </div>

              {item.light && <GradientLight />}
              <div
                className="absolute inset-0.5 overflow-hidden"
                style={{ clipPath: "url(#events)" }}
              >
                <div className="absolute inset-0 opacity-[2%] transition-opacity hover:opacity-[10%]">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      width={380}
                      height={362}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Events;
