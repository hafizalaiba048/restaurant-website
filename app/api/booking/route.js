import { neon } from "@neondatabase/serverless";

export async function POST(req) {
  try {
    const body = await req.json();
    const sql = neon(process.env.DATABASE_URL);
    await sql`INSERT INTO bookings (customer_name, phone, guests, booking_date, booking_time) VALUES (${body.customer_name}, ${body.phone}, ${body.guests}, ${body.booking_date}, ${body.booking_time})`;
    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
