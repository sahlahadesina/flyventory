"use server";

import { z } from "zod";
import axios from "axios";
import { createSession, deleteSession } from "../../../lib/session";
import { redirect } from "next/navigation";

// Zod validation schema
const loginSchema = z.object({
  username: z.string().trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).trim(),
});

/**
 * Login action (server-side)
 */
export async function login(prevState, formData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  try {
    const response = await axios.post("http://localhost:8000/api/employee/", {
      email,
      password,
    });

    const { token, user } = response.data;

    // Store token in session or cookie (adjust depending on your auth strategy)
    await createSession({
      token,
      userId: user.id,
      email: user.email,
    });

    return redirect("/database-table");
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);

    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }
}

/**
 * Logout action
 */
export async function logout() {
  await deleteSession();
  return redirect("/login");
}
