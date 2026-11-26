import { sql } from '@/lib/db';
import { cookies } from 'next/headers';

const isAdmin = () => cookies().get('session')?.value === 'admin-logged-in';

export async function GET() {
  if (!isAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const rows = await sql`SELECT * FROM bookings ORDER BY id DESC`;
  return Response.json(rows);
}

export async function POST(req) {
  const { name, phone, guests, date, time } = await req.json();
  const rows = await sql`INSERT INTO bookings (name, phone, guests, date, time) VALUES (${name}, ${phone}, ${guests}, ${date}, ${time}) RETURNING *`;
  return Response.json(rows[0]);
}
