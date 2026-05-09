"use client";

import React from "react";
import { TrendingUp, DollarSign } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface RevenueModuleProps {
  stats: any;
}

export const RevenueModule: React.FC<RevenueModuleProps> = ({ stats }) => {
  return (
    <div className="space-y-8">
      <div className="gradient-primary-soft p-12 rounded-[48px] border border-teal-100/50 dark:border-teal-900/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-2 tracking-tighter">Financial Architecture</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-medium opacity-80">Real-time revenue monitoring and protocol growth analytics.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-[32px] border border-white/60 shadow-xl">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fiscal Velocity</p>
            <p className="text-3xl font-black text-teal-600">+12.4%</p>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-6 rounded-[32px] border border-white/60 shadow-xl">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Growth Index</p>
            <p className="text-3xl font-black text-emerald-500">9.8</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Platform Growth</h3>
                <p className="text-xs text-slate-500">Users & Revenue metrics (6 months)</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-teal-600 rounded-full" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Users</span>
                <span className="w-3 h-3 bg-purple-500 rounded-full ml-4" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue</span>
              </div>
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats?.monthly_growth || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: "#94a3b8" }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: "#94a3b8" }} 
                    tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#0d9488" 
                    strokeWidth={4} 
                    dot={{ r: 4, fill: "#0d9488", strokeWidth: 2, stroke: "#fff" }} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8b5cf6" 
                    strokeWidth={4} 
                    dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 2, stroke: "#fff" }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-800 p-10 rounded-[48px] border border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-2xl">
            <div className="w-16 h-16 bg-teal-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-teal-500/30"><DollarSign size={32} className="text-white" /></div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[4px] mb-2 leading-none">Gross Revenue</p>
            <p className="text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tighter">{stats?.revenue?.total?.toLocaleString() || "168,000"} Birr</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-500">
              <TrendingUp size={14} /> +18.2% from last cycle
            </div>
          </div>

          <div className="bg-slate-900 dark:bg-indigo-950 p-10 rounded-[48px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10">
              <p className="text-[10px] font-black text-teal-400 uppercase tracking-[4px] mb-2">Protocol Balance</p>
              <p className="text-4xl font-black text-white tracking-tighter">42,850 Birr</p>
              <button className="mt-8 w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-50 transition-colors">Initiate Payout</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[48px] border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Recent Financial Events</h3>
          <button className="text-xs font-bold text-teal-600 uppercase tracking-widest hover:underline">View All Ledger →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black uppercase tracking-[2px] text-slate-400">
              <tr>
                <th className="px-8 py-5">Event ID</th>
                <th className="px-8 py-5">Subject</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Timestamp</th>
                <th className="px-8 py-5 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {(stats?.recent_payments || []).map((p: any) => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-8 py-6 text-xs font-black text-slate-400">{p.id}</td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{p.subject}</p>
                    <p className="text-[10px] text-slate-500 font-medium italic">Scholarly Node: @{p.student}</p>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-slate-800 dark:text-white">{p.amount.toLocaleString()} Birr</td>
                  <td className="px-8 py-6 text-xs font-medium text-slate-500">{p.timestamp}</td>
                  <td className="px-8 py-6 text-right">
                    <span className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[10px] font-black rounded-lg uppercase">{p.status}</span>
                  </td>
                </tr>
              ))}
              {(!stats?.recent_payments || stats.recent_payments.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 text-sm">No recent transactions detected in the protocol ledger.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
