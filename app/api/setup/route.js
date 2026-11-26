import { sql } from '@/lib/db';

export async function GET() {
  await sql`CREATE TABLE IF NOT EXISTS dishes (id SERIAL PRIMARY KEY, name TEXT, price NUMERIC, description TEXT, image TEXT)`;
  await sql`CREATE TABLE IF NOT EXISTS bookings (id SERIAL PRIMARY KEY, name TEXT, phone TEXT, guests INT, date TEXT, time TEXT)`;
  return Response.json({ ok: true, message: 'Tables created' });
}
