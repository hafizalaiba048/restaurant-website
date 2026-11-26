import { sql } from '@/lib/db';
import { cookies } from 'next/headers';

const isAdmin = () => cookies().get('session')?.value === 'admin-logged-in';

export async function GET() {
  const rows = await sql`SELECT * FROM dishes ORDER BY id DESC`;
  return Response.json(rows);
}

export async function POST(req) {
  if (!isAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { name, price, description, image } = await req.json();
  const rows = await sql`INSERT INTO dishes (name, price, description, image) VALUES (${name}, ${price}, ${description}, ${image}) RETURNING *`;
  return Response.json(rows[0]);
}

export async function DELETE(req) {
  if (!isAdmin()) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  await sql`DELETE FROM dishes WHERE id = ${id}`;
  return Response.json({ ok: true });
}
