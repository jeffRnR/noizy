import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Client, Account, Databases, ID, Query } from "appwrite";
import Button from "../../components/Button";
import Section from "../../components/Section";
import { noizy_logo, loading as loading3 } from "../../assets";
import Heading from "../../components/Heading";
import Footer from "../../components/Footer";
import AdminCard from "../components/AdminCards";
import {
  ENDPOINT,
  PROJECT_ID,
  DATABASE_ID,
  GUESTBRANDS_COLLECTION_ID,
} from "../../../lib/appwrite.config";

const Dashboard = () => {
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
        setUser(currentUser);

        // Step 2: Query the brand data collection using the user's ID
        const response = await databases.listDocuments(
          DATABASE_ID,
          GUESTBRANDS_COLLECTION_ID,
          [
            Query.equal("userId", [currentUser.$id]), // Using the correct user ID from Appwrite
          ]
        );

        if (response.documents.length > 0) {
          // Assuming the first document is the correct one for the user
          const brand = response.documents[0];
          setBrandData(brand);
        } else {
          setError("No brand data found for this user.");
        }
      } catch (err) {
        setError(`Error fetching brand data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndBrandData();
  }, []);

  // const fetchBrandData = async (userId) => {
  //   try {
  //     const response = await databases.getDocument(
  //       DATABASE_ID,
  //       GUESTBRANDS_COLLECTION_ID,
  //       // [Query.equal("userId", userId)]
  //       documentId
  //       // userId // Ensure this matches the document ID
  //     );
  //     setBrandData(response);
  //   } catch (error) {
  //     console.error("Error fetching brand data:", error);
  //   }
  // };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/");
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

  if (error) {
    return <div>{error}</div>;
  }

  // Card component to display metrics
  // const Card = ({ title, link, value, icon, isRevenue }) => (
  //   <Link
  //     to={link}
  //     className="relative mx-6 z-0 bg-n-8 rounded-xl shadow-lg hover:shadow-xl border-2 border-color-7 transition duration-300 ease-in-out px-6 py-4"
  //   >
  //     <div className="flex flex-col justify-between gap-4">
  //       <div className="text-2xl text-color-1">
  //         <span>{icon}</span>
  //       </div>
  //       <div className="flex flex-col justify-between w-full">
  //         <h3 className="text-xl font-semibold mb-2">{title}</h3>
  //         <span
  //           className={`text-sm font-semibold mb-4 ${
  //             isRevenue ? "text-color-4/85" : "text-color-2"
  //           }`}
  //         >
  //           {isRevenue ? `KES ${value}` : value}
  //         </span>
  //       </div>
  //     </div>
  //     <div className="absolute top-0 right-0 p-3 text-white rounded-full">
  //       <span>
  //         <i className="fa fa-arrow-right"></i>
  //       </span>
  //     </div>
  //   </Link>
  // );

  return (
    <Section className="pt-[4rem] pb-[2rem]" id="admin-dashboard">
      {/* Title Bar */}
      <div className="fixed left-0 top-0 w-full z-50 border-b border-n-6 bg-n-8/90 lg:backdrop-blur-sm transition-all duration-700 ease-in-out">
        <div className="flex flex-row justify-between mx-6 my-2 px-0 lg:px-7.5 xl:px-10 max-lg:py-4">
          <div>
            <a href="/">
              <img
                src={noizy_logo}
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
                  <h1 className="text-sm text-n-1">
                    {user.labels.includes("admin")
                      ? user.name
                      : user.name || "Guest User"}
                  </h1>
                </div>
                <p className="text-xs text-right font-grotesk text-n-3">
                  {user.labels.includes("admin")
                    ? "Admin"
                    : brandData?.brandName}
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

      <Heading
        title={`Welcome ${brandData?.brandName || "to Noizy Admin"}`}
        tag="One Stop to Manage Everything"
      />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6 lg:mx-6 md:mx-4">
        <AdminCard
          title="Events"
          link={`/admin/${userId}/manage-events`}
          value="0"
          icon={<i className="fa fa-calendar-alt"></i>}
        />
        <AdminCard
          title="Customers"
          link={`/admin/${userId}/customers`}
          value="0"
          icon={<i className="fa fa-users"></i>}
        />
        <AdminCard
          title="Views"
          link={`/admin/${userId}/views`}
          value="0"
          icon={<i className="fa fa-eye"></i>}
        />
        <AdminCard
          title="Total Ticket Revenue"
          link={`/admin/${userId}/ticket-revenue`}
          value="0"
          icon={<i className="fa fa-ticket-alt"></i>}
          isRevenue={true}
        />
        <AdminCard
          title="Total Ticket Transactions"
          link={`/admin/${userId}/ticket-transactions`}
          value="0"
          icon={<i className="fa fa-exchange-alt"></i>}
        />
      </div>

      <Footer />
    </Section>
  );
};

export default Dashboard;
