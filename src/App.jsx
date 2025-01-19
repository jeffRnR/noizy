import { Routes, Route } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Events from "./components/Events";
import Membership from "./components/Membership";
import MembershipPayment from "./pages/MembershipPayment";
import Terms from "./pages/Terms";
import TicketPurchase from "./pages/TicketPurchase";
import Album from "./pages/Album";
import Playlist from "./pages/Playlist";
import NoizyMerch from "./pages/NoizyMerch";
import NoizyMarketplace from "./pages/NoizyMarketplace";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminDashboard from "./admin/pages/AdminDashboard";
import GuestDashboard from "./admin/pages/GuestDashboard";
import ManageEvents from "./admin/pages/ManageEvents";
import Checkout from "./pages/Checkout";

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Routes>
          {/* Home Route with all main components */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Hero />
                <Events />
                <Membership />
                <Playlist />
              </>
            }
          />

          {/* Public Routes */}
          <Route path="/purchase/:eventId" element={<TicketPurchase />} />
          <Route path="/checkout/:eventId" element={<Checkout />} />
          <Route path="/membershipPayment" element={<MembershipPayment />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/album" element={<Album />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/noizy-merch" element={<NoizyMerch />} />
          <Route path="/noizy-marketplace" element={<NoizyMarketplace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/all-events" element={<ManageEvents />} />
          <Route path="/admin/all-users" element={<ManageEvents />} />
          <Route path="/admin/total-views" element={<ManageEvents />} />
          <Route path="/admin/total-revenue" element={<ManageEvents />} />
          <Route path="/admin/all-transactions" element={<ManageEvents />} />

          {/* Guest Brand Routes */}
          <Route path="/guest-dashboard/:userId" element={<GuestDashboard />} />
          <Route path="/guest/:userId/events" element={<ManageEvents />} />
          <Route path="/guest/:userId/customers" element={<ManageEvents />} />
          <Route path="/guest/:userId/views" element={<ManageEvents />} />
          <Route path="/guest/:userId/revenue" element={<ManageEvents />} />
          <Route
            path="/guest/:userId/transactions"
            element={<ManageEvents />}
          />
        </Routes>
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
