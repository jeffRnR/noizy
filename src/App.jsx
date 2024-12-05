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
import Footer from "./components/Footer";
import NoizyMerch from "./pages/NoizyMerch";
import NoizyMarketplace from "./pages/NoizyMarketplace";
import Contact from "./pages/Contact";

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
                <Footer />
              </>
            }
          />
          {/* Route for Ticket Purchase */}
          <Route path="/purchase/:eventId" element={<TicketPurchase />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/album" element={<Album />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/noizy-merch" element={<NoizyMerch />} />
          <Route path="/noizy-marketplace" element={<NoizyMarketplace />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
