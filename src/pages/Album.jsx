import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Heading from "../components/Heading";
import { LeftLine, RightLine } from "../components/design/Pricing";
import PhotoCard from "../components/PhotoCard";
import Footer from "../components/Footer";

const Album = () => {
  return (
    <>
      <Header />
      <Section className="overflow-hidden" id="membership">
        <div className="container relative z-2">
          <Heading
            title="Noizy Photo Album"
            tag="Let's get nostalgic"
            className="text-center"
          />
        </div>
      </Section>

      <Section className="flex justify-center items-center gap-2 flex-col flex-wrap">
        <div>
          <LeftLine />
          <RightLine />
        </div>
        <PhotoCard />
      </Section>
      <Footer />
    </>
  );
};

export default Album;
