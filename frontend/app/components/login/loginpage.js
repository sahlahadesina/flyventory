"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { z } from "zod";
import { login } from "./actions";

// Zod schema for local validation
const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const newErrors = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    const response = await login(formData);

    if (response?.errors) {
      setLoginError(response.errors.username?.[0] || "Login failed.");
    } else {
      router.push("/database-table");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/Drone_website.jpg')] bg-cover bg-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <Image src="/imgs.png" alt="Logo" width={250} height={120} />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <input
              id="username"
              name="username"
              placeholder="Username"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}
          </div>

          <div className="space-y-2">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>

          {loginError && <p className="text-red-500 mt-2">{loginError}</p>}

          <div className="flex justify-between mt-4 space-x-4">
            <SubmitButton />
            <button
              type="button"
              className="w-auto px-8 py-4 text-lg rounded-full bg-[#2D63B3] text-white hover:bg-[#2557AD] transition"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  return (
    <button
      type="submit"
      className="w-auto px-8 py-4 text-lg rounded-full bg-[#2D63B3] text-white hover:bg-[#2557AD] transition"
    >
      Login
    </button>
  );
}
