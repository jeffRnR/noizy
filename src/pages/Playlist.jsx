import React from "react";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Section from "../components/Section";
import PlaylistCard from "../components/PlaylistCard";
import Footer from "../components/Footer";

const Playlist = () => {
  return (
    <>
      <Header />
      <Section id="playlist">
        <Heading
          title="Noizy Events Music Playlist"
          tag="Experience the Noize"
        />
      </Section>
      <Section className="flex justify-center items-center gap-2 flex-col flex-wrap">
        <PlaylistCard />
      </Section>
      <Footer />
    </>
  );
};

export default Playlist;
