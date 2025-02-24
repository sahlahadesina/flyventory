import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// Validate and retrieve secret key
const secretKey = process.env.SESSION_SECRET;

if (!secretKey) {
  throw new Error("SESSION_SECRET is not defined in environment variables.");
}

const encodedKey = new TextEncoder().encode(secretKey);

/**
 * Creates a user session and stores it in cookies
 * @param {string} userId - The ID of the user
 */
export async function createSession(userId) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days expiration
  const session = await encrypt({ userId, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

/**
 * Deletes the user session
 */
export async function deleteSession() {
  cookies().delete("session");
}

/**
 * Encrypts a session payload using JWT
 * @param {Object} payload - The data to encrypt
 * @returns {Promise<string>} - The encrypted JWT token
 */
export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

/**
 * Decrypts a session token
 * @param {string} session - The JWT session token
 * @returns {Promise<Object|null>} - The decrypted payload or null if verification fails
 */
export async function decrypt(session = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify session:", error.message);
    return null;
  }
}
