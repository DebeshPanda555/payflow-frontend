"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function WalletChart({ transactions }: any) {

  const chartData = transactions
    .slice()
    .reverse()
    .slice(0, 7)
    .map((tx: any) => ({
      date: new Date(tx.created_at).toLocaleDateString(),
      amount: Number(tx.amount)
    }));

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">

      <h2 className="text-lg font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
        Wallet Analytics
      </h2>

      <ResponsiveContainer width="100%" height={240}>

        <LineChart data={chartData}>

          <CartesianGrid
            strokeDasharray="3 3"
            strokeOpacity={0.2}
          />

          <XAxis
            dataKey="date"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />

          <YAxis
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "none",
              borderRadius: "8px",
              color: "#fff"
            }}
          />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}