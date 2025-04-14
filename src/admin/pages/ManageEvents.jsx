import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  account,
  databases,
  DATABASE_ID,
  EVENTS_COLLECTION_ID,
  ID,
  Query,
} from "../../../lib/appwrite.config";
import Section from "../../components/Section";
import TitleBar from "../components/TitleBar";
import AdminCard from "../components/AdminCards";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import { loading as loadingAnimation } from "../../assets";
import Footer from "../../components/Footer";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newEvent, setNewEvent] = useState({
    name: "",
    venue: "",
    description: "",
    eventDate: "",
    dressCode: "",
    status: "upcoming",
  });

  const location = useLocation();
  const { userId, eventId } = useParams();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const getEventStatus = (date) => {
    const currentDate = new Date();
    const eventDateObj = new Date(date);
    currentDate.setHours(0, 0, 0, 0);
    eventDateObj.setHours(0, 0, 0, 0);
    if (eventDateObj > currentDate) return "upcoming";
    if (eventDateObj.getTime() === currentDate.getTime()) return "ongoing";
    return "expired";
  };

  // Handle card clicks with session validation
  const handleCardClick = async (event, link) => {
    event.preventDefault(); // Prevent default behavior
    try {
      // Verify session before navigation
      const session = await account.getSession("current");
      if (!session) {
        throw new Error("Session expired");
      }

      // Navigate only if session is valid
      navigate(link);
    } catch (error) {
      console.error("Session verification failed:", error);
      // Redirect to login with return URL
      navigate("/login", {
        state: {
          from: location.pathname,
        },
      });
    }
  };

  const checkAndSetUser = async () => {
    try {
      const session = await account.getSession("current");
      const user = await account.get();
      setCurrentUser(user);

      if (userId && user.$id !== userId) {
        const correctRoute = isAdminRoute
          ? `/admin/all-events`
          : `/guest/${user.$id}/manage-events`;
        navigate(correctRoute);
        return null;
      }
      return user;
    } catch (err) {
      console.error("Authentication error:", err.message, "Code:", err.code);
      setCurrentUser(null);
      if (err.code === 401 && !currentUser) {
        navigate("/login", { state: { from: location.pathname } });
        return null;
      }
      setError("Failed to verify user: " + err.message);
      return null;
    }
  };

  const fetchEvents = async (user) => {
    try {
      if (!user) {
        setError("User not authenticated");
        return;
      }
      let queries = [];
      if (!user.labels?.includes("admin")) {
        queries.push(Query.equal("userId", user.$id));
      }
      const response = await databases.listDocuments(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        queries
      );
      setEvents(response.documents);
    } catch (err) {
      console.error("Fetch events failed:", err.message, "Code:", err.code);
      setError("Failed to fetch events: " + err.message);
      if (err.code === 401) {
        navigate("/login", { state: { from: location.pathname } });
      }
    }
  };

  const fetchEventById = async (user, eventId) => {
    try {
      if (!user) {
        setError("User not authenticated");
        return;
      }
      const response = await databases.getDocument(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        eventId
      );
      if (response.userId !== user.$id && !user.labels.includes("admin")) {
        setError("Unauthorized access to this event");
        navigate("/unauthorized");
        return;
      }
      setSelectedEvent(response);
    } catch (err) {
      console.error("Fetch event failed:", err.message, "Code:", err.code);
      setError("Failed to fetch event: " + err.message);
      if (err.code === 401) {
        navigate("/login", { state: { from: location.pathname } });
      }
    }
  };

  useEffect(() => {
    let isMounted = true;

    const initializeData = async () => {
      const user = await checkAndSetUser();
      if (user && isMounted) {
        if (eventId) {
          await fetchEventById(user, eventId);
        } else {
          await fetchEvents(user);
        }
      }
      setLoading(false);
    };

    initializeData();

    return () => {
      isMounted = false;
    };
  }, [eventId, userId, location.pathname, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await checkAndSetUser();
      if (!user) return;

      const status = getEventStatus(newEvent.eventDate);
      const eventData = {
        name: newEvent.name,
        venue: newEvent.venue,
        description: newEvent.description,
        eventDate: newEvent.eventDate,
        dressCode: newEvent.dressCode,
        status,
        userId: user.$id,
      };

      await databases.createDocument(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        ID.unique(),
        eventData
      );
      await fetchEvents(user);
      setNewEvent({
        name: "",
        venue: "",
        description: "",
        eventDate: "",
        dressCode: "",
        status: "upcoming",
      });
      setShowForm(false);
    } catch (err) {
      console.error("Error creating event:", err);
      setError("Failed to create event: " + err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <Section className="pt-[4rem] pb-[2rem]">
        <TitleBar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <img src={loadingAnimation} alt="Loading..." className="w-16 h-16" />
        </div>
      </Section>
    );
  }

  return (
    <>
      <TitleBar />
      <Section>
        <Heading
          title={
            eventId ? selectedEvent?.name || "Event Details" : "Manage Events"
          }
          tag={
            eventId
              ? "Event Information"
              : isAdminRoute
              ? "All Events"
              : "Your Events"
          }
          className="text-center mt-4"
        />
      </Section>
      <Section className="flex justify-start items-center gap-2 flex-col">
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        {eventId && selectedEvent ? (
          <div className="w-full max-w-[90vw] lg:max-w-[50vw] p-6 bg-n-8 border-2 border-color-7 rounded-[2rem]">
            <p>
              <strong>Venue:</strong> {selectedEvent.venue}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedEvent.eventDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Description:</strong> {selectedEvent.description}
            </p>
            <p>
              <strong>Dress Code:</strong> {selectedEvent.dressCode || "None"}
            </p>
            <p>
              <strong>Status:</strong> {selectedEvent.status}
            </p>
            <p>
              <strong>Tickets Sold:</strong> {selectedEvent.ticketsSold || 0}
            </p>
            <Button
              onClick={() =>
                navigate(
                  isAdminRoute
                    ? "/admin/manage-events"
                    : `/guest/${userId}/manage-events`
                )
              }
            >
              Back to Events
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center mb-6">
              <Button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "Add an Event?"}
              </Button>
            </div>

            {showForm ? (
              <div className="w-full min-w-[90vw] max-w-[90vw] lg:min-w-[50vw] lg:max-w-[50vw] h-full px-6 bg-n-8 border-2 border-color-7 rounded-[2rem] py-4">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="name">Event Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={newEvent.name}
                      onChange={handleInputChange}
                      className="w-auto h-[3rem] p-4 rounded-[0.5rem] bg-transparent border-2 border-color-7 outline-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="description">Description</label>
                    <textarea
                      name="description"
                      id="description"
                      value={newEvent.description}
                      onChange={handleInputChange}
                      className="w-auto h-[6rem] p-4 rounded-[0.5rem] bg-transparent border-2 border-color-7 outline-none"
                      required
                    ></textarea>
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="venue">Venue</label>
                    <input
                      type="text"
                      name="venue"
                      id="venue"
                      value={newEvent.venue}
                      onChange={handleInputChange}
                      className="w-auto h-[3rem] p-4 rounded-[0.5rem] bg-transparent border-2 border-color-7 outline-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="dressCode">Dress-code (optional)</label>
                    <input
                      type="text"
                      name="dressCode"
                      id="dressCode"
                      value={newEvent.dressCode}
                      onChange={handleInputChange}
                      className="w-auto h-[3rem] p-4 rounded-[0.5rem] bg-transparent border-2 border-color-7 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="eventDate">Event Date</label>
                    <input
                      type="date"
                      name="eventDate"
                      id="eventDate"
                      value={newEvent.eventDate}
                      onChange={handleInputChange}
                      className="w-auto h-[3rem] p-4 rounded-[0.5rem] bg-transparent border-2 border-color-7 outline-none"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full mt-6">
                    Save Event
                  </Button>
                </form>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-4 col-span-full">
                <p className="text-gray-500">No events found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <AdminCard
                    key={event.$id}
                    title={event.name}
                    onClick={(e) =>
                      handleCardClick(
                        e,
                        isAdminRoute
                          ? `/admin/event/${event.$id}`
                          : `/guest/${userId}/event/${event.$id}`
                      )
                    }
                    value={event.ticketsSold?.toString() || "0"}
                    icon={<i className="fa fa-calendar-alt"></i>}
                    status={event.status}
                    date={new Date(event.eventDate).toLocaleDateString()}
                    venue={event.venue}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </Section>
      <Footer />
    </>
  );
};

export default ManageEvents;
