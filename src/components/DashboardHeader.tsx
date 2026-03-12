"use client";

import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function DashboardHeader() {

  const { token } = useAuth();

  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {

    try {

      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(res.data.user);

    } catch (err) {

      console.error(err);

    }

  };

  useEffect(() => {

    if (token) fetchUser();

  }, [token]);

  return (

    <div className="flex items-center justify-between">

      {/* Greeting */}

      <div>

        <h1 className="text-2xl font-bold">

          {user ? `Welcome back, ${user.name} 👋` : "Welcome 👋"}

        </h1>

        <p className="text-gray-500">
          Here is your wallet summary
        </p>

      </div>


      {/* Right side */}

      <div className="flex items-center gap-5">

        {/* Notification icon */}

        <div className="relative cursor-pointer">

          <Bell className="text-gray-600 hover:text-black transition" size={22} />

          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>

        </div>


        {/* Avatar */}

        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">

          {user?.name?.charAt(0).toUpperCase() || "U"}

        </div>

      </div>

    </div>

  );

}
