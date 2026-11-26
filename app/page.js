'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [dishes, setDishes] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', guests: 2, date: '', time: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/dishes').then(r => r.json()).then(d => setDishes(d));
  }, []);

  async function book(e) {
    e.preventDefault();
    const res = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { setMsg('Thank You! Your Table is Booked!'); setForm({ name: '', phone: '', guests: 2, date: '', time: '' }); }
    else setMsg('Something went wrong, please try again');
  }

  return (
    <div style={{ fontFamily: 'Arial', background: '#fff8f0', minHeight: '100vh' }}>
      <div style={{ background: '#1a1a1a', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', margin: 0 }}>Laiba Restaurant</h1>
        <p style={{ fontSize: '20px', color: '#ffb703' }}>Taste You Will Remember | Sargodha</p>
        <p>Desi Food | Fast Food | Family Hall</p>
        <a href="#book" style={{ background: '#ffb703', color: 'black', padding: '12px 25px', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>Book A Table</a>
      </div>

      <div style={{ maxWidth: '900px', margin: '30px auto', padding: '0 15px' }}>
        <h2 style={{ textAlign: 'center' }}>Our Special Menu</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {dishes.length === 0 ? <p style={{ textAlign: 'center' }}>Menu is loading...</p> : dishes.map(d => (
            <div key={d.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 10px #ddd' }}>
              <h3 style={{ margin: '0 0 5px' }}>{d.name}</h3>
              <p style={{ color: '#666', margin: '0 0 10px' }}>{d.description}</p>
              <b style={{ color: '#e63946', fontSize: '18px' }}>Rs. {d.price}</b>
            </div>
          ))}
        </div>

        <div id="book" style={{ background: 'white', padding: '25px', borderRadius: '15px', marginTop: '40px', boxShadow: '0 2px 15px #ddd' }}>
          <h2 style={{ textAlign: 'center' }}>Book A Table</h2>
          <form onSubmit={book} style={{ display: 'grid', gap: '12px' }}>
            <input placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
            <input placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
            <input type="number" placeholder="How Many People?" value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
            <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
            <button style={{ background: '#e63946', color: 'white', padding: '14px', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold' }}>Book Now</button>
          </form>
          {msg && <p style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>{msg}</p>}
        </div>
        <p style={{ textAlign: 'center', marginTop: '30px', color: '#888' }}>© 2026 Laiba Restaurant - Sargodha | Made by Hafiza Laiba</p>
      </div>
    </div>
  );
}
