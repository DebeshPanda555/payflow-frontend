"use client";

import { useState } from "react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import QRScanner from "./QRScanner";
import PaymentSuccessModal from "./PaymentSuccessModal";

export default function SendMoneyCard({ refresh }: any) {

  const { token } = useAuth();

  const [type, setType] = useState("email");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleScan = (data: string) => {

    try {

      if (data.startsWith("upi://")) {

        const url = new URL(data);

        const upiId = url.searchParams.get("pa");
        const qrAmount = url.searchParams.get("am");

        if (upiId) {
          setReceiver(upiId);
          setType("upi");
        }

        if (qrAmount) {
          setAmount(qrAmount);
        }

      } else {

        setReceiver(data);
        setType("upi");

      }

    } catch {

      setReceiver(data);

    }

    setShowScanner(false);
  };

  const sendMoney = async () => {

    if (!receiver || !amount) {
      alert("Please fill all fields");
      return;
    }

    if (Number(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    try {

      setLoading(true);

      const idempotencyKey = crypto.randomUUID();

      await api.post(
        "/payment/send",
        {
          type,
          value: receiver,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Idempotency-Key": idempotencyKey
          },
        }
      );

      setSuccessOpen(true);

      setReceiver("");
      setAmount("");

      if (refresh) refresh();

    } catch (err) {

      console.error(err);
      alert("Payment failed");

    } finally {

      setLoading(false);

    }

  };

  return (
    <>

      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-5 card-hover">

        <h2 className="text-xl font-semibold">
          Send Money
        </h2>

        {/* PAYMENT TYPE */}

        <select
          className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="email">Send via Email</option>
          <option value="phone">Send via Mobile Number</option>
          <option value="upi">Send via UPI ID</option>
        </select>


        {/* SCAN QR */}

        <button
          onClick={() => setShowScanner(true)}
          className="w-full bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition"
        >
          Scan QR Code
        </button>


        {/* RECEIVER INPUT */}

        <input
          type="text"
          placeholder={
            type === "email"
              ? "Receiver Email"
              : type === "phone"
              ? "Mobile Number"
              : "UPI ID"
          }
          className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />


        {/* AMOUNT */}

        <input
          type="number"
          placeholder="Amount"
          className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />


        {/* SEND BUTTON */}

        <button
          onClick={sendMoney}
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Send Payment"}
        </button>


        {/* QR SCANNER */}

        {showScanner && (
          <QRScanner
            onScan={handleScan}
            onClose={() => setShowScanner(false)}
          />
        )}

      </div>


      {/* SUCCESS MODAL */}

      <PaymentSuccessModal
        open={successOpen}
        amount={amount}
        onClose={() => setSuccessOpen(false)}
      />

    </>
  );
}