"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({ customer_name: "", phone: "", guests: 2, booking_date: "", booking_time: "19:00" });
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    setMsg("Booking ho rahi hai...");
    const res = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) setMsg("Mubarak Ho! Table Book Ho Gayi ✅");
    else setMsg("Kuch ghalat ho gaya, dobara try karein.");
  }

  const menu = [
    { name: "Chicken Karahi", price: "Rs. 1800", desc: "Desi ghee me bani special karahi" },
    { name: "Chicken Biryani", price: "Rs. 550", desc: "Dum wali Karachi biryani" },
    { name: "Malai Boti", price: "Rs. 950", desc: "Naram aur juicy malai boti" },
    { name: "Zinger Burger", price: "Rs. 750", desc: "Crispy zinger with special sauce" },
  ];

  return (
    <div>
      <div style={{ background: "#8B0000", color: "white", padding: "50px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", margin: 0 }}>🍽️ Laiba Restaurant</h1>
        <p style={{ fontSize: "20px" }}>Zaiqa jo yaad rahe! | Sargodha</p>
        <a href="#book" style={{ background: "white", color: "#8B0000", padding: "12px 25px", borderRadius: "25px", textDecoration: "none", fontWeight: "bold" }}>Table Book Karein</a>
      </div>

      <div style={{ maxWidth: "800px", margin: "30px auto", padding: "0 20px" }}>
        <h2>Our Menu</h2>
        {menu.map((m) => (
          <div key={m.name} style={{ background: "white", padding: "15px", marginBottom: "12px", borderRadius: "12px", display: "flex", justifyContent: "space-between" }}>
            <div><b>{m.name}</b><br /><span style={{ color: "#666" }}>{m.desc}</span></div>
            <b style={{ color: "#8B0000" }}>{m.price}</b>
          </div>
        ))}

        <h2 id="book">Table Book Karein</h2>
        <form onSubmit={submit} style={{ background: "white", padding: "20px", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <input placeholder="Apna Naam" required value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }} />
          <input placeholder="Phone Number" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }} />
          <input type="number" placeholder="Kitne Log?" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }} />
          <input type="date" required value={form.booking_date} onChange={(e) => setForm({ ...form, booking_date: e.target.value })} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }} />
          <input type="time" value={form.booking_time} onChange={(e) => setForm({ ...form, booking_time: e.target.value })} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }} />
          <button style={{ background: "#8B0000", color: "white", padding: "14px", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold" }}>Book Table</button>
          <p>{msg}</p>
        </form>
      </div>
    </div>
  );
}
