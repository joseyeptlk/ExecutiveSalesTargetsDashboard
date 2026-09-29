import React from 'react';
import { monthlyData, MonthData } from '../data/dashboardData';

function StatusBadge({ status }: { status: MonthData['status'] }) {
  const styles = {
    'On Track': 'bg-[#EDFBF3] text-[#27AE60]',
    'At Risk': 'bg-[#FFFBEB] text-[#D97706]',
    'Below Plan': 'bg-[#FEF2F2] text-[#EB5757]',
  };
  const dots = {
    'On Track': '#27AE60',
    'At Risk': '#F2C94C',
    'Below Plan': '#EB5757',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ backgroundColor: dots[status] }} />
      {status}
    </span>
  );
}

export default function GoalsTable() {
  const currentMonthIdx = 8; // Sep

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E4ECF5] overflow-hidden">
      <div className="px-6 py-5 flex items-center justify-between border-b border-[#E4ECF5]">
        <div>
          <h3 className="text-sm font-semibold text-[#1A2B42]">Commercial Goals Table</h3>
          <p className="text-xs text-[#8BA3C4] mt-0.5">Monthly breakdown — 2026 targets & attainment</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#8BA3C4]">
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" stroke="#8BA3C4" strokeWidth="1.2"/><path d="M7 4v3.5l2 1" stroke="#8BA3C4" strokeWidth="1.2" strokeLinecap="round"/></svg>
          Last updated: Sep 30, 2026
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F7F9FC]">
              {['Month', 'Expected Tickets', 'GTV Target', 'Service Charge', 'Inside Fee', 'Achievement %', 'Status'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#8BA3C4] uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((d, i) => {
              const isPast = i <= currentMonthIdx;
              const isCurrent = i === currentMonthIdx;
              return (
                <tr
                  key={d.month}
                  className={`border-t border-[#E4ECF5] hover:bg-[#F7F9FC] transition-colors ${isCurrent ? 'bg-blue-50/40' : ''}`}
                >
                  <td className="px-5 py-3.5 font-semibold text-[#1A2B42] whitespace-nowrap">
                    <span className="flex items-center gap-2">
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#2F80ED] inline-block" />}
                      {d.month} 2026
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[#1A2B42] font-medium">{d.expectedTickets}K</td>
                  <td className="px-5 py-3.5 text-[#1A2B42]">€{d.gtvTarget}M</td>
                  <td className="px-5 py-3.5 text-[#1A2B42]">€{d.serviceCharge}M</td>
                  <td className="px-5 py-3.5 text-[#1A2B42]">€{d.insideFee}M</td>
                  <td className="px-5 py-3.5">
                    {isPast ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-[#EDF2F7] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.min(d.achievement, 100)}%`,
                              backgroundColor: d.achievement >= 100 ? '#27AE60' : d.achievement >= 90 ? '#F2C94C' : '#EB5757'
                            }}
                          />
                        </div>
                        <span className={`font-semibold text-xs ${d.achievement >= 100 ? 'text-[#27AE60]' : d.achievement >= 90 ? 'text-[#D97706]' : 'text-[#EB5757]'}`}>
                          {d.achievement}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-[#8BA3C4] text-xs">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    {isPast ? <StatusBadge status={d.status} /> : <span className="text-[#8BA3C4] text-xs">Upcoming</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-[#F7F9FC] border-t-2 border-[#E4ECF5]">
              <td className="px-5 py-3.5 font-bold text-[#1A2B42] text-xs uppercase tracking-wider">FY 2026 Total</td>
              <td className="px-5 py-3.5 font-bold text-[#1A2B42]">2,366K</td>
              <td className="px-5 py-3.5 font-bold text-[#1A2B42]">€140.9M</td>
              <td className="px-5 py-3.5 font-bold text-[#1A2B42]">€20.4M</td>
              <td className="px-5 py-3.5 font-bold text-[#1A2B42]">€9.95M</td>
              <td className="px-5 py-3.5 font-bold text-[#1A2B42]">99.4%</td>
              <td className="px-5 py-3.5"><StatusBadge status="At Risk" /></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
