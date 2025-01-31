import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Client, Account, Databases, Query, ID, Permission } from "appwrite";
import Section from "../../components/Section";
import TitleBar from "../components/TitleBar";
import AdminCard from "../components/AdminCards";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import {
  ENDPOINT,
  PROJECT_ID,
  DATABASE_ID,
  EVENTS_COLLECTION_ID,
} from "../../../lib/appwrite.config";
import { loading as loadingAnimation } from "../../assets";
import Footer from "../../components/Footer";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
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
    ticketsSold: 0,
  });

  const location = useLocation();
  const { userId } = useParams();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Initialize Appwrite - Move this outside of the component
  const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

  const databases = new Databases(client);
  const account = new Account(client);

  const getEventStatus = (date) => {
    const currentDate = new Date();
    const eventDateObj = new Date(date);

    // Reset time parts to compare only dates
    currentDate.setHours(0, 0, 0, 0);
    eventDateObj.setHours(0, 0, 0, 0);

    if (eventDateObj > currentDate) {
      return "upcoming";
    } else if (eventDateObj.getTime() === currentDate.getTime()) {
      return "ongoing";
    } else {
      return "expired";
    }
  };

  const checkAndSetUser = async () => {
    try {
      await account.getSession("current"); // Ensure session is valid
      const user = await account.get();
      console.log("Current user:", user); // Debug log
      setCurrentUser(user);
      return user;
    } catch (err) {
      console.error("Auth check failed:", err);
      navigate("/login");
      return null;
    }
  };

  const fetchEvents = async (user) => {
    try {
      if (!user) return;

      // Debug log
      console.log("Fetching events for user:", user.$id);
      console.log("Is admin:", user.labels?.includes("admin"));

      let queries = [];

      // For non-admin users, only fetch their events
      if (!user.labels?.includes("admin")) {
        queries.push(Query.equal("userId", user.$id));
      }

      // Debug log
      console.log("Using queries:", queries);

      const response = await databases.listDocuments(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        queries
      );

      // Debug log
      console.log("Fetched events:", response.documents);

      setEvents(response.documents);
      setError(null);
    } catch (err) {
      console.error("Error fetching events:", err);
      if (err.code === 401) {
        // Try to refresh the session
        try {
          await checkAndSetUser();
        } catch (authErr) {
          navigate("/login");
        }
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      const user = await checkAndSetUser();
      if (user) {
        console.log("User session valid, fetching events...");
        await fetchEvents(user);
      }
    };

    initializeData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await checkAndSetUser();
      if (!user) return;

      // Calculate the status based on the eventDate
      const status = getEventStatus(newEvent.date);

      const eventData = {
        title: newEvent.title,
        venue: newEvent.venue,
        description: newEvent.description,
        date: newEvent.date,
        dressCode: newEvent.dressCode,
        status, // Include the calculated status
        // ticketsSold: newEvent.ticketsSold,
        userId: user.$id,
        // Created: new Date().toISOString(),
        // // createdBy: user.name || user.email,
        // isAdminCreated: user.labels?.includes("admin") || false,
      };

      // Save the event to the database
      await databases.createDocument(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        ID.unique(),
        eventData
      );

      // Refresh the events list
      await fetchEvents(user);

      // Reset the form
      setNewEvent({
        title: "",
        venue: "",
        description: "",
        date: "",
        dressCode: "",
        status: "upcoming", // Reset to default
        // ticketsSold: 0,
      });
      setShowForm(false);
    } catch (err) {
      console.error("Error creating event:", err);
      setError("Failed to create event. Please try again.");
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
          title={"Manage Events"}
          tag={isAdminRoute ? "All Events" : "Your Events"}
          className="text-center mt-4"
        />
      </Section>
      <Section className="flex justify-start items-center gap-2 flex-col">
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <div className="flex items-center mb-6">
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Add an Event?"}
          </Button>
        </div>

        {showForm ? (
          <div className="w-full min-w-[90vw] max-w-[90vw] lg:min-w-[50vw] lg:max-w-[50vw] h-full px-6 bg-n-8 border-2 border-color-7 rounded-[2rem] py-4">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="title">Event Name</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={newEvent.title}
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
                <label htmlFor="date">Event Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={newEvent.date}
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
                link={
                  isAdminRoute
                    ? `/admin/event/${event.$id}`
                    : `/guest/${userId}/event/${event.$id}`
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
      </Section>
      <Footer />
    </>
  );
};

export default ManageEvents;
