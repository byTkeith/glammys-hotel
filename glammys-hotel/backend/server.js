const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const bookings = [];

app.post("/api/book", (req, res) => {
  const { room, date, customer } = req.body;
  if (!room || !date || !customer) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  bookings.push({ room, date, customer });
  res.json({ success: true, message: "Booking successful!" });
});

const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = "whatsapp:" + process.env.TWILIO_WHATSAPP_NUMBER;
const client = twilio(accountSid, authToken);

app.post("/api/notify-whatsapp", async (req, res) => {
  const { room, date, customer, phone } = req.body;
  if (!room || !date || !customer || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const message = await client.messages.create({
      from: twilioNumber,
      to: `whatsapp:${phone}`,
      body: `New Booking: ${room} on ${date} by ${customer}.`,
    });
    res.json({ success: true, messageSid: message.sid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});