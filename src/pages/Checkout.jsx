import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { events } from "../constants";
import Header from "../components/Header";
import Button from "../components/Button";
import Section from "../components/Section";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const TicketQRCode = ({ ticket, fileUrl }) => {
  return (
    <div className="mb-8 p-4 border-2 border-color-7 rounded-lg">
      <div className="flex flex-col items-center">
        <QRCodeSVG
          value={JSON.stringify({
            ticketId: ticket.id,
            eventId: ticket.eventId,
            type: ticket.ticketType,
            validUntil: ticket.validUntil,
          })}
          size={200}
          level="H"
          includeMargin={true}
        />
        <div className="mt-4 text-center">
          <p className="text-n-1 text-sm">Ticket ID: {ticket.id.slice(0, 8)}</p>
          <p className="text-n-1/70 text-sm">{ticket.ticketType}</p>
          <p className="text-n-1/70 text-xs">
            Valid until: {new Date(ticket.validUntil).toLocaleDateString()}
          </p>
          {fileUrl && (
            <a
              href={fileUrl}
              download={`ticket_${ticket.id.slice(0, 8)}.png`}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-color-7 text-n-1 rounded-lg hover:bg-color-7/80 transition-colors"
            >
              <Download size={16} />
              Download Ticket
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [ticketFiles, setTicketFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const foundEvent = events.find((e) => e.id.toString() === eventId);
    setEvent(foundEvent);
  }, [eventId]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const ticketId = queryParams.get("ticketId");
    const selectedQuantity = queryParams.get("quantity");
    const phone = queryParams.get("phone");
    const email = queryParams.get("email");

    if (event && ticketId) {
      const ticket = event.tickets.find(
        (ticket) => ticket.id.toString() === ticketId
      );
      if (ticket) {
        setSelectedTicket(ticket);
        setQuantity(parseInt(selectedQuantity) || 1);
      }
    }

    if (phone) setPhoneNumber(phone);
    if (email) setEmail(email);
  }, [location.search, event]);

  const generateTickets = () => {
    const newTickets = [];
    for (let i = 0; i < quantity; i++) {
      const ticketData = {
        id: uuidv4(),
        eventId: event.id,
        ticketType: selectedTicket.type,
        purchaseDate: new Date().toISOString(),
        phoneNumber,
        email: emailAddress,
        isUsed: false,
        validUntil: event.date,
      };
      newTickets.push(ticketData);
    }
    return newTickets;
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate tickets after successful payment
      const generatedTickets = generateTickets();

      // Send tickets to backend for processing
      const response = await fetch("/api/tickets/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailAddress,
          eventDetails: {
            title: event.title,
            venue: event.venue,
            date: event.date,
          },
          tickets: generatedTickets,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process tickets");
      }

      const result = await response.json();

      if (result.success) {
        setTickets(generatedTickets);
        setTicketFiles(result.tickets.map((t) => t.fileUrl));
        setPurchaseComplete(true);
      } else {
        throw new Error(result.message || "Failed to process tickets");
      }
    } catch (error) {
      console.error("Payment/ticket processing failed:", error);
      setError(
        "Failed to process payment and generate tickets. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (!event || !selectedTicket) {
    return (
      <>
        <Header />
        <Section className="flex justify-center items-center">
          <div className="text-center text-n-1">Event or ticket not found</div>
        </Section>
        <Footer />
      </>
    );
  }

  const totalAmount = selectedTicket.price * quantity;

  return (
    <>
      <Header />
      <Section id="terms" className="transition-all duration-700 ease-in-out">
        <Heading
          title={purchaseComplete ? "Your Tickets" : "Checkout"}
          tag={event.title}
          className="text-center"
        />
      </Section>
      <Section className="flex justify-center items-center gap-2 flex-col flex-wrap transition-all duration-700 ease-in-out">
        <div className="min-w-[90vw] max-w-[90vw] lg:min-w-[50vw] lg:max-w-[50vw] md:max-w-[50vw] h-full px-6 bg-n-8 border-2 border-color-7 rounded-[2rem] py-4 overflow-clip transition-all duration-700 ease-in-out">
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
              {error}
            </div>
          )}

          {!purchaseComplete ? (
            <>
              <p className="text-n-1/70 font-code text-[13px] mb-2 text-center">
                📅 Date: {event.date}
              </p>
              <p className="text-n-1/70 font-code text-[13px] mb-4 text-center">
                📍 Venue: {event.venue}
              </p>

              <div className="mb-6 p-4 gap-4 border-2 border-color-7 rounded-lg">
                <p className="text-[13px] text-n-1/70">
                  Selected Ticket:{" "}
                  <span className="text-[0.75rem] sm:text-[1rem] text-n-1">
                    {selectedTicket.type}
                  </span>
                </p>
                <p className="text-[13px] text-n-1/70">
                  Price:{" "}
                  <span className="text-[0.75rem] sm:text-[1rem] text-n-1">
                    Ksh {selectedTicket.price}
                  </span>
                </p>
                <p className="text-n-1/70 text-[13px]">
                  Quantity:{" "}
                  <span className="text-[0.75rem] sm:text-[1rem] text-n-1">
                    {quantity}
                  </span>
                </p>
              </div>

              <div className="mb-6">
                <label className="text-n-1/70 text-[13px]">Phone Number:</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-2 border-2 border-color-7 rounded-lg mt-2 bg-transparent text-[13px]"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="text-n-1/70 text-[13px]">Email:</label>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border-2 border-color-7 rounded-lg mt-2 bg-transparent text-[13px]"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="mb-6">
                <p className="text-lg font-semibold">
                  Total: Ksh {totalAmount}
                </p>
              </div>

              <Button
                onClick={handlePayment}
                className="w-full my-4"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Proceed to Payment"}
              </Button>
            </>
          ) : (
            <div className="space-y-6">
              <p className="text-center text-n-1 mb-6">
                Payment Successful! Your tickets have been sent to your email (
                {emailAddress}).
              </p>
              {tickets.map((ticket, index) => (
                <TicketQRCode
                  key={ticket.id}
                  ticket={ticket}
                  fileUrl={ticketFiles[index]}
                />
              ))}
              <Button onClick={() => navigate("/")} className="w-full mt-4">
                Return to Home
              </Button>
            </div>
          )}
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default Checkout;
