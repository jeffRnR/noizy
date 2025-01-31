import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Client, Account, Databases, Query } from "appwrite";
import Button from "../../components/Button";
import Section from "../../components/Section";
import { noizy_logo, loading as loading3, noizylogo_new } from "../../assets";
import Heading from "../../components/Heading";
import Footer from "../../components/Footer";
import AdminCard from "../components/AdminCards";
import {
  ENDPOINT,
  PROJECT_ID,
  DATABASE_ID,
  GUESTBRANDS_COLLECTION_ID,
} from "../../../lib/appwrite.config";

const GuestDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { userId } = useParams();

  // Initialize Appwrite
  const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
  const account = new Account(client);
  const databases = new Databases(client);

  useEffect(() => {
    const fetchUserAndBrandData = async () => {
      try {
        // Step 1: Fetch the authenticated user's data
        const currentUser = await account.get();
        console.log("curent user is:", currentUser);
        if (currentUser.labels.includes("admin")) {
          // Redirect admin users to admin dashboard
          navigate("/admin-dashboard");
          return;
        }
        setUser(currentUser);

        // Step 2: Query the brand data collection using the user's ID
        const response = await databases.listDocuments(
          DATABASE_ID,
          GUESTBRANDS_COLLECTION_ID,
          [Query.equal("userId", [currentUser.$id])]
        );

        if (response.documents.length > 0) {
          setBrandData(response.documents[0]);
        } else {
          setError("No brand data found. Please contact support.");
        }
      } catch (err) {
        setError("Error loading dashboard. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndBrandData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/login");
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  if (loading) {
    return (
      <div className="items-center text-center justify-center align-middle">
        <img
          src={loading3}
          alt="Loading..."
          className="items-center text-center justify-center align-middle"
        />
      </div>
    );
  }

  return (
    <Section className="pt-[4rem] pb-[2rem]" id="guest-dashboard">
      {/* Title Bar */}
      <div className="fixed left-0 top-0 w-full z-50 border-b border-n-6 bg-n-8/90 lg:backdrop-blur-sm transition-all duration-700 ease-in-out">
        <div className="flex flex-row justify-between mx-6 my-2 px-0 lg:px-7.5 xl:px-10 max-lg:py-4">
          <div>
            <a href="/">
              <img
                src={noizylogo_new}
                alt="Noizy Logo"
                className="mr-4 rounded-full"
                width={40}
                height={40}
              />
            </a>
          </div>
          <div className="flex flex-col">
            {user && (
              <>
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                >
                  <span className="w-7 h-7 items-center justify-items-center text-center justify-center align-middle text-n-2 rounded-full bg-color-7/50">
                    <i className="fa fa-user align-text-bottom"></i>
                  </span>
                  <h1 className="text-sm text-n-1">{user.name}</h1>
                </div>
                <p className="text-xs text-right font-grotesk text-n-3">
                  {brandData?.brandName}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {dropdownVisible && (
        <div className="fixed z-50 right-0 top-24 mx-6 p-2 md:mx-6 lg:mx-10 w-40 gap-2 text-s border border-color-7 bg-n-8 rounded-2xl">
          <Button
            className="w-full text-n-1 text-left px-4 py-2 transition-colors duration-700 ease-in-out hover:text-color-1"
            onClick={handleLogout}
          >
            Logout
          </Button>
          <button
            className="w-full text-center p-2 bg-color-7/50 mt-4 text-n-1 rounded-md text-xs transition-colors duration-700 ease-in-out hover:text-color-1"
            onClick={() => setDropdownVisible(false)}
          >
            Close
          </button>
        </div>
      )}

      {error ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <>
          <Heading
            title={`Welcome ${brandData?.brandName}`}
            tag="Manage Your Brand"
          />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6 lg:mx-6 md:mx-4">
            <AdminCard
              title="Events"
              link={`/guest/${userId}/events`}
              value={brandData?.eventsCount || "0"}
              icon={<i className="fa fa-calendar-alt"></i>}
            />
            <AdminCard
              title="Customers"
              link={`/guest/${userId}/customers`}
              value={brandData?.customersCount || "0"}
              icon={<i className="fa fa-users"></i>}
            />
            <AdminCard
              title="Views"
              link={`/guest/${userId}/views`}
              value={brandData?.viewsCount || "0"}
              icon={<i className="fa fa-eye"></i>}
            />
            <AdminCard
              title="Ticket Revenue"
              link={`/guest/${userId}/revenue`}
              value={brandData?.revenue || "0"}
              icon={<i className="fa fa-ticket-alt"></i>}
              isRevenue={true}
            />
            <AdminCard
              title="Transactions"
              link={`/guest/${userId}/transactions`}
              value={brandData?.transactionsCount || "0"}
              icon={<i className="fa fa-exchange-alt"></i>}
            />
          </div>
        </>
      )}

      <Footer />
    </Section>
  );
};

export default GuestDashboard;
