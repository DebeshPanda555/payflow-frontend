"use client";

import { useState } from "react";
import { Wallet } from "lucide-react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function BalanceCard({ balance }: { balance: number }) {

  const { token } = useAuth();

  const [amount, setAmount] = useState("");

  const addMoney = async () => {

    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }

    try {

      await api.post(
        "/wallet/add",
        { amount: Number(amount) },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Money added successfully");

      window.location.reload();

    } catch (err) {

      console.error(err);
      alert("Failed to add money");

    }

  };

  return (

    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl p-8 shadow-xl wallet-glow card-hover animate-float">

      {/* HEADER */}

      <div className="flex items-center gap-3">

        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">

          <Wallet size={26} />

        </div>

        <h2 className="text-lg opacity-80">
          Wallet Balance
        </h2>

      </div>


      {/* BALANCE */}

      <h1 className="text-5xl font-bold mt-4 tracking-wide">
        ₹ {balance}
      </h1>


      {/* ADD MONEY */}

      <div className="mt-8 flex gap-4 items-center">

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-4 py-2 rounded-lg w-36 text-black border-none outline-none shadow-inner"
        />

        <button
          onClick={addMoney}
          className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-semibold btn-magnetic ripple hover:shadow-lg transition"
        >
          Add Money
        </button>

      </div>

    </div>

  );

}