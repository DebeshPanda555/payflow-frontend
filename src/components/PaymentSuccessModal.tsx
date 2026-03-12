"use client";

import { CheckCircle } from "lucide-react";

export default function PaymentSuccessModal({
  open,
  amount,
  onClose
}: any) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-2xl p-10 w-96 text-center animate-[scaleIn_0.3s_ease]">

        {/* SUCCESS ICON */}

        <div className="flex justify-center mb-4">

          <div className="bg-green-100 p-5 rounded-full animate-bounce">

            <CheckCircle
              size={40}
              className="text-green-600"
            />

          </div>

        </div>

        {/* TEXT */}

        <h2 className="text-2xl font-bold mb-2">
          Payment Successful
        </h2>

        <p className="text-gray-500 mb-6">
          ₹{amount} sent successfully
        </p>

        {/* BUTTON */}

        <button
          onClick={onClose}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Done
        </button>

      </div>

    </div>

  );

}