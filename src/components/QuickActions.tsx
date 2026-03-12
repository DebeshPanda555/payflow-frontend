"use client";

import { Send, HandCoins, QrCode, Download } from "lucide-react";

export default function QuickActions() {

  const actions = [
    {
      name: "Send",
      icon: Send,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/40",
      link: "#send"
    },
    {
      name: "Request",
      icon: HandCoins,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/40",
      link: "#request"
    },
    {
      name: "Scan QR",
      icon: QrCode,
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/40",
      link: "#send"
    },
    {
      name: "Receive",
      icon: Download,
      color: "text-orange-600",
      bg: "bg-orange-100 dark:bg-orange-900/40",
      link: "#receive"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h2 className="text-lg font-semibold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {actions.map((action, i) => {

          const Icon = action.icon;

          return (
            <a
              key={i}
              href={action.link}
              className={`flex flex-col items-center justify-center gap-2 p-6 rounded-xl transition hover:scale-105 hover:shadow-md ${action.bg}`}
            >
              <Icon className={`w-6 h-6 ${action.color}`} />
              <span className="text-sm font-medium">
                {action.name}
              </span>
            </a>
          );

        })}

      </div>

    </div>
  );
}