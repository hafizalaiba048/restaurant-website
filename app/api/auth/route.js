import { cookies } from 'next/headers';

export async function POST(req) {
  const { password } = await req.json();
  if (password === 'admin123') {
    cookies().set('session', 'admin-logged-in', { path: '/', httpOnly: true });
    return Response.json({ ok: true });
  }
  return Response.json({ error: 'Wrong password' }, { status: 401 });
}

export async function DELETE() {
  cookies().delete('session');
  return Response.json({ ok: true });
}
