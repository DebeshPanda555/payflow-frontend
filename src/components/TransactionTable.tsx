"use client";

import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function TransactionTable({ transactions }: any) {

  const { token } = useAuth();

  let userId = "";

  if (token) {
    const decoded: any = jwtDecode(token);
    userId = decoded.userId;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-lg font-semibold mb-4">
        Recent Transactions
      </h2>

      <table className="w-full text-sm">

        <thead className="text-gray-500 border-b">

          <tr>
            <th className="text-left py-2">Type</th>
            <th className="text-left py-2">Amount</th>
            <th className="text-left py-2">Status</th>
            <th className="text-left py-2">Date</th>
          </tr>

        </thead>

        <tbody>

          {transactions.map((tx: any) => {

            const isOutgoing = tx.sender_id === userId;

            return (

              <tr key={tx.id} className="border-b">

                {/* TYPE */}

                <td className="py-3">

                  {isOutgoing ? (
                    <span className="text-red-500 font-medium">
                      Sent
                    </span>
                  ) : (
                    <span className="text-green-600 font-medium">
                      Received
                    </span>
                  )}

                </td>

                {/* AMOUNT */}

                <td className="py-3">

                  <span
                    className={
                      isOutgoing
                        ? "text-red-500 font-semibold"
                        : "text-green-600 font-semibold"
                    }
                  >
                    {isOutgoing ? "-" : "+"} ₹{tx.amount}
                  </span>

                </td>

                {/* STATUS */}

                <td className="py-3">
                  {tx.status}
                </td>

                {/* DATE */}

                <td className="py-3">
                  {new Date(tx.created_at).toLocaleDateString()}
                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>
  );
}