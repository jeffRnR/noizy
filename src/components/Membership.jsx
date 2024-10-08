import Section from "./Section";
import Heading from "./Heading";
import MembershipList from "./MembershipList";
import { LeftLine, RightLine } from "./design/Pricing";

const Membership = () => {
  return (
    <Section className="overflow-hidden" id="membership">
      <div className="container relative z-2">
        <Heading
          title="Join our community of Ragers"
          tag="Pay to become a rager"
          className="text-center"
        />

        <div className="relative">
          <MembershipList />
          <LeftLine />
          <RightLine />
        </div>
      </div>
    </Section>
  );
};

export default Membership;
