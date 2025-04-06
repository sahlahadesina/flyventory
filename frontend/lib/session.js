import Cookies from 'js-cookie';  // Import js-cookie for client-side cookie management

export async function createSession(userId) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1);  // Set session expiry to 1 day

  // Set a cookie for the session on the client side using js-cookie
  Cookies.set('session', JSON.stringify({ userId, expiresAt }), {
    expires: 1,  // expires in 1 day
    path: '/',
    secure: process.env.NODE_ENV === 'production',  // Only set secure cookies in production
    sameSite: 'Lax',  // Prevent cross-site request issues
  });
}

export function deleteSession() {
  // Remove the session cookie when logging out
  Cookies.remove('session');
}

export function getSession() {
  // Retrieve the session from the cookies
  const session = Cookies.get('session');
  return session ? JSON.parse(session) : null;
}
