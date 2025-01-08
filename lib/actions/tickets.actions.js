import { storage, QR_CODES_BUCKET_ID, ID } from "./appwriteConfig";
import QRCode from "qrcode";
import html2canvas from "html2canvas";

export const generateTicketPDF = async (ticketData, eventDetails) => {
  // Generate base64 QR code
  const qrCodeDataUrl = await QRCode.toDataURL(
    JSON.stringify({
      ticketId: ticketData.id,
      eventId: ticketData.eventId,
      type: ticketData.ticketType,
      validUntil: ticketData.validUntil,
    })
  );

  // Create HTML template for the ticket
  const ticketHTML = `
    <div style="width: 300px; padding: 20px; border: 1px solid #000;">
      <h2>${eventDetails.title}</h2>
      <p>Date: ${eventDetails.date}</p>
      <p>Venue: ${eventDetails.venue}</p>
      <p>Ticket Type: ${ticketData.ticketType}</p>
      <p>Ticket ID: ${ticketData.id.slice(0, 8)}</p>
      <p>Valid Until: ${new Date(
        ticketData.validUntil
      ).toLocaleDateString()}</p>
      <img src="${qrCodeDataUrl}" width="150" height="150" />
    </div>
  `;

  // Create a temporary container and insert the HTML
  const container = document.createElement("div");
  container.innerHTML = ticketHTML;
  document.body.appendChild(container);

  // Convert HTML to canvas
  const canvas = await html2canvas(container.firstChild);
  document.body.removeChild(container);

  // Convert canvas to blob
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png")
  );

  // Upload to Appwrite Storage
  try {
    const result = await storage.createFile(
      QR_CODES_BUCKET_ID,
      ID.unique(),
      blob
    );

    // Get the file URL
    const fileUrl = storage.getFileView(QR_CODES_BUCKET_ID, result.$id);

    return {
      fileId: result.$id,
      fileUrl,
    };
  } catch (error) {
    console.error("Error uploading ticket to Appwrite:", error);
    throw error;
  }
};
