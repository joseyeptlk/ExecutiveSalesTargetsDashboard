import React, { useState } from 'react';
import { monthlyData } from '../data/dashboardData';

export default function StackedColumnChart() {
  const [hovered, setHovered] = useState<number | null>(null);

  const maxTotal = Math.max(...monthlyData.map(d => d.gtvTarget + d.serviceCharge + d.insideFee));

  const legend = [
    { label: 'GTV', color: '#2F80ED' },
    { label: 'Service Charge', color: '#56CCF2' },
    { label: 'Inside Fee', color: '#BDD5FB' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E4ECF5] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#1A2B42]">Monthly Revenue Targets</h3>
          <p className="text-xs text-[#8BA3C4] mt-0.5">GTV, Service Charge & Inside Fee (€M)</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#8BA3C4]">
          {legend.map(l => (
            <span key={l.label} className="flex items-center gap-1.5">
              <span className="w-3 h-1.5 rounded inline-block" style={{ backgroundColor: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-end gap-1 h-48 relative">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between h-full text-xs text-[#8BA3C4] pr-2 shrink-0" style={{ paddingBottom: '20px' }}>
          {[maxTotal, maxTotal * 0.75, maxTotal * 0.5, maxTotal * 0.25, 0].map((v, i) => (
            <span key={i} className="text-right">{v === 0 ? '0' : `${v.toFixed(0)}M`}</span>
          ))}
        </div>

        {/* Chart area */}
        <div className="flex-1 flex flex-col">
          {/* Gridlines */}
          <div className="relative flex-1 flex flex-col justify-between" style={{ paddingBottom: '20px' }}>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="w-full border-t border-dashed border-[#E4ECF5]" />
            ))}
            {/* Bars overlay */}
            <div className="absolute inset-0 flex items-end gap-1 px-0.5" style={{ paddingBottom: '0px' }}>
              {monthlyData.map((d, i) => {
                const total = d.gtvTarget + d.serviceCharge + d.insideFee;
                const totalHeight = (total / maxTotal) * 100;
                const gtvPct = (d.gtvTarget / total) * 100;
                const scPct = (d.serviceCharge / total) * 100;
                const ifPct = (d.insideFee / total) * 100;

                return (
                  <div
                    key={d.month}
                    className="flex-1 flex flex-col justify-end cursor-pointer"
                    style={{ height: '100%' }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {hovered === i && (
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#1A2B42] text-white text-xs rounded-lg px-2.5 py-2 whitespace-nowrap z-10 shadow-lg pointer-events-none">
                        <div className="font-semibold mb-1">{d.month} 2026</div>
                        <div className="text-[#BDD5FB]">GTV: €{d.gtvTarget}M</div>
                        <div className="text-[#56CCF2]">SC: €{d.serviceCharge}M</div>
                        <div className="text-[#8BA3C4]">IF: €{d.insideFee}M</div>
                        <div className="text-white font-medium mt-1 pt-1 border-t border-white/20">Total: €{total.toFixed(1)}M</div>
                      </div>
                    )}
                    <div
                      className="relative flex flex-col-reverse overflow-hidden rounded-t"
                      style={{ height: `${totalHeight}%`, opacity: hovered !== null && hovered !== i ? 0.5 : 1, transition: 'opacity 0.15s, height 0.6s cubic-bezier(0.4,0,0.2,1)' }}
                    >
                      <div style={{ height: `${gtvPct}%`, backgroundColor: '#2F80ED' }} />
                      <div style={{ height: `${scPct}%`, backgroundColor: '#56CCF2' }} />
                      <div style={{ height: `${ifPct}%`, backgroundColor: '#BDD5FB' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* X-axis labels */}
          <div className="flex gap-1 px-0.5 h-5">
            {monthlyData.map(d => (
              <div key={d.month} className="flex-1 text-center text-xs text-[#8BA3C4]">{d.month}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
