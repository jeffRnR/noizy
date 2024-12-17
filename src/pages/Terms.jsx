import React from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Heading from "../components/Heading";
import Button from "../components/Button";
import Form from "../components/Form";
import Footer from "../components/Footer";
import { terms } from "../constants";
import { useState } from "react";

const Terms = () => {
  const [formVisible, setFormVisible] = useState(false);
  const showForm = () => {
    setFormVisible(true);
  };
  const submitForm = () => {
    setFormVisible(false);
  };
  return (
    <>
      <Header />
      <Section id="terms" className="transition-all duration-700 ease-in-out">
        <Heading
          title="Terms and Conditions"
          tag="What we go by"
          className="text-center"
        />
      </Section>
      <Section className="flex justify-center items-center gap-2 flex-col flex-wrap transition-all duration-700 ease-in-out">
        <div
          className="min-w-[90vw] max-w-[90vw] lg:min-w-[50vw] lg:max-w-[50vw] h-full px-6 bg-n-8 border-2 
          border-color-7 rounded-[2rem] py-4 overflow-clip transition-all duration-700 ease-in-out"
        >
          <div className="flex flex-col min-h-[5.5rem] mb-6 items-center w-full px-2 flex-wrap overflow-auto transition-all duration-700 ease-in-out">
            {terms.map((item) => (
              <ul
                key={item.id}
                className="py-2 w-full transition-all duration-700 ease-in-out"
              >
                <li className="font-normal text-n-1/80 text-[1rem] sm:text-[1.25rem]">
                  <span className="text-[0.75rem] sm:text-[1rem] text-n-2 align-middle">
                    {item.id}
                    {". "}
                  </span>
                  {item.term}
                </li>
              </ul>
            ))}
          </div>

          <Button
            className="w-full self-end justify-self-center justify-center mb-6 items-center transition-all duration-700 ease-in-out"
            href=""
            onClick={showForm}
          >
            Share an Issue With us
          </Button>
        </div>

        {formVisible && (
          <div className="min-w-[90vw] max-w-[90vw] lg:min-w-[50vw] lg:max-w-[50vw] overflow-hidden">
            <Form title="Submit a message" buttonLink="" id="submitForm" />
          </div>
        )}
      </Section>

      <Footer />
    </>
  );
};

export default Terms;
