"use client";

import Sidebar from "../../components/Sidebar";
import TransactionTable from "../../components/TransactionTable";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function TransactionsPage() {

  const { token } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {

    const fetchTx = async () => {

      const res = await api.get("/payment/transactions", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTransactions(res.data.transactions);

    };

    if (token) fetchTx();

  }, [token]);

  return (

    <div className="flex bg-gray-50 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">

        <TransactionTable transactions={transactions} />

      </div>

    </div>

  );
}