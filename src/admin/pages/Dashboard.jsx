import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  account,
  databases,
  DATABASE_ID,
  GUESTBRANDS_COLLECTION_ID,
  Query,
} from "../../../lib/appwrite.config";
import Button from "../../components/Button";
import Section from "../../components/Section";
import {
  noizylogo_new,
  loading as loadingAnimation,
  logo_new,
} from "../../assets";
import Heading from "../../components/Heading";
import Footer from "../../components/Footer";
import AdminCard from "../components/AdminCards";
import TitleBar from "../components/TitleBar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserAndBrandData = async () => {
      try {
        const currentUser = await account.get();
        console.log("Dashboard - Current User:", currentUser);
        setUser(currentUser);

        const response = await databases.listDocuments(
          DATABASE_ID,
          GUESTBRANDS_COLLECTION_ID,
          [Query.equal("userId", [currentUser.$id])]
        );
        console.log("Dashboard - Brand data:", response.documents);
        if (response.documents.length > 0) {
          setBrandData(response.documents[0]);
        } else {
          setError("No brand data found for this user.");
        }
      } catch (err) {
        console.error("Dashboard - Error fetching data:", err);
        setError(`Error fetching data: ${err.message}`);
        if (err.code === 401) {
          navigate("/login", { state: { from: window.location.pathname } });
        }
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
      <Section className="pt-[4rem] pb-[2rem]">
        <TitleBar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <img src={loadingAnimation} alt="Loading..." className="w-16 h-16" />
        </div>
      </Section>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Section className="pt-[4rem] pb-[2rem]" id="admin-dashboard">
      <div className="fixed left-0 top-0 w-full z-50 border-b border-n-6 bg-n-8/90 lg:backdrop-blur-sm transition-all duration-700 ease-in-out">
        <div className="flex flex-row justify-between mx-6 my-2 px-0 lg:px-7.5 xl:px-10 max-lg:py-4">
          <div>
            <a href="/">
              <img
                src={logo_new}
                alt="Noizy Logo"
                className="mr-4 rounded-full"
                width={70}
                height={70}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6 lg:mx-6 md:mx-4">
        <AdminCard
          title="Events"
          link={user ? `/guest/${user.$id}/manage-events` : "/login"}
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
