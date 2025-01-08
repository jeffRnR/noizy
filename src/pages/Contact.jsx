import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Heading from "../components/Heading";
import Button from "../components/Button";
import Form from "../components/Form";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <Header />
      <Section>
        <Heading
          title="Noizy Nightz Contacts"
          tag="Let's Engage"
          className="text-center"
        />
      </Section>
      <Section className="flex justify-center items-center gap-2 flex-col ">
        <div className="flex gap-[1rem] max-lg:flex-wrap justify-center">
          <div
            className="min-w-[90vw] max-w-[90vw] lg:min-w-[50vw] lg:max-w-[50vw]  h-full px-6 bg-n-8 border-2 
          border-color-7 rounded-[2rem]  py-4 "
          >
            <h4 className="h4 mb-4">Our Contacts</h4>
            <div className="flex flex-col  min-h-[5.5rem] mb-6 ">
              <div className="text-[0.75rem] sm:text-[1rem] text-n-2 align-middle">
                Phone{" "}
                <span className="font-bold text-n-1/80 text-[1rem] sm:text-[1.25rem]">
                  {" : "}
                  0742422990
                </span>
              </div>
              <div className="text-[0.75rem] sm:text-[1rem] text-n-2 align-middle">
                Email{" "}
                <span className=" font-bold text-n-1/80 text-[1rem] sm:text-[1.25rem]">
                  {" : "}
                  noizynight@gmail.com
                </span>
              </div>
              <div className="text-[0.75rem] sm:text-[1rem] text-n-2 align-middle">
                Location
                <span className="font-bold text-n-1/80 text-[1rem] sm:text-[1.25rem]">
                  {" : "}We maintain a rather online presence
                </span>
              </div>
            </div>

            <Button
              className="w-full mb-6"
              href={"mailto:noizynightke@gmail.com"}
            >
              Drop us an Email
            </Button>
          </div>
        </div>

        <Form title="Submit a message" buttonLink="" />
      </Section>
      <Footer />
    </>
  );
};

export default Contact;
