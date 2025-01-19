import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Client, Account, Databases, Query, Permission } from "appwrite";
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
  const [showForm, setShowForm] = useState(false); // State for toggling form visibility
  const [newEvent, setNewEvent] = useState({
    title: "",
    venue: "",
    description: "",
    date: "",
  });

  const location = useLocation();
  const { userId } = useParams();

  const isAdminRoute = location.pathname.startsWith("/admin");

  // Initialize Appwrite
  const client = new Client();
  client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);
  const databases = new Databases(client);
  const account = new Account(client);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const user = await account.get();
        if (isAdminRoute) {
          const response = await databases.listDocuments(
            DATABASE_ID,
            EVENTS_COLLECTION_ID
          );
          setEvents(response.documents);
        } else {
          const response = await databases.listDocuments(
            DATABASE_ID,
            EVENTS_COLLECTION_ID,
            [Query.equal("userId", [userId])]
          );
          setEvents(response.documents);
        }
      } catch (err) {
        if (err.code === 401) {
          setError(
            "You are not authorized to view these events. Please log in."
          );
        } else {
          setError("Error loading events. Please try again later.");
        }
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [isAdminRoute, userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await account.get();
      await databases.createDocument(
        DATABASE_ID,
        EVENTS_COLLECTION_ID,
        "unique()",
        { ...newEvent, userId: user.$id }, // Event data
        [
          Permission.read(`user:${user.$id}`), // Allow user to read the document
          Permission.write(`user:${user.$id}`), // Allow user to write to the document
        ]
      );
      setEvents((prev) => [...prev, { ...newEvent, userId: user.$id }]);
      setNewEvent({
        title: "",
        venue: "",
        description: "",
        date: "",
        dressCode: "",
      });
      setShowForm(false);
    } catch (err) {
      console.error("Error creating event:", err);
    }
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

  if (error) {
    return (
      <Section className="pt-[4rem] pb-[2rem]">
        <TitleBar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-red-500">{error}</p>
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
        {events.length === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-500">No events found.</p>
          </div>
        )}

        <div className="flex items-center mb-6">
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Add an Event?"}
          </Button>
        </div>

        {showForm && (
          <div className="w-full min-w-[90vw] max-w-[90vw] lg:min-w-[50vw] lg:max-w-[50vw] h-full px-6 bg-n-8 border-2 border-color-7 rounded-[2rem] py-4">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="title">Title</label>
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
                  className="w-auto h-[5rem] p-4 rounded-[0.5rem] bg-transparent border-2 border-color-7 outline-none"
                  rows="3"
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
                  required
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="date">Date</label>
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
        )}

        {events.length > 0 && (
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
                value={event.ticketsSold || "0"}
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
