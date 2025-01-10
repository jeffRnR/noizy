import { Client, Databases, Account, Storage, ID } from "appwrite";
import QRCode from "qrcode";
import html2canvas from "html2canvas";

// Environment variables for configuration
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const LINEUP_COLLECTION_ID = import.meta.env.VITE_LINEUP_COLLECTION_ID;
const TICKETS_COLLECTION_ID = import.meta.env.VITE_TICKETS_COLLECTION_ID;
const EVENTS_COLLECTION_ID = import.meta.env.VITE_EVENTS_COLLECTION_ID;
const QR_CODES_BUCKET_ID = import.meta.env.VITE_QR_CODES_BUCKET_ID;
const GUESTBRANDS_COLLECTION_ID = import.meta.env
  .VITE_GUESTBRANDS_COLLECTION_ID;

// Ensure environment variables are defined
if (!ENDPOINT || !PROJECT_ID) {
  throw new Error(
    "Environment variables VITE_API_ENDPOINT and VITE_PROJECT_ID must be defined."
  );
}

// Create a single Appwrite client instance
const client = new Client();
client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);

// Initialize services
const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

// Export variables and services
export {
  PROJECT_ID,
  ENDPOINT,
  DATABASE_ID,
  LINEUP_COLLECTION_ID,
  EVENTS_COLLECTION_ID,
  TICKETS_COLLECTION_ID,
  GUESTBRANDS_COLLECTION_ID,
  QR_CODES_BUCKET_ID,
  databases,
  account,
  storage,
  ID,
};
