"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import DashboardHeader from "../../components/DashboardHeader";
import BalanceCard from "../../components/BalanceCard";
import QuickActions from "../../components/QuickActions";
import SendMoneyCard from "../../components/SendMoneyCard";
import ReceiveMoneyCard from "../../components/ReceiveMoneyCard";
import RequestMoneyCard from "../../components/RequestMoneyCard";
import IncomingRequests from "../../components/IncomingRequests";
import TransactionTable from "../../components/TransactionTable";
import ActivityFeed from "../../components/ActivityFeed";
import WalletChart from "../../components/WalletChart";

import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {

  const { token } = useAuth();

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchData = async () => {

    try {

      const balanceRes = await api.get("/wallet/balance", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const txRes = await api.get("/payment/transactions", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setBalance(balanceRes.data.balance);
      setTransactions(txRes.data.transactions);

    } catch (err) {

      console.error(err);

    }

  };

  useEffect(() => {

    if (token) {
      fetchData();
    }

  }, [token]);

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Dashboard */}

      <div className="flex-1 p-10 space-y-10">

        {/* Dashboard Header */}

        <DashboardHeader />

        {/* Wallet Balance */}

        <BalanceCard balance={balance} />

        {/* Quick Actions */}

        <QuickActions />

        {/* Analytics Section */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <WalletChart transactions={transactions} />

          <ActivityFeed transactions={transactions} />

        </div>


        {/* Row 1 */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div id="send">
            <SendMoneyCard refresh={fetchData} />
          </div>

          <div id="receive">
            <ReceiveMoneyCard />
          </div>

        </div>


        {/* Row 2 */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <TransactionTable transactions={transactions} />

          <div id="request">
            <RequestMoneyCard refresh={fetchData} />
          </div>

        </div>


        {/* Row 3 — Full Width */}

        <IncomingRequests />

      </div>

    </div>

  );

}