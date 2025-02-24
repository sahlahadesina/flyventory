"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../../../lib/session";
import { redirect } from "next/navigation";

// Test user (replace this with a real database check)
const testUser = {
  id: "1",
  email: "aaminah.arif@flyventory.io",
  password: "12345678",
};

// Zod schema for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).trim(),
});

/**
 * Handles user login
 * @param {Object} prevState - The previous state (optional)
 * @param {FormData} formData - The login form data
 * @returns {Object} - Error messages (if any)
 */
export async function login(prevState, formData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(testUser.id);

  return redirect("/database-table"); // Ensure this return statement is used
}

/**
 * Handles user logout
 */
export async function logout() {
  await deleteSession();
  return redirect("/database-table"); // Ensure this return statement is used
}
