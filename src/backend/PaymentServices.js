// paymentService.js

import axios from "axios";

// Replace these constants with your actual values
const CONSUMER_KEY = "YOUR_CONSUMER_KEY";
const CONSUMER_SECRET = "YOUR_CONSUMER_SECRET";
const SHORTCODE = "YOUR_SHORTCODE"; // The shortcode for your business
const LIPA_NA_MPESA_URL =
  "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"; // Use the sandbox URL for testing
const VALIDATE_URL = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"; // Use the sandbox URL for testing
const USERNAME = "YOUR_USERNAME"; // Use your API credentials
const PASSWORD = "YOUR_PASSWORD"; // Use your API credentials

// Function to authenticate and get the access token
const getAccessToken = async () => {
  const response = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      auth: {
        username: CONSUMER_KEY,
        password: CONSUMER_SECRET,
      },
    }
  );

  return response.data.access_token;
};

// Function to process payment
export const processPayment = async (amount, phoneNumber) => {
  const accessToken = await getAccessToken();

  const payload = {
    BusinessShortCode: SHORTCODE,
    Password: Buffer.from(
      `${SHORTCODE}${PASSWORD}${new Date()
        .toISOString()
        .substr(0, 19)
        .replace(/[-:]/g, "")}`
    ).toString("base64"),
    // Use the above line for encoding
    Timestamp: new Date().toISOString().substr(0, 19).replace(/[-:]/g, ""),
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phoneNumber, // Customer's phone number
    PartyB: SHORTCODE,
    PhoneNumber: phoneNumber,
    CallBackURL: "https://example.com/callback", // Set your callback URL
    AccountReference: "NoizyNightTickets",
    TransactionDesc: `Payment for Noizy Night tickets`,
  };

  const response = await axios.post(LIPA_NA_MPESA_URL, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

// Function to update the number of tickets purchased
export const updateTicketCount = (eventId, ticketId, quantity) => {
  // You should implement your logic to update the purchased ticket count here
  // This could be a call to your database or state management
  console.log(
    `Updating ticket count for event ${eventId}, ticket ${ticketId}, quantity ${quantity}`
  );
  // Example implementation:
  // purchasedTickets[eventId][ticketId] += quantity;
};
