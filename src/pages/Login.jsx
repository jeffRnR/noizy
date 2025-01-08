import React, { useState, useEffect } from "react";
import { Client, Account } from "appwrite";
import { useNavigate } from "react-router-dom";
import { PROJECT_ID, ENDPOINT } from "../../lib/appwrite.config";

// Components
import Header from "../components/Header";
import Section from "../components/Section";
import Heading from "../components/Heading";
import Button from "../components/Button";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  // Initialize Appwrite client
  const client = new Client();
  client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);
  const account = new Account(client);

  // State management
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    isSubmitSuccessful: false,
    isSuccess: false,
    error: "",
  });

  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  const toggleForm = () => setShowRegister((prev) => !prev);

  // Check for an existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Get the current logged-in user
        const user = await account.get();
        const userId = user.$id;

        // Redirect to user-specific dashboard
        navigate(`/admin/${userId}/dashboard`);
      } catch (error) {
        // No active session; user will remain on the login page
        console.log("No active session:", error);
      }
    };

    checkSession();
  }, [account, navigate]);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({
      isSubmitSuccessful: false,
      isSuccess: false,
      error: "",
    });

    try {
      // Create email session
      await account.createEmailPasswordSession(
        formData.email,
        formData.password
      );

      // Get the current logged-in user
      const user = await account.get();
      const userId = user.$id;

      // Set successful login status
      setSubmitStatus({
        isSubmitSuccessful: true,
        isSuccess: true,
        error: "",
      });

      // Navigate to user-specific dashboard
      navigate(`/admin/${userId}/dashboard`);
    } catch (error) {
      // Handle login errors
      console.error("Login error:", error);
      setSubmitStatus({
        isSubmitSuccessful: true,
        isSuccess: false,
        error: error.message || "Login failed. Please check your credentials.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form handler
  const handleReset = () => {
    setSubmitStatus({
      isSubmitSuccessful: false,
      isSuccess: false,
      error: "",
    });
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Header />
      <Section>
        <Heading
          title="Noizy Nightz Admins"
          tag="Login as an admin"
          className="text-center mt-4"
        />
      </Section>
      <Section className="flex justify-center items-center gap-2 flex-col">
        {showRegister ? (
          <RegisterForm onBack={toggleForm} />
        ) : (
          <div className="flex items-center flex-col gap-[1rem] max-lg:flex-wrap justify-center">
            <h1>Login</h1>
            <div className="min-w-[90vw] max-w-[90vw] lg:min-w-[50vw] lg:max-w-[50vw] h-full px-6 bg-n-8 border-2 border-color-7 rounded-[2rem] py-4">
              <div className="flex flex-col h-auto mb-6">
                {!submitStatus.isSubmitSuccessful && (
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 mb-4">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        placeholder="johndoe@example.com"
                        type="email"
                        className="w-auto h-[3rem] p-4 rounded-[0.5rem] bg-transparent border-2 border-color-7 outline-none"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      <label htmlFor="password">Password</label>
                      <input
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                        className="w-auto h-[3rem] p-4 rounded-[0.5rem] bg-transparent border-2 border-color-7 outline-none"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <Button
                      className="w-full my-4"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <svg
                          className="w-5 h-5 mx-auto text-white animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </form>
                )}

                {submitStatus.isSubmitSuccessful && submitStatus.isSuccess && (
                  <div className="flex flex-col items-center justify-center text-center text-white rounded-md">
                    <svg
                      width="100"
                      height="100"
                      className="text-green-300"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26.6666 50L46.6666 66.6667L73.3333 33.3333M50 96.6667C43.8716 96.6667 37.8033 95.4596 32.1414 93.1144C26.4796 90.7692 21.3351 87.3317 17.0017 82.9983C12.6683 78.6649 9.23082 73.5204 6.8856 67.8586C4.54038 62.1967 3.33331 56.1283 3.33331 50C3.33331 43.8716 4.54038 37.8033 6.8856 32.1414C9.23082 26.4796 12.6683 21.3351 17.0017 17.0017C21.3351 12.6683 26.4796 9.23084 32.1414 6.88562C37.8033 4.5404 43.8716 3.33333 50 3.33333C62.3767 3.33333 74.2466 8.24998 82.9983 17.0017C91.75 25.7534 96.6666 37.6232 96.6666 50C96.6666 62.3768 91.75 74.2466 82.9983 82.9983C74.2466 91.75 62.3767 96.6667 50 96.6667Z"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                    </svg>
                    <h3 className="py-5 text-2xl text-green-500">Success</h3>
                    <p className="text-gray-700 md:px-3">Login successful!</p>
                  </div>
                )}

                {submitStatus.isSubmitSuccessful && !submitStatus.isSuccess && (
                  <div className="flex flex-col items-center justify-center text-center text-white rounded-md">
                    <h3 className="text-2xl text-red-400 py-7">
                      Oops, Something went wrong!
                    </h3>
                    <p className="text-gray-300 md:px-3">
                      {submitStatus.error}
                    </p>
                    <button
                      className="mt-5 focus:outline-none text-blue-400 hover:text-blue-500"
                      onClick={handleReset}
                    >
                      Try Again
                    </button>
                  </div>
                )}
                <p className="text-center text-sm text-n-3 mt-4">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleForm();
                    }}
                    className="text-color-4 hover:underline"
                  >
                    Register
                  </a>{" "}
                  to host an event with us
                </p>
              </div>
            </div>
          </div>
        )}
      </Section>
      <Footer />
    </>
  );
};

export default Login;
