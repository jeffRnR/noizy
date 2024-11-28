import React from "react";
import Button from "../components/Button";

const Form = ({ title, buttonTitle, buttonLink, buttonFunction }) => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "9744bc3a-44a3-4502-a507-22bb7c70c2a2");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div className="flex gap-[1rem] max-lg:flex-wrap justify-center mt-4">
      <div
        className="min-w-[90vw] max-w-[90vw] lg:min-w-[50vw] lg:max-w-[50vw] h-full px-6 bg-n-8 border-2 
          border-color-7 rounded-[2rem]  py-4 "
      >
        <h4 className="h4 mb-4">{title}</h4>
        <div className="flex flex-col  h-auto mb-6">
          <form className="" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2 ">
              <label for="name">Name</label>
              <input
                id="name"
                placeholder="John Doe"
                type="text"
                className="w-auto h-[3rem] p-4 rounded-[0.5rem] bg-transparent border-2 border-color-7 mb-2 outline-none align-top"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label for="email">Email</label>
              <input
                id="email"
                placeholder="johndoe@example.com"
                type="email"
                className="w-auto h-[3rem] p-4 rounded-[0.5rem] bg-transparent border-2 border-color-7 mb-2 outline-none align-top"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label for="phone">Phone Number</label>
              <input
                id="phone"
                placeholder="0712345678"
                type="text"
                className="w-auto h-[3rem] p-4 rounded-[0.5rem] bg-transparent border-2 border-color-7 mb-2 outline-none align-top"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label for="message">Message</label>
              <input
                id="message"
                placeholder="write your message"
                type="text-area"
                className="w-auto h-[8rem] p-4 rounded-[0.5rem] bg-transparent border-2 border-color-7 mb-2 text-start outline-none align-top"
              />
            </div>
            <Button
              className="w-full my-4"
              href={buttonLink}
              onClick={buttonFunction}
              type="submit"
            >
              {buttonTitle}
            </Button>
            <span>{result}</span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
