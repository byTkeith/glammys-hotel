import { useState } from "react";

function App() {
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    const response = await fetch("http://localhost:5000/api/notify-whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room, date, customer, phone: "+27834737561" }),
    });
  
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h1>Glammys Executive Suites</h1>
      <input placeholder="Room" onChange={(e) => setRoom(e.target.value)} />
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <input placeholder="Your Name" onChange={(e) => setCustomer(e.target.value)} />
      <button onClick={handleBooking}>Book Now</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
