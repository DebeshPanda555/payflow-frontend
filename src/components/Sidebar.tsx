"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar() {

  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Transactions", path: "/transactions" },
    { name: "Wallet", path: "/dashboard" },
  ];

  return (

    <div className="w-64 min-h-screen bg-white shadow-xl p-6 flex flex-col">

      <h1 className="text-2xl font-bold mb-10 text-indigo-600">
        PayFlow
      </h1>

      <nav className="flex flex-col gap-4">

        {menu.map((item) => (

          <Link
            key={item.name}
            href={item.path}
            className={`p-3 rounded-lg transition ${
              pathname === item.path
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {item.name}
          </Link>

        ))}

      </nav>

      <div className="mt-auto space-y-4">

    

        <Link
          href="/login"
          className="text-red-500 hover:underline"
        >
          Logout
        </Link>

      </div>

    </div>

  );
}