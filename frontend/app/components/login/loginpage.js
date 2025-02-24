"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";
import Image from "next/image";

export function Login() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/Drone_website.jpg')] bg-cover bg-center">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <Image src="/imgs.png" alt="Logo" width={250} height={120} />
        </div>

        <form action={loginAction} className="mt-6 space-y-4">
          {/* Email Input */}
          <div className="mt-6 space-y-4">
            <input
              id="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="mt-6 space-y-4">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className= "w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors?.password && <p className="text-red-500">{state.errors.password}</p>}
          </div>

          {/* Drone ID Input */}
          <div className="mt-6 space-y-4">
            <input
              id="droneID"
              name="droneID"
              type="text"
              placeholder="Drone ID"
              className=   "w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4 space-x-4">
            <SubmitButton />
              <button    type="button"    className="w-auto px-8 py-4 text-lg rounded-full bg-[#2D63B3] text-white hover:bg-[#2557AD] transition"
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
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="w-auto px-8 py-4 text-lg rounded-full bg-[#2D63B3] text-white hover:bg-[#2557AD] transition"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}
