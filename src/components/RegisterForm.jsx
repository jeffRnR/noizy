import React, { useState } from "react";
import { Client, Account, Databases, ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import {
  ENDPOINT,
  PROJECT_ID,
  DATABASE_ID,
  GUESTBRANDS_COLLECTION_ID,
} from "../../lib/appwrite.config";
import Button from "./Button";

const RegisterForm = ({ onBack }) => {
  const client = new Client();
  client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);

  const account = new Account(client);
  const databases = new Databases(client);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contactName: "",
    email: "",
    contactNumber: "+254",
    brandName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^\+254[7-9][0-9]{8}$/;
    if (!formData.contactName.trim())
      newErrors.contactName = "Contact Name is required";
    if (!formData.email.includes("@"))
      newErrors.email = "Invalid email address";
    if (!phoneRegex.test(formData.contactNumber))
      newErrors.contactNumber = "Invalid Kenyan phone number (+254 712345678)";
    if (!formData.brandName.trim())
      newErrors.brandName = "Brand name is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactNumber" && !value.startsWith("+254")) {
      setFormData((prev) => ({
        ...prev,
        contactNumber: "+254" + value.replace(/^\+254/, ""),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    try {
      // Step 1: Create user
      console.log("Creating user...");
      const user = await account.create(
        ID.unique(),
        formData.email,
        formData.password,
        formData.contactName,
        { labels: ["guest"] }
      );
      console.log("User created successfully:", user);

      // Step 2: Create session
      console.log("Creating session...");
      await account.createEmailPasswordSession(
        formData.email,
        formData.password
      );
      console.log("Session created successfully");

      // Step 3: Store brand information - Let's try this separately
      console.log("Attempting to store brand information...");
      try {
        const document = await databases.createDocument(
          DATABASE_ID,
          GUESTBRANDS_COLLECTION_ID,
          ID.unique(),
          {
            userId: user.$id,
            contactName: formData.contactName,
            email: formData.email,
            contactNumber: formData.contactNumber,
            brandName: formData.brandName,
          }
        );
        console.log("Brand information stored successfully:", document);
      } catch (dbError) {
        console.error("Database error details:", {
          error: dbError,
          database: DATABASE_ID,
          collection: GUESTBRANDS_COLLECTION_ID,
          data: {
            userId: user.$id,
            contactName: formData.contactName,
            email: formData.email,
            contactNumber: formData.contactNumber,
            brandName: formData.brandName,
          },
        });

        // Even if database storage fails, we can still redirect to dashboard
        // since the user is created and authenticated
        console.warn("Proceeding with navigation despite database error");
      }

      // Continue with navigation regardless of database success
      setSuccessMessage(
        "Registration successful! Redirecting to your dashboard..."
      );
      navigate(`/admin/${user.$id}/dashboard`);
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        form: error.message || "Failed to register. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-[1rem] items-center">
      <h1 className="text-left">Register</h1>
      <div className="w-full min-w-[90vw] max-w-[90vw] lg:min-w-[50vw] lg:max-w-[50vw] h-full px-6 bg-n-8 border-2 border-color-7 rounded-[2rem] py-4">
        <form onSubmit={handleSubmit} className="w-full">
          {[
            { name: "contactName", type: "text" },
            { name: "email", type: "email" },
            { name: "contactNumber", type: "text" },
            { name: "brandName", type: "text" },
            { name: "password", type: "password" },
            { name: "confirmPassword", type: "password" },
          ].map(({ name, type }) => (
            <div key={name} className="flex flex-col gap-2 mb-4">
              <label htmlFor={name} className="mb-1 capitalize">
                {name.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                placeholder={`Enter ${name.replace(/([A-Z])/g, " $1")}`}
                value={formData[name]}
                onChange={handleInputChange}
                className="h-[3rem] p-4 rounded-[0.5rem] bg-transparent border-2 border-color-7 outline-none"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]}</p>
              )}
            </div>
          ))}
          {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}
          <Button className="w-full my-4" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          <p className="text-center text-sm text-n-3 mt-4">
            Back to{" "}
            <a
              href="#"
              className="text-color-4 hover:underline"
              onClick={onBack}
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
