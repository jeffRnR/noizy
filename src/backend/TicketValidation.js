import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// In-memory ticket storage (replace with database in production)
const ticketDatabase = new Map();

// Endpoint to save tickets after purchase
router.post("/tickets", (req, res) => {
  const { tickets } = req.body;

  tickets.forEach((ticket) => {
    ticketDatabase.set(ticket.id, {
      ...ticket,
      isUsed: false,
      scannedAt: null,
    });
  });

  res.status(201).json({ message: "Tickets created successfully" });
});

// Endpoint to validate ticket when scanned
router.post("/tickets/validate", (req, res) => {
  const { ticketId } = req.body;

  const ticket = ticketDatabase.get(ticketId);

  if (!ticket) {
    return res.status(404).json({
      valid: false,
      message: "Ticket not found",
    });
  }

  if (ticket.isUsed) {
    return res.status(400).json({
      valid: false,
      message: "Ticket has already been used",
      scannedAt: ticket.scannedAt,
    });
  }

  const validUntil = new Date(ticket.validUntil);
  if (validUntil < new Date()) {
    return res.status(400).json({
      valid: false,
      message: "Ticket has expired",
    });
  }

  // Mark ticket as used
  ticket.isUsed = true;
  ticket.scannedAt = new Date().toISOString();
  ticketDatabase.set(ticketId, ticket);

  return res.status(200).json({
    valid: true,
    message: "Ticket validated successfully",
    ticketData: {
      type: ticket.ticketType,
      eventId: ticket.eventId,
      validUntil: ticket.validUntil,
    },
  });
});

export default router;
