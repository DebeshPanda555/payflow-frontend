"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function PaymentRequestsCard({ refresh }: any) {

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

      fetchRequests();
      if (refresh) refresh();

    } catch (err) {

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

      fetchRequests();

    } catch (err) {

      alert("Failed to reject request");

    }

  };

  useEffect(() => {

    if (token) {
      fetchRequests();
    }

  }, [token]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-96 space-y-4">

      <h2 className="text-xl font-semibold">
        Payment Requests
      </h2>

      {requests.length === 0 && (
        <p className="text-gray-400 text-sm">
          No pending requests
        </p>
      )}

      {requests.map((req) => (

        <div
          key={req.id}
          className="border rounded-lg p-3 flex justify-between items-center"
        >

          <div>

            <p className="font-medium">
              {req.requester_name}
            </p>

            <p className="text-sm text-gray-500">
              ₹{req.amount}
            </p>

          </div>

          {req.status === "pending" && (

            <div className="flex gap-2">

              <button
                onClick={() => payRequest(req.id)}
                className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Pay
              </button>

              <button
                onClick={() => rejectRequest(req.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Reject
              </button>

            </div>

          )}

        </div>

      ))}

    </div>
  );
}