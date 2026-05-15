"use client";

import React from "react";

interface WithdrawalsModuleProps {
  withdrawals: any[];
  handleApproveWithdrawal: (withdrawalId: number) => void;
}

export const WithdrawalsModule: React.FC<WithdrawalsModuleProps> = ({
  withdrawals,
  handleApproveWithdrawal,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Instructor Payout Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900 text-xs font-bold uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4 rounded-l-xl">ID</th>
                <th className="px-6 py-4">Instructor ID</th>
                <th className="px-6 py-4">Amount (ETB)</th>
                <th className="px-6 py-4">Account Details</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 rounded-r-xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {withdrawals.map((req: any) => (
                <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="px-6 py-4 text-sm text-slate-500">{req.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200">@{req.instructor_name || req.instructor}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-slate-200">{parseFloat(req.amount).toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{req.account_details}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{new Date(req.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full ${
                      req.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                      req.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {req.status === 'PENDING' && (
                      <button
                        onClick={() => handleApproveWithdrawal(req.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm"
                      >
                        Approve Payout
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {withdrawals.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">No withdrawal requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
