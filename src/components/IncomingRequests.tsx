"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function IncomingRequests() {

  const { token } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);

  const fetchRequests = async () => {

    try {

      const res = await api.get("/payment/requests", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setRequests(res.data.requests);

    } catch (err) {
      console.error(err);
    }

  };

  const payRequest = async (requestId: string) => {

    try {

      await api.post(
        "/payment/request/pay",
        { requestId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Payment completed");

      fetchRequests();

    } catch (err) {

      console.error(err);
      alert("Payment failed");

    }

  };

  const rejectRequest = async (requestId: string) => {

    try {

      await api.post(
        "/payment/request/reject",
        { requestId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Request rejected");

      fetchRequests();

    } catch (err) {

      console.error(err);
      alert("Reject failed");

    }

  };

  useEffect(() => {

    if (token) {
      fetchRequests();
    }

  }, [token]);

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">

      <h2 className="text-xl font-semibold">
        Incoming Requests
      </h2>

      {requests.length === 0 && (
        <p className="text-gray-500 text-sm">
          No payment requests
        </p>
      )}

      {requests.map((r) => (

        <div
          key={r.id}
          className="border rounded-lg p-4 flex justify-between items-center"
        >

          {/* Request Info */}

          <div>
            <p className="font-semibold">
              {r.requester_name}
            </p>

            <p className="text-sm text-gray-500">
              Requested ₹{r.amount}
            </p>
          </div>

          {/* Buttons */}

          <div className="flex gap-2">

            <button
              onClick={() => payRequest(r.id)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Pay
            </button>

            <button
              onClick={() => rejectRequest(r.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Reject
            </button>

          </div>

        </div>

      ))}

    </div>

  );
}