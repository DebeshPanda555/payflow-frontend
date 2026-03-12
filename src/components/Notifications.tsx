"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

export default function Notifications() {

  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-gray-200"
      >
        <Bell size={22} />
      </button>

      {open && (

        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl p-4">

          <p className="font-semibold mb-2">
            Notifications
          </p>

          <p className="text-sm text-gray-500">
            No new notifications
          </p>

        </div>

      )}

    </div>
  );
}