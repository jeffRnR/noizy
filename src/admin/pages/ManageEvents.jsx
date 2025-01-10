import React from "react";
import Section from "../../components/Section";
import TitleBar from "../components/TitleBar";
import AdminCard from "../components/AdminCards";

const ManageEvents = () => {
  return (
    <Section className="pt-[4rem] pb-[2rem]" id="manage-events">
      <TitleBar />
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6 lg:mx-6 md:mx-4">
          <h1>Your events</h1>
          <div>{/* <AdminCard /> */}</div>
        </div>
      </div>
    </Section>
  );
};

export default ManageEvents;
