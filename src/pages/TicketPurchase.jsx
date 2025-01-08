import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Section from "../components/Section";
import Heading from "../components/Heading";
import { events } from "../constants";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "../components/design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import Header from "../components/Header";

const TicketPurchase = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = events.find((event) => event.id.toString() === eventId);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("+254");
  const [email, setEmail] = useState("");

  if (!event) {
    return <div>Event not found</div>;
  }

  const maxTickets = 3; // Maximum allowed tickets
  const minTickets = 1; // Minimum allowed tickets
  const [errorMessage, setErrorMessage] = useState("");

  const handleQuantityChange = (e) => {
    const value = e.target.value.trim(); // Get raw input value

    if (value === "") {
      setQuantity(""); // Allow clearing input temporarily
      setErrorMessage("");
      return;
    }

    const numValue = parseInt(value, 10); // Convert to number

    if (isNaN(numValue) || numValue < minTickets) {
      setErrorMessage(`You must select at least ${minTickets} ticket.`);
    } else if (numValue > maxTickets) {
      setErrorMessage(`You can only purchase up to ${maxTickets} tickets.`);
    } else {
      setErrorMessage(""); // Clear error if within range
    }

    setQuantity(isNaN(numValue) ? "" : numValue); // Allow input changes
  };

  const handleProceedToCheckout = () => {
    if (!selectedTicket) {
      alert("Please select a ticket type.");
      return;
    }

    // Ensure quantity does not exceed 3
    if (quantity > 3) {
      alert("You can only purchase a maximum of 3 tickets per transaction.");
      return;
    }

    if (!phoneNumber.match(/^\+2547\d{8}$/)) {
      alert("Enter a valid Kenyan phone number (e.g., +254712345678).");
      return;
    }

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      alert("Enter a valid email address.");
      return;
    }

    navigate(
      `/checkout/${eventId}?ticketId=${selectedTicket.id}&quantity=${quantity}&phone=${phoneNumber}&email=${email}`
    );
  };

  return (
    <>
      <Header />
      <Section id="ticket-purchase">
        <div className="container relative z-2 mt-12">
          <Heading
            className="md:max-w-md lg:max-w-2xl h1"
            title={`Purchase Tickets for ${event.title}`}
            tag="Tickets"
          />

          <div className="flex flex-wrap gap-10 mb-10 justify-center">
            <div
              className="flex relative p-0.5 bg-no-repeat border-2 border-color-7 rounded-[2rem]
              bg-[length:100%_100%] md:max-w-[44rem] justify-center items-center"
            >
              <div className="relative z-2 flex flex-col min-h-[25rem] p-[2.4rem] justify-start">
                <h5 className="h3 mb-10 font-bold font-sans">{event.title}</h5>
                <p className="body-1 text-[15px] text-n-1/80 font-code font-semibold uppercase mb-2">
                  {event.date}
                </p>
                <p className="body-1 mb-2 text-n-1/70 font-code text-[13px] uppercase">
                  {event.venue}
                </p>
                <p className="body-1 mb-10 text-n-1/70 font-code text-[13px] uppercase">
                  Dress Code: {event.dressCode}
                </p>

                {/* Display available tickets */}
                {event.tickets.map((ticket) => (
                  <div key={ticket.id} className="mb-6">
                    <div
                      className={`cursor-pointer p-4 rounded-[0.5rem] border-2 border-color-7 ${
                        selectedTicket?.id === ticket.id
                          ? "bg-opacity-20 border-color-4 bg-color-4"
                          : ""
                      }`}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <h4 className="text-[1rem] sm:text-[1.25rem]">
                        {ticket.type}
                        <h3 className="text-[0.75rem] sm:text-[1rem] my-2">
                          <span className="text-[0.75rem] sm:text-[1rem] text-n-1/80">
                            Ksh
                          </span>{" "}
                          {ticket.price}
                        </h3>
                      </h4>
                    </div>
                  </div>
                ))}

                {/* Quantity Selection */}

                {selectedTicket && (
                  <div className="mt-4 flex flex-col gap-2">
                    <label>Number of Tickets:</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="border-2 w-full border-color-7 p-4 min-w-[5rem] text-n-1/80 bg-transparent rounded-[0.5rem] transition-transform outline-none"
                    />

                    {errorMessage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                )}

                {/* Phone Number Input */}
                <div className="mt-4 flex flex-col gap-2">
                  <label>Phone Number: </label>
                  <input
                    type="tel"
                    placeholder="Format: +254712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border-2 w-full border-color-7 p-4 text-n-1/80 bg-transparent rounded-[0.5rem] outline-none"
                  />
                </div>

                {/* Email Input */}
                <div className="mt-4 flex flex-col gap-2">
                  <label>Email: </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-color-7 p-4 text-n-1/80 bg-transparent rounded-[0.5rem] outline-none"
                  />
                </div>

                {/* Proceed to Checkout Button */}
                <button
                  onClick={handleProceedToCheckout}
                  className="mt-6 ml-auto font-mono text-[13px] font-bold text-color-1 uppercase tracking-wider cursor-pointer flex"
                >
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
    </>
  );
};

export default TicketPurchase;
