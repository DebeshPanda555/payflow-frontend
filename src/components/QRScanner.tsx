"use client";

import { Scanner } from "@yudiel/react-qr-scanner";

export default function QRScanner({ onScan, onClose }: any) {

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-xl shadow-xl w-[350px]">

        <h2 className="text-lg font-semibold mb-4 text-center">
          Scan QR Code
        </h2>

        <Scanner
          onScan={(result) => {
            if (result?.[0]?.rawValue) {
              onScan(result[0].rawValue);
              onClose();
            }
          }}
          constraints={{ facingMode: "environment" }}
        />

        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white p-2 rounded-lg"
        >
          Close
        </button>

      </div>

    </div>
  );
}