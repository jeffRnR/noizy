import { useParams } from "react-router-dom";
import Section from "./Section";
import Heading from "./Heading";
import { events } from "../constants";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";

const TicketPurchase = () => {
  const { eventId } = useParams();
  const event = events.find((event) => event.id === parseInt(eventId));

  return (
    <Section id="ticket-purchase">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl text-center"
          title={`Purchase Tickets for ${event.title}`}
        />
        <div className="flex flex-wrap gap-10 mb-10">
          <div
            className="flex relative p-0.5 bg-no-repeat 
              bg-[length:100%_100%] md:max-w-[24rem] justify-center items-center
              "
            style={{
              backgroundImage: `url(${event.backgroundUrl})`,
            }}
          >
            <div
              className="relative z-2 flex flex-col min-h-[25rem] 
            p-[2.4rem] pointer-events-none justify-center"
            >
              <h5 className="h3 mb-10 font-bold font-sans">{event.title}</h5>
              <p
                className="body-1 text-[15px] text-n-1/80 font-code 
              font-semibold uppercase mb-6"
              >
                {event.date}
              </p>
              <p className="body-1 mb-10 text-n-1/70 font-code text-[13px] uppercase">
                {event.venue}
              </p>
              <form className="flex flex-col gap-6 mt-auto">
                <label className="body-1 text-n-1/70">
                  Number of Tickets:
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="ml-2 border p-1 text-n-1/80"
                  />
                </label>
                <button className="ml-auto font-mono text-[13px] font-bold text-color-1 uppercase tracking-wider cursor-pointer">
                  Proceed to Payment
                  <span className="ml-2 cursor-pointer">
                    <Arrow />
                  </span>
                </button>
              </form>
            </div>

            {event.light && <GradientLight />}
            <div
              className="absolute inset-0.5 overflow-hidden"
              style={{ clipPath: "url(#ticket-purchase)" }}
            >
              <div className="absolute inset-0 opacity-[2%] transition-opacity hover:opacity-[10%]">
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    width={380}
                    height={362}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            <ClipPath />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TicketPurchase;
