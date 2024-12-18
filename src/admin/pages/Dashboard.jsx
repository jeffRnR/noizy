import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Section from "../../components/Section";
import { noizy_logo, loading as loading3, loading1 } from "../../assets";
import Heading from "../../components/Heading";
import Footer from "../../components/Footer";
import { account } from "../../../lib/appwrite.config"; // Import account from your Appwrite setup

const Dashboard = () => {
  // Extract userId from URL parameters
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { userId } = useParams();

  console.log("ID fetched fro params: ", userId);

  // Fetch the user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get current authenticated user from Appwrite
        const currentUser = await account.get();

        // Check if the authenticated user's ID matches the userId from URL
        if (currentUser.$id !== userId) {
          // If userId in URL doesn't match authenticated user, redirect to login page
          navigate("/login");
          return;
        }
        // Set user data if IDs match
        setUser(currentUser);
        console.log("User is", currentUser);
      } catch (err) {
        setError("Failed to fetch user data. Please log in.");
        navigate("/login"); // Redirect to login if not authenticated
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current"); // Kill the current session
      navigate("/"); // Redirect to the home page
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  // If still loading, show loading state
  if (loading) {
    return (
      <div className="items-center text-center justify-center align-middle">
        <img
          src={loading3}
          alt="Loading..."
          className="items-center text-center  justify-center align-middle"
        />
      </div>
    );
  }

  // If there was an error (e.g., user not authenticated), show error message
  if (error) {
    return <div>{error}</div>;
  }

  // Card component to display various metrics
  const Card = ({ title, link, value, icon, isRevenue }) => (
    <Link
      to={link}
      className="relative mx-6 z-0 bg-n-8 rounded-xl shadow-lg hover:shadow-xl border-2 border-color-7 transition duration-300 ease-in-out px-6 py-4"
    >
      <div className="flex flex-col justify-between gap-4">
        {/* Icon Section */}
        <div className="text-2xl text-color-1">
          <span>{icon}</span>
        </div>

        {/* Card Title and Value */}
        <div className="flex flex-col justify-between w-full">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <span
            className={`text-sm font-semibold mb-4 ${
              isRevenue ? "text-color-4/85" : "text-color-2"
            }`}
          >
            {isRevenue ? `KES ${value}` : value}
          </span>
        </div>
      </div>

      {/* Arrow icon */}
      <div className="absolute top-0 right-0 p-3 text-white rounded-full">
        <span>
          <i className="fa fa-arrow-right"></i>
        </span>
      </div>
    </Link>
  );

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
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                >
                  <span className="w-7 h-7 items-center justify-items-center text-center justify-center align-middle text-n-2 rounded-full bg-color-7/50">
                    <i className="fa fa-user align-text-bottom"></i>
                  </span>
                  <h1 className="text-md text-n-1">{user.name}</h1>
                </div>
                <p className="text-xs text-right font-grotesk text-n-2">
                  {user.labels}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      {dropdownVisible && (
        <div className="fixed z-50 right-0 top-24 mx-6 p-2 md:mx-6 lg:mx-10 w-40 gap-2 text-s border border-color-7 bg-n-8 rounded-2xl">
          <Button
            className="w-full text-n-1 text-left px-4 py-2 transition-colors duration-700 ease-in-out hover:text-color-1 "
            onClick={handleLogout}
          >
            Logout
          </Button>
          <button
            className="w-full text-center p-2 bg-color-7/50 mt-4 text-n-1 rounded-md text-xs  transition-colors duration-700 ease-in-out hover:text-color-1"
            onClick={() => setDropdownVisible(false)}
          >
            Close
          </button>
        </div>
      )}

      <Heading
        title="Noizy Admin Dashboard"
        tag="One Stop to Manage Everything"
      />

      {/* Cards for Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6 lg:mx-6 md:mx-4">
        <Card
          title="Events"
          link={`/admin/${userId}/events`}
          value="5"
          icon={<i className="fa fa-calendar-alt"></i>}
        />
        <Card
          title="Customers"
          link={`/admin/${userId}/customers`}
          value="453"
          icon={<i className="fa fa-users"></i>}
        />
        <Card
          title="Views"
          link={`/admin/${userId}/views`}
          value="932"
          icon={<i className="fa fa-eye"></i>}
        />
        <Card
          title="Members"
          link={`/admin/${userId}/members`}
          value="29"
          icon={<i className="fa fa-user-check"></i>}
        />
        <Card
          title="Total Ticket Revenue"
          link={`/admin/${userId}/ticket-revenue`}
          value="345000"
          icon={<i className="fa fa-ticket-alt"></i>}
          isRevenue={true}
        />
        <Card
          title="Total Ticket Transactions"
          link={`/admin/${userId}/ticket-transactions`}
          value="345"
          icon={<i className="fa fa-exchange-alt"></i>}
        />
        <Card
          title="NMP Businesses"
          link={`/admin/${userId}/nmp-businesses`}
          value="345"
          icon={<i className="fa fa-building"></i>}
        />
        <Card
          title="NMP Transactions"
          link={`/admin/${userId}/nmp-transactions`}
          value="345"
          icon={<i className="fa fa-exchange-alt"></i>}
        />
        <Card
          title="NMP Customers"
          link={`/admin/${userId}/nmp-customers`}
          value="345"
          icon={<i className="fa fa-users"></i>}
        />
        <Card
          title="NMP Revenue"
          link={`/admin/${userId}/nmp-revenue`}
          value="100000"
          icon={<i className="fa fa-dollar-sign"></i>}
          isRevenue={true}
        />
      </div>

      <Footer />
    </Section>
  );
};

export default Dashboard;
