import axios from "axios";
import { z } from "zod";
import { createSession, deleteSession } from "../../../lib/session";
import { redirect } from "next/navigation";
import { useRouter } from 'next/router';

// Validation schema for username/password
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export async function login(formData) {
  const result = loginSchema.safeParse(formData);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { username, password } = result.data;

  try {
    const res = await axios.post("http://localhost:8000/api/login/", {
      Username: username,
      Password: password,
    });

    const { user } = res.data;
    await createSession(user.username);

    return { success: true };
  } catch (err) {
    console.error("Login failed:", err?.response?.data || err.message);
    return {
      errors: {
        username: ["Invalid username or password"],
      },
    };
  }
}
export async function logout() {
  await deleteSession();  // Remove session on logout
  return redirect("/login");  // Redirect to login page after logout
}
