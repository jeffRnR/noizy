import React from "react";
import TitleBar from "./TitleBar"; // Header component
import AdminDashboard from "./AdminDashboard"; // Admin view
import GuestDashboard from "./GuestDashboard"; // Guest view

const Dashboard = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>; // Loading fallback
  }

  const isAdmin = user.role === "admin"; // Replace with your role logic

  return (
    <div className="dashboard-container">
      <TitleBar user={user} />
      <div className="dashboard-content">
        {isAdmin ? <AdminDashboard /> : <GuestDashboard user={user} />}
      </div>
    </div>
  );
};

export default Dashboard;
