"use client";

import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function ActivityFeed({ transactions }: any) {

  const { token } = useAuth();

  let userId = "";

  if (token) {
    const decoded: any = jwtDecode(token);
    userId = decoded.userId;
  }

  const recent = transactions.slice(0,5);

  return (

    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">

      <h2 className="text-lg font-semibold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {recent.length === 0 && (
          <p className="text-gray-400 text-sm">
            No recent transactions
          </p>
        )}

        {recent.map((tx: any) => {

          const isSent = tx.sender_id === userId;

          return (

            <div
              key={tx.id}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition"
            >

              <div className="flex items-center gap-4">

                <div
                  className={`p-3 rounded-full ${
                    isSent
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >

                  {isSent ? (
                    <ArrowUpRight size={18} />
                  ) : (
                    <ArrowDownLeft size={18} />
                  )}

                </div>

                <div>

                  <p className="font-medium">
                    {isSent ? "Money Sent" : "Money Received"}
                  </p>

                  <p className="text-xs text-gray-400">
                    {new Date(tx.created_at).toLocaleString()}
                  </p>

                </div>

              </div>

              <div
                className={`font-semibold ${
                  isSent ? "text-red-600" : "text-green-600"
                }`}
              >
                {isSent ? "-" : "+"} ₹{tx.amount}
              </div>

            </div>

          );

        })}

      </div>

    </div>

  );
}