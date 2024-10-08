import { useParams } from "react-router-dom";
import Section from "../components/Section";
import Heading from "../components//Heading";
import { events } from "../constants";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "../components/design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { processPayment, updateTicketCount } from "../backend/PaymentServices";
import { benefitCard3 } from "../assets";

// Simulated purchased tickets (for example purposes)
const purchasedTickets = {
  0: { 0: 22, 1: 120, 2: 20 }, // eventId 0, ticket types have purchased numbers
  1: { 0: 5, 1: 100, 2: 15 }, // eventId 1, ticket types have purchased numbers
};

const TicketPurchase = () => {
  const { eventId } = useParams();
  console.log("Event ID: ", eventId); // Debugging line
  const event = events.find((event) => event.id.toString() === eventId);

  // const [phoneNumber, setPhoneNumber] = useState(""); // Track user's phone number

  // const handlePayment = async (ticket, quantity) => {
  //   try {
  //     const amount = ticket.price * quantity; // Calculate the total amount
  //     const response = await processPayment(amount, phoneNumber);

  //     console.log("Payment response: ", response);
  //     if (response) {
  //       // Update the ticket count after successful payment
  //       updateTicketCount(eventId, ticket.id, quantity);
  //       alert("Payment Successful! Tickets purchased.");
  //     }
  //   } catch (error) {
  //     console.error("Payment error: ", error);
  //     alert("Payment failed. Please try again.");
  //   }
  // };
  if (!event) {
    return <div>Event not found</div>;
  } else {
    return (
      <Section id="ticket-purchase">
        <div className="container relative z-2 ">
          <Heading
            className="md:max-w-md lg:max-w-2xl text-start sm:text-center"
            title={`Purchase Tickets for ${event.title}`}
            tag="Tickets"
          />

          <div className="flex flex-wrap gap-10 mb-10 justify-center">
            <div
              className="flex relative p-0.5 bg-no-repeat 
              bg-[length:100%_100%] md:max-w-[44rem] justify-center items-center"
              style={{
                backgroundImage: `url(${benefitCard3})`,
              }}
            >
              <div
                className="relative z-2 flex flex-col min-h-[25rem] 
                p-[2.4rem] pointer-events-none justify-start "
              >
                <h5 className="h3 mb-10 font-bold font-sans">{event.title}</h5>
                <p
                  className="body-1 text-[15px] text-n-1/80 font-code 
                  font-semibold uppercase mb-2"
                >
                  {event.date}
                </p>
                <p className="body-1 mb-2 text-n-1/70 font-code text-[13px] uppercase">
                  {event.venue}
                </p>
                <p className="body-1 mb-10 text-n-1/70 font-code text-[13px] uppercase">
                  Dress Code: {event.dressCode}
                </p>

                {/* Map through the tickets and render each one */}
                {event.tickets &&
                  event.tickets.map((ticket) => {
                    const purchased =
                      purchasedTickets[eventId]?.[ticket.id] || 0;
                    const ticketsLeft = ticket.max - purchased;

                    return (
                      <div key={ticket.id} className="mb-6">
                        <div className="text-[1.25rem] sm:text-[2rem] mb-2 font-bold">
                          <h4 className="text-[1.25rem] sm:text-[2rem]">
                            {ticket.type}
                            <h3 className="text-[1.25] sm:text-[2rem] mt-2 sm:mt-6 mb-4 sm:mb-10">
                              <span className="text-[0.7rem] sm:text-[1rem] text-n-1/80">
                                Ksh
                              </span>{" "}
                              {ticket.price}
                            </h3>
                          </h4>
                        </div>
                        {/* <p>Max Tickets: {ticket.max}</p> */}
                        {ticketsLeft > 0 ? (
                          <div>
                            {/* <p>Tickets Left: {ticketsLeft}</p> */}
                            <label className="body-1 text-n-1/70">
                              Number of Tickets:
                              <input
                                type="number"
                                min="1"
                                max={ticket.max}
                                defaultValue="1"
                                className="ml-2 border p-1 text-n-1/80"
                              />
                            </label>
                          </div>
                        ) : (
                          <p className="text-red-500 font-bold">Sold Out</p>
                        )}
                      </div>
                    );
                  })}
                {/* <label className="body-1 text-n-1/70">
                  Phone Number:
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="ml-2 border p-1 text-n-1/80"
                  />
                </label> */}

                <button className="ml-auto font-mono text-[13px] font-bold text-color-1 uppercase tracking-wider cursor-pointer flex">
                  Proceed to Payment
                  <span className="ml-2 cursor-pointer">
                    <Arrow />
                  </span>
                </button>
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
  }
};

export default TicketPurchase;
