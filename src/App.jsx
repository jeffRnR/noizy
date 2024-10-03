import ButtonGradient from "./assets/svg/ButtonGradient";
import Button from "./components/Button";
import Events from "./components/Events";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Membership from "./components/Membership";
import Terms from "./components/Terms";
import TicketPurchase from "./components/TicketPurchase";

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Events />
        {/* <TicketPurchase /> */}
        <Membership />
        <Terms />
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
