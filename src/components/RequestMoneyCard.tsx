"use client";

import { useState } from "react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function RequestMoneyCard({ refresh }: any) {

  const { token } = useAuth();

  const [type, setType] = useState("phone");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  const requestMoney = async () => {

    if (!receiver || !amount) {
      alert("Please fill all fields");
      return;
    }

    if (Number(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    try {

      await api.post(
        "/payment/request",
        {
          type,
          value: receiver,
          amount: Number(amount)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Payment request sent");

      setReceiver("");
      setAmount("");

      if (refresh) refresh();

    } catch (err) {

      console.error(err);
      alert("Failed to send request");

    }

  };

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8 space-y-5 w-full">

      <h2 className="text-xl font-semibold">
        Request Money
      </h2>

      {/* REQUEST TYPE */}

      <select
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="phone">Request via Mobile Number</option>
        <option value="upi">Request via UPI ID</option>
      </select>

      {/* RECEIVER INPUT */}

      <input
        type="text"
        placeholder={
          type === "phone"
            ? "Enter Mobile Number"
            : "Enter UPI ID"
        }
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />

      {/* AMOUNT */}

      <input
        type="number"
        placeholder="Amount"
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* BUTTON */}

      <button
        onClick={requestMoney}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3 rounded-lg hover:opacity-90 transition"
      >
        Request Payment
      </button>

    </div>

  );

}