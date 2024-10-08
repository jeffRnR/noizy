import { Routes, Route } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Events from "./components/Events";
import Membership from "./components/Membership";
import Terms from "./pages/Terms";
import TicketPurchase from "./pages/TicketPurchase";
import Album from "./pages/Album";
import Playlist from "./pages/Playlist";

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
              </>
            }
          />
          {/* Route for Ticket Purchase */}
          <Route path="/purchase/:eventId" element={<TicketPurchase />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/album" element={<Album />} />
          <Route path="/playlist" element={<Playlist />} />
        </Routes>
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
