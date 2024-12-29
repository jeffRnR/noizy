import React, { useState } from "react";
import { Client, Account, Databases } from "appwrite";
import { useNavigate } from "react-router-dom"; // import useNavigate from react-router-dom
import {
  ENDPOINT,
  PROJECT_ID,
  DATABASE_ID,
  GUESTBRANDS_COLLECTION_ID,
} from "../../lib/appwrite.config";
import Button from "./Button";

const RegisterForm = ({ onBack }) => {
  // Initialize the client
  const client = new Client();
  client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);

  // Initialize the services
  const account = new Account(client);
  const databases = new Databases(client);
  const navigate = useNavigate(); // useNavigate instead of useRouter
  const [formData, setFormData] = useState({
    contactName: "",
    email: "",
    contactNumber: "+254", // Default to the Kenyan country code
    brandName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^\+254\s?7[0-9]{8}$/;

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

    // Automatically add the Kenyan prefix (+254) to phone number input if missing
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
      // Step 1: Create a user in the Auth system
      const user = await account.create(
        formData.email,
        formData.password,
        "Guest"
      );
      console.log("user id : ", user);

      // Step 3: Create a session for the user after registration
      await account.createEmailPasswordSession(
        formData.email,
        formData.password
      );

      // Ensure the user ID is valid before passing it
      const userId = user.$id;
      if (!/^[a-zA-Z0-9._-]{1,36}$/.test(userId)) {
        throw new Error("Invalid user ID format.");
      }

      // Step 2: Store additional user data in the `guestBrands` collection
      await databases.createDocument(DATABASE_ID, GUESTBRANDS_COLLECTION_ID, {
        userId: userId, // Use the validated userId
        contactName: formData.contactName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        brandName: formData.brandName,
      });

      // Step 4: Redirect the user to their dashboard
      navigate(`/admin/${userId}/dashboard`);

      setSuccessMessage(
        "Registration successful! Redirecting to your dashboard..."
      );
      setFormData({
        contactName: "",
        email: "",
        contactNumber: "+254",
        brandName: "",
        password: "",
        confirmPassword: "",
      });
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
      <div className=" w-full min-w-[90vw] max-w-[90vw] lg:min-w-[50vw] lg:max-w-[50vw] h-full px-6 bg-n-8 border-2 border-color-7 rounded-[2rem] py-4">
        <form onSubmit={handleSubmit} className="w-full">
          {[
            "contactName",
            "email",
            "contactNumber",
            "brandName",
            "password",
            "confirmPassword",
          ].map((field) => (
            <div key={field} className="flex flex-col gap-2 mb-4">
              <label htmlFor={field} className="mb-1 capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                id={field}
                name={field}
                type={field.includes("password") ? "password" : "text"}
                placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                value={formData[field]}
                onChange={handleInputChange}
                className=" h-[3rem] p-4 rounded-[0.5rem] bg-transparent border-2 border-color-7 outline-none"
              />
              {errors[field] && (
                <p className="text-red-500 text-sm">{errors[field]}</p>
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
