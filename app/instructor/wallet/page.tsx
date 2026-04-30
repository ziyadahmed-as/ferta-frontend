"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { DollarSign, ArrowUpRight, ArrowDownRight, Clock, CheckCircle, XCircle, Home, BookOpen, Users, LogOut, Wallet as WalletIcon } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const InstructorWallet = () => {
  const { user, logout } = useAuth();
  const [wallet, setWallet] = useState<any>(null);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("revenue");
  
  // Withdrawal Form State
  const [amount, setAmount] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const [walletRes, withdrawRes] = await Promise.all([
          api.get("/finance/wallet/"),
          api.get("/finance/withdrawals/")
        ]);
        
        if (walletRes.data && walletRes.data.length > 0) {
          setWallet(walletRes.data[0]);
        }
        
        setWithdrawals(Array.isArray(withdrawRes.data) ? withdrawRes.data : withdrawRes.data.results || []);
      } catch (err) {
        console.error("Finance fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.role === "INSTRUCTOR" || user?.role === "ADMIN" || user?.is_superuser) fetchFinanceData();
    else setLoading(false);
  }, [user]);

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !accountDetails) return;
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    
    if (wallet && numAmount > parseFloat(wallet.balance)) {
      alert("Amount exceeds your available balance.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post("/finance/withdrawals/", {
        amount: numAmount,
        account_details: accountDetails
      });
      alert("Withdrawal request submitted successfully!");
      setWithdrawals([res.data, ...withdrawals]);
      setAmount("");
      setAccountDetails("");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to request withdrawal. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (!user || (user.role !== "INSTRUCTOR" && !user.is_superuser && user.role !== "ADMIN")) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 text-center px-6">
        <DollarSign size={56} className="text-cyan-600 mb-5" />
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Access Denied</h1>
        <Link href="/" className="px-6 py-3 gradient-primary text-white rounded-xl font-semibold">Go Home</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/instructor/dashboard" },
    { id: "courses", label: "My Teaching", icon: BookOpen, href: "/instructor/courses" },
    { id: "revenue", label: "Wallet & Revenue", icon: DollarSign, href: "/instructor/wallet" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800 dark:text-white">Fatra<span className="text-cyan-600"> Academy</span></span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeNav === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active ? "sidebar-active" : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Financial Hub</h2>
          <ThemeToggle />
        </header>

        <div className="p-6 lg:p-10 space-y-8 max-w-6xl mx-auto">
          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-8 text-white shadow-lg shadow-cyan-500/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <WalletIcon size={24} className="text-white" />
                  </div>
                  <span className="text-lg font-medium text-cyan-50">Available Balance</span>
                </div>
                <h3 className="text-5xl font-black mb-2 tracking-tight">
                  {wallet ? parseFloat(wallet.balance).toLocaleString() : '0.00'} <span className="text-2xl font-bold text-cyan-200">ETB</span>
                </h3>
                <p className="text-sm font-medium text-cyan-100 mt-4">Total Earned All Time: {wallet ? parseFloat(wallet.total_earned).toLocaleString() : '0.00'} ETB</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-center"
            >
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Request Payout</h4>
              <form onSubmit={handleWithdrawal} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Amount (ETB)</label>
                    <input 
                      type="number"
                      step="0.01"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-white font-medium"
                      placeholder="e.g. 5000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Account Info</label>
                    <input 
                      type="text"
                      required
                      value={accountDetails}
                      onChange={(e) => setAccountDetails(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-800 dark:text-white font-medium"
                      placeholder="Bank & Account Number"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 gradient-primary text-white font-bold rounded-xl shadow-md hover:shadow-cyan-500/20 transition-all disabled:opacity-50 mt-2"
                >
                  {submitting ? "Processing..." : "Submit Withdrawal Request"}
                </button>
              </form>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transactions History */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Recent Transactions</h4>
              <div className="space-y-4">
                {wallet?.transactions?.slice(0, 8).map((txn: any) => (
                  <div key={txn.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        txn.transaction_type === 'SALE' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {txn.transaction_type === 'SALE' ? <ArrowDownRight size={18} /> : <ArrowUpRight size={18} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-white">
                          {txn.transaction_type === 'SALE' ? 'Course Sale Revenue' : 'System Withdrawal'}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {new Date(txn.created_at).toLocaleDateString()} • {new Date(txn.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-black ${txn.transaction_type === 'SALE' ? 'text-emerald-600' : 'text-slate-800 dark:text-slate-300'}`}>
                      {txn.transaction_type === 'SALE' ? '+' : ''}{parseFloat(txn.amount).toLocaleString()} ETB
                    </span>
                  </div>
                ))}
                {(!wallet?.transactions || wallet.transactions.length === 0) && (
                  <p className="text-center text-slate-500 py-8 text-sm italic">No transactions found.</p>
                )}
              </div>
            </motion.div>

            {/* Withdrawal Requests */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Withdrawal Status</h4>
              <div className="space-y-4">
                {withdrawals.map((req: any) => (
                  <div key={req.id} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-700 rounded-2xl">
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white mb-1">
                        {parseFloat(req.amount).toLocaleString()} ETB
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{req.account_details}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{new Date(req.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
                      ${req.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 
                        req.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 
                        req.status === 'PAID' ? 'bg-blue-100 text-blue-700' : 
                        'bg-red-100 text-red-700'}
                    `}>
                      {req.status === 'PENDING' && <Clock size={12} />}
                      {(req.status === 'APPROVED' || req.status === 'PAID') && <CheckCircle size={12} />}
                      {req.status === 'REJECTED' && <XCircle size={12} />}
                      {req.status}
                    </div>
                  </div>
                ))}
                {withdrawals.length === 0 && (
                  <p className="text-center text-slate-500 py-8 text-sm italic">No withdrawal requests found.</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorWallet;
