"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users, BookOpen, DollarSign, TrendingUp, UserPlus, ShieldAlert,
  Eye, Edit, Trash2, User
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from "recharts";

interface OverviewModuleProps {
  stats: any;
  liveStreams: any[];
  setActiveModule: (module: string) => void;
  setUserDetail: (user: any) => void;
  setShowDetailModal: (show: boolean) => void;
  setEditUser: (user: any) => void;
  setShowEditModal: (show: boolean) => void;
  handleDeleteUser: (userId: number) => void;
}

export const OverviewModule: React.FC<OverviewModuleProps> = ({
  stats,
  liveStreams,
  setActiveModule,
  setUserDetail,
  setShowDetailModal,
  setEditUser,
  setShowEditModal,
  handleDeleteUser,
}) => {
  const statCards = [
    {
      label: "Total Users",
      value: stats?.users?.total || "0",
      sub: `+${stats?.users?.new_this_month || 0} this month`,
      icon: Users,
      iconClass: "icon-blue",
    },
    {
      label: "Active Courses",
      value: stats?.courses?.total || 0,
      sub: `+${stats?.courses?.approved || 0} approved`,
      icon: BookOpen,
      iconClass: "icon-teal",
    },
    {
      label: "Instructors",
      value: stats?.users?.instructors || "0",
      sub: `${stats?.pending_instructors?.length || 0} applications`,
      icon: User,
      iconClass: "icon-teal",
    },
    {
      label: "Total Revenue",
      value: stats?.revenue?.total ? `${Math.round(stats.revenue.total)} Birr` : "0 Birr",
      sub: `+${Math.round(stats?.revenue?.this_month || 0)} this month`,
      icon: DollarSign,
      iconClass: "icon-green",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="welcome-banner p-6 rounded-2xl">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
          Admin Dashboard 🔧
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm">Platform overview and management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="stat-card"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-11 h-11 ${stat.iconClass} rounded-xl flex items-center justify-center`}>
                  <Icon size={20} className="text-white" />
                </div>
                <span className="text-sm text-slate-500">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">{stat.value}</p>
              <p className="text-xs text-emerald-600 font-medium">{stat.sub}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Platform Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Growth Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-slate-800 dark:text-white">Platform Growth Overview</h3>
            <div className="flex gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-teal-500 inline-block rounded" /> Users</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-sky-500 inline-block rounded" /> Revenue</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <LineChart data={stats?.monthly_growth || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-slate-800 dark:text-white">Category Knowledge Distribution</h3>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Node Density</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={stats?.category_distribution || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "11px" }} />
                <Bar dataKey="courses" radius={[6, 6, 0, 0]}>
                  {(stats?.category_distribution || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0d9488' : '#0891b2'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 icon-blue rounded-xl flex items-center justify-center">
              <UserPlus size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm">Pending Instructors</h3>
              <p className="text-xs text-slate-500">{stats?.pending_instructors?.length || 0} awaiting review</p>
            </div>
            <button
              onClick={() => setActiveModule("users")}
              className="ml-auto text-xs text-cyan-600 font-semibold hover:underline"
            >
              Review →
            </button>
          </div>
          <div className="space-y-2">
            {(stats?.pending_instructors || []).slice(0, 3).map((app: any) => (
              <div key={app.id} className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                <div className="w-7 h-7 gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {app.username?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-200 flex-1 truncate">{app.username}</span>
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Pending</span>
              </div>
            ))}
            {!stats?.pending_instructors?.length && (
              <p className="text-xs text-slate-400 text-center py-2">No pending applications</p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 icon-purple rounded-xl flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm">Courses Awaiting Approval</h3>
              <p className="text-xs text-slate-500">{stats?.courses?.pending_approval || 0} pending</p>
            </div>
            <button
              onClick={() => setActiveModule("courses")}
              className="ml-auto text-xs text-cyan-600 font-semibold hover:underline"
            >
              Review →
            </button>
          </div>
          <div className="space-y-2">
            {(stats?.courses?.pending_list || []).slice(0, 3).map((c: any) => (
              <div key={c.id} className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                <div className="w-7 h-7 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center text-sky-600 text-xs font-bold shrink-0">
                  {c.title?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-200 flex-1 truncate">{c.title}</span>
                <span className="text-xs text-sky-600 bg-sky-50 dark:bg-sky-900/20 px-2 py-0.5 rounded-full">Review</span>
              </div>
            ))}
            {!stats?.courses?.pending_list?.length && (
              <p className="text-xs text-slate-400 text-center py-2">No pending courses</p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 icon-teal rounded-xl flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm">Live Sessions Hub</h3>
              <p className="text-xs text-slate-500">{liveStreams?.length || 0} active hubs</p>
            </div>
            <button
              onClick={() => setActiveModule("live")}
              className="ml-auto text-xs text-teal-600 font-semibold hover:underline"
            >
              Manage →
            </button>
          </div>
          <div className="space-y-2">
            {(liveStreams || []).slice(0, 3).map((s: any) => (
              <div key={s.id} className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                <div className="w-7 h-7 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center text-teal-600 text-xs font-bold shrink-0">
                  {s.title?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-200 flex-1 truncate">{s.title}</span>
                <span className="text-[10px] text-teal-600 font-bold">{s.enrollment_count}/{s.max_students}</span>
              </div>
            ))}
            {!liveStreams?.length && (
              <p className="text-xs text-slate-400 text-center py-2">No active hubs</p>
            )}
          </div>
        </div>
      </div>

      {/* Top Performing Courses */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <h3 className="font-black text-slate-800 dark:text-white tracking-tight">Top Performing Knowledge Nodes</h3>
            <p className="text-xs text-slate-500 font-medium">Most impactful artifacts by enrollment and revenue</p>
          </div>
          <button 
            onClick={() => setActiveModule("courses")}
            className="text-xs font-black text-teal-600 uppercase tracking-widest hover:underline"
          >
            Registry Analysis →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] border-b border-slate-50 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4">Node Title</th>
                <th className="px-6 py-4 text-center">Enrollments</th>
                <th className="px-6 py-4 text-right">Yield (Birr)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
              {(stats?.top_courses || []).map((c: any) => (
                <tr key={c.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800 dark:text-white leading-none">{c.title}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs font-black text-teal-600 bg-teal-50 dark:bg-teal-900/20 px-3 py-1 rounded-full">{c.enrollments}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-black text-slate-700 dark:text-slate-200">{c.revenue.toLocaleString()}</p>
                  </td>
                </tr>
              ))}
              {(!stats?.top_courses || stats.top_courses.length === 0) && (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-xs text-slate-400 font-medium">No performance data yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Users Registry */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <div>
            <h3 className="font-black text-slate-800 dark:text-white tracking-tight">Unified User Registry</h3>
            <p className="text-xs text-slate-500 font-medium">Recently registered nodes and identities</p>
          </div>
          <button 
            onClick={() => setActiveModule("users")}
            className="text-xs font-black text-teal-600 uppercase tracking-widest hover:underline"
          >
            View Full Database
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 text-[10px] font-black uppercase tracking-[2px]">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Identity</th>
                <th className="px-6 py-4">Institutional Role</th>
                <th className="px-6 py-4">Registry Date</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {(stats?.recent_users || []).map((u: any) => (
                <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-slate-500">#{u.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white text-[10px] font-black">{u.username?.[0]?.toUpperCase()}</div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1">{u.username}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                      u.role === 'SUPER_ADMIN' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' : 
                      u.role === 'ADMIN' ? 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' : 
                      u.role === 'INSTRUCTOR' ? 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400' :
                      'bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400'
                    }`}>{u.role}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-500">{u.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => { setUserDetail(u); setShowDetailModal(true); }}
                        title="View Detail"
                        className="p-2 text-slate-400 hover:text-cyan-600 transition-colors"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        onClick={() => { setEditUser(u); setShowEditModal(true); }}
                        title="Edit Identity"
                        className="p-2 text-slate-400 hover:text-teal-600 transition-colors"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(u.id)} 
                        title="Revoke Access"
                        className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!stats?.recent_users || stats.recent_users.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-xs text-slate-400 font-medium">No recent activity detected in the user registry.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
