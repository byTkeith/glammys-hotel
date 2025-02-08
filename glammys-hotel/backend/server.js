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