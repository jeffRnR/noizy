import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  account,
  databases,
  DATABASE_ID,
  EVENTS_COLLECTION_ID,
} from "../../../lib/appwrite.config";
import Section from "../../components/Section";
import TitleBar from "../components/TitleBar";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import { loading as loadingAnimation } from "../../assets";

const EventDetails = () => {
  const { userId, eventId } = useParams(); // userId is optional for admin routes
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const isAdminRoute = location.pathname.startsWith("/admin");

  const checkAndSetUser = async () => {
    try {
      console.log("EventDetails - Checking session...");
      const session = await account.getSession("current");
      console.log("EventDetails - Session retrieved:", session);
      const user = await account.get();
      console.log("EventDetails - User authenticated:", user);
      setCurrentUser(user);

      // For guest routes, ensure userId matches authenticated user
      if (userId && user.$id !== userId && !user.labels.includes("admin")) {
        console.warn("User ID mismatch, redirecting...");
        navigate(`/guest/${user.$id}/events`);
        return null;
      }
      return user;
    } catch (err) {
      console.error("Authentication error:", err.message, "Code:", err.code);
      setCurrentUser(null);
      if (err.code === 401) {
        console.log("Session invalid - redirecting to /login");
        navigate("/login");
        return null;
      }
      setError("Failed to verify user: " + err.message);
      return null;
    }
  };

  const fetchEvent = async (user) => {
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
      console.log("EventDetails - Event fetched:", response);
      if (response.userId !== user.$id && !user.labels.includes("admin")) {
        setError("Unauthorized access to this event");
        navigate("/unauthorized");
        return;
      }
      setEvent(response);
    } catch (err) {
      console.error("Fetch event failed:", err.message, "Code:", err.code);
      setError("Failed to fetch event: " + err.message);
      if (err.code === 401) navigate("/login");
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      const user = await checkAndSetUser();
      if (user) await fetchEvent(user);
      setLoading(false);
    };
    initializeData();
  }, []);

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

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <>
      <TitleBar />
      <Section>
        <Heading
          title={event?.name || "Event Details"}
          tag="Event Information"
          className="text-center mt-4"
        />
      </Section>
      <Section className="flex justify-center items-center gap-2 flex-col">
        <div className="w-full max-w-[90vw] lg:max-w-[50vw] p-6 bg-n-8 border-2 border-color-7 rounded-[2rem]">
          <p>
            <strong>Venue:</strong> {event?.venue}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(event?.eventDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Description:</strong> {event?.description}
          </p>
          <p>
            <strong>Dress Code:</strong> {event?.dressCode || "None"}
          </p>
          <p>
            <strong>Status:</strong> {event?.status}
          </p>
          <p>
            <strong>Tickets Sold:</strong> {event?.ticketsSold || 0}
          </p>
          <Button
            onClick={() =>
              navigate(
                isAdminRoute ? "/admin/all-events" : `/guest/${userId}/events`
              )
            }
            className="mt-4"
          >
            Back to Events
          </Button>
        </div>
      </Section>
      <Footer />
    </>
  );
};

export default EventDetails;
