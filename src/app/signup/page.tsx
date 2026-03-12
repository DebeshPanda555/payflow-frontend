"use client";

import { useState } from "react";
import { Mail, Lock, User, Phone } from "lucide-react";
import api from "../../lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [upiId, setUpiId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signup = async () => {

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      await api.post("/auth/signup", {
        name,
        email,
        phone,
        upi_id: upiId,
        password
      });

      alert("Account created successfully");

      router.push("/login");

    } catch {

      alert("Signup failed");

    }

  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700">

      {/* LEFT ILLUSTRATION */}

      <div className="hidden md:flex w-1/2 flex-col items-center justify-center text-white p-16 space-y-8">

        <img
          src="/Online world-cuate.svg"
          alt="Signup Illustration"
          className="w-[420px] animate-float"
        />

        <div className="text-center space-y-4">

          <h1 className="text-5xl font-bold">
            Join PayFlow
          </h1>

          <p className="text-lg opacity-90 max-w-md">
            Create your digital wallet and start sending
            money instantly with a secure payment system.
          </p>

        </div>

      </div>


      {/* RIGHT SIGNUP PANEL */}

      <div className="flex w-full md:w-1/2 items-center justify-center">

        <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-10 w-96 space-y-6">

          <h2 className="text-2xl font-bold text-white text-center">
            Create Account
          </h2>

          {/* NAME */}

          <div className="relative">

            <User className="absolute left-3 top-3 text-white opacity-70" />

            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>


          {/* EMAIL */}

          <div className="relative">

            <Mail className="absolute left-3 top-3 text-white opacity-70" />

            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>


          {/* PHONE */}

          <div className="relative">

            <Phone className="absolute left-3 top-3 text-white opacity-70" />

            <input
              type="text"
              placeholder="Mobile Number"
              className="w-full pl-10 p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

          </div>


          {/* UPI ID */}

          <div className="relative">

            <User className="absolute left-3 top-3 text-white opacity-70" />

            <input
              type="text"
              placeholder="UPI ID (example@payflow)"
              className="w-full pl-10 p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />

          </div>


          {/* PASSWORD */}

          <div className="relative">

            <Lock className="absolute left-3 top-3 text-white opacity-70" />

            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="relative">

            <Lock className="absolute left-3 top-3 text-white opacity-70" />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-10 p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

          </div>


          {/* SIGNUP BUTTON */}

          <button
            onClick={signup}
            className="w-full bg-white text-blue-700 font-semibold p-3 rounded-lg hover:scale-105 transition transform duration-200"
          >
            Create Account
          </button>


          {/* LOGIN LINK */}

          <p className="text-center text-white text-sm">

            Already have an account?

            <Link
              href="/login"
              className="underline ml-1 hover:text-blue-200"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}