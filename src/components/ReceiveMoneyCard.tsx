"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useState, useEffect } from "react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function ReceiveMoneyCard() {

  const { token } = useAuth();

  const [upiId, setUpiId] = useState("");
  const [name, setName] = useState("");

  const fetchProfile = async () => {
    try {

      const res = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUpiId(res.data.user.upi_id);
      setName(res.data.user.name);

    } catch (err) {

      console.error(err);

    }
  };

  useEffect(() => {

    if (token) {
      fetchProfile();
    }

  }, [token]);

  // Real UPI style QR payload
  const upiPayload = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}`;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-96 space-y-5 text-center">

      <h2 className="text-xl font-semibold">
        Receive Money
      </h2>

      <p className="text-gray-500">
        Let others scan this QR to send you money
      </p>

      {upiId ? (
        <>
          <div className="flex justify-center">

            <QRCodeCanvas
              value={upiPayload}
              size={220}
            />

          </div>

          <div className="bg-gray-100 p-3 rounded-lg text-sm">
            {upiId}
          </div>

          <p className="text-gray-500 text-sm">
            {name}
          </p>

        </>
      ) : (
        <p className="text-gray-400">Loading QR...</p>
      )}

    </div>
  );
}