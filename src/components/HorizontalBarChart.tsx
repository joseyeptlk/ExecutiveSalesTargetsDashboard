import React from 'react';
import { monthlyData } from '../data/dashboardData';

export default function HorizontalBarChart() {
  const maxTickets = Math.max(...monthlyData.map(d => Math.max(d.expectedTickets, d.actualTickets)));
  const currentMonthIdx = 8; // Sep (0-indexed)

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E4ECF5] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#1A2B42]">Monthly Tickets Target 2026</h3>
          <p className="text-xs text-[#8BA3C4] mt-0.5">Actual vs Target comparison (thousands)</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#8BA3C4]">
          <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded bg-[#2F80ED] inline-block" />Target</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded bg-[#BDD5FB] inline-block" />Actual</span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {monthlyData.map((d, i) => (
          <div key={d.month} className="flex items-center gap-3">
            <span className="w-7 text-xs font-medium text-[#8BA3C4] shrink-0">{d.month}</span>
            <div className="flex-1 flex flex-col gap-1">
              {/* Target bar */}
              <div className="relative h-2 bg-[#EDF2F7] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bar-fill"
                  style={{ width: `${(d.expectedTickets / maxTickets) * 100}%`, backgroundColor: '#2F80ED' }}
                />
              </div>
              {/* Actual bar */}
              {d.actualTickets > 0 && (
                <div className="relative h-2 bg-[#EDF2F7] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bar-fill"
                    style={{
                      width: `${(d.actualTickets / maxTickets) * 100}%`,
                      backgroundColor: d.actualTickets >= d.expectedTickets ? '#BDD5FB' : '#FBD5D5'
                    }}
                  />
                </div>
              )}
            </div>
            <div className="text-right shrink-0 w-16">
              <span className="text-xs font-semibold text-[#1A2B42]">{d.expectedTickets}K</span>
              {d.actualTickets > 0 && (
                <span className={`block text-xs ${d.actualTickets >= d.expectedTickets ? 'text-[#27AE60]' : 'text-[#EB5757]'}`}>
                  {d.actualTickets}K
                </span>
              )}
              {i > currentMonthIdx && <span className="block text-xs text-[#8BA3C4]">—</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
