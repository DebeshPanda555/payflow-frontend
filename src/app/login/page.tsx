"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {

  const router = useRouter();
  const { setToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const res = await api.post("/auth/login", {
        email,
        password
      });

      setToken(res.data.token);

      router.push("/dashboard");

    } catch {

      alert("Invalid credentials");

    }

  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700">

      {/* LEFT ILLUSTRATION PANEL */}

      <div className="hidden md:flex w-1/2 flex-col items-center justify-center text-white p-16 space-y-8">

        <img
          src="/Online world-cuate.svg"
          alt="Login Illustration"
          className="w-[420px] animate-float"
        />

        <div className="text-center space-y-4">

          <h1 className="text-5xl font-bold">
            PayFlow
          </h1>

          <p className="text-lg opacity-90 max-w-md">
            Send money instantly, track transactions,
            and manage your digital wallet effortlessly.
          </p>

        </div>

      </div>


      {/* RIGHT LOGIN PANEL */}

      <div className="flex w-full md:w-1/2 items-center justify-center">

        <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-10 w-96 space-y-6">

          <h2 className="text-2xl font-bold text-white text-center">
            Welcome Back
          </h2>

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


          {/* LOGIN BUTTON */}

          <button
            onClick={login}
            className="w-full bg-white text-blue-700 font-semibold p-3 rounded-lg hover:scale-105 transition transform duration-200"
          >
            Login
          </button>


          {/* SIGNUP LINK */}

          <p className="text-center text-white text-sm">
            Don't have an account?

            <Link
              href="/signup"
              className="underline ml-1 hover:text-blue-200"
            >
              Sign up
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}