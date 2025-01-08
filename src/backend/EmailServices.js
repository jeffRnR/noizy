import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { generateTicketPDF } from "./appwrite-storage-service";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const ticketsDatabase = new Map();

export const generateAndSendTicket = async (req, res) => {
  try {
    const { email, eventDetails, tickets } = req.body;

    // Generate tickets and upload to Appwrite
    const ticketPromises = tickets.map(async (ticket) => {
      // Generate and upload ticket to Appwrite
      const { fileId, fileUrl } = await generateTicketPDF(ticket, eventDetails);

      // Save ticket info to database
      const ticketInfo = {
        ...ticket,
        fileId,
        fileUrl,
        scanned: false,
        purchaseDate: new Date().toISOString(),
      };

      ticketsDatabase.set(ticket.id, ticketInfo);

      return ticketInfo;
    });

    const processedTickets = await Promise.all(ticketPromises);

    // Create email HTML with download links
    const ticketsHtml = processedTickets
      .map(
        (ticket, index) => `
            <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
                <h2>Ticket #${index + 1} - ${ticket.ticketType}</h2>
                <p>Ticket ID: ${ticket.id.slice(0, 8)}</p>
                <p>Valid until: ${new Date(
                  ticket.validUntil
                ).toLocaleDateString()}</p>
                <p>Event: ${eventDetails.title}</p>
                <p>Venue: ${eventDetails.venue}</p>
                <p>Date: ${eventDetails.date}</p>
                <p><a href="${
                  ticket.fileUrl
                }" download="ticket_${ticket.id.slice(0, 8)}.png" 
                    style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                    Download Ticket
                </a></p>
            </div>
        `
      )
      .join("");

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Tickets for ${eventDetails.title}`,
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1>Your Tickets for ${eventDetails.title}</h1>
                    <p>Thank you for your purchase! Below are your tickets:</p>
                    ${ticketsHtml}
                    <p>Please download and save your tickets. You can also access them from your account dashboard.</p>
                    <p>Important Notes:</p>
                    <ul>
                        <li>Please arrive at least 30 minutes before the event</li>
                        <li>Each ticket can only be used once</li>
                        <li>Keep your tickets private and do not share them</li>
                    </ul>
                </div>
            `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Tickets generated and email sent successfully",
      tickets: processedTickets.map((ticket) => ({
        id: ticket.id,
        type: ticket.ticketType,
        validUntil: ticket.validUntil,
        fileUrl: ticket.fileUrl,
      })),
    });
  } catch (error) {
    console.error("Error processing tickets:", error);
    res.status(500).json({
      success: false,
      message: "Error processing tickets and sending email",
      error: error.message,
    });
  }
};
