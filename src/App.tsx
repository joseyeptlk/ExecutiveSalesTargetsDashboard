import React, { useState } from 'react';
import KpiCard from './components/KpiCard';
import HorizontalBarChart from './components/HorizontalBarChart';
import StackedColumnChart from './components/StackedColumnChart';
import GoalsTable from './components/GoalsTable';
import { kpiData } from './data/dashboardData';

// Icons
const TicketIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
    <rect x="2" y="5" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 8.5h2M16 8.5h2M7 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const GtvIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 6.5v7M7.5 8.5C7.5 7.4 8.6 7 10 7s2.5.4 2.5 1.5-1.12 1.5-2.5 1.5-2.5.4-2.5 1.5S8.6 13 10 13s2.5-.4 2.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const ChargeIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
    <path d="M10 2L3 11h7l-1 7 8-10h-7l1-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);
const FeeIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
    <path d="M5 10h10M10 5v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const miniTrend = [62, 70, 65, 80, 75, 88, 82, 90, 85, 95, 91, 97];

export default function App() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'On Track', 'At Risk', 'Below Plan'];

  const ytdTickets = Math.round((kpiData.expectedTickets.actual / kpiData.expectedTickets.target) * 100);
  const ytdGtv = Math.round((kpiData.gtv.actual / kpiData.gtv.target) * 100);
  const ytdSc = Math.round((kpiData.serviceCharge.actual / kpiData.serviceCharge.target) * 100);
  const ytdIf = Math.round((kpiData.insideFee.actual / kpiData.insideFee.target) * 100);

  return (
    <div className="min-h-screen bg-[#F7F9FC]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 bg-[#1A2B42] flex flex-col items-center py-5 gap-6 z-20 shadow-xl">
        {/* Logo mark */}
        <div className="w-9 h-9 rounded-xl bg-[#2F80ED] flex items-center justify-center">
          <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
            <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white"/>
            <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" opacity="0.5"/>
            <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" opacity="0.5"/>
            <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" opacity="0.3"/>
          </svg>
        </div>
        <div className="flex flex-col gap-4 mt-2">
          {[
            <svg key="home" width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="white" strokeWidth="1.5"/></svg>,
            <svg key="chart" width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="3" y="12" width="3" height="5" rx="1" fill="#2F80ED"/><rect x="8.5" y="8" width="3" height="9" rx="1" fill="white" opacity="0.6"/><rect x="14" y="5" width="3" height="12" rx="1" fill="white" opacity="0.3"/></svg>,
            <svg key="target" width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1.5" opacity="0.4"/><circle cx="10" cy="10" r="4" stroke="white" strokeWidth="1.5" opacity="0.6"/><circle cx="10" cy="10" r="1.5" fill="white"/></svg>,
            <svg key="cog" width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="3" stroke="white" strokeWidth="1.5" opacity="0.4"/><path d="M10 3v2M10 15v2M3 10h2M15 10h2M5.1 5.1l1.4 1.4M13.5 13.5l1.4 1.4M5.1 14.9l1.4-1.4M13.5 6.5l1.4-1.4" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/></svg>,
          ].map((icon, i) => (
            <button key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center ${i === 2 ? 'bg-[#2F80ED]' : 'hover:bg-white/10 transition-colors'}`}>
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="ml-16 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-[#E4ECF5] px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-[#1A2B42] leading-tight">Commercial Goals Dashboard</h1>
            <p className="text-xs text-[#8BA3C4] mt-0.5">2026 Commercial Targets & Performance Tracking</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Year selector */}
            <div className="flex items-center gap-1 bg-[#F7F9FC] border border-[#E4ECF5] rounded-xl px-3 py-2 text-sm text-[#1A2B42] cursor-pointer">
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><rect x="2" y="3" width="10" height="9" rx="1.5" stroke="#8BA3C4" strokeWidth="1.2"/><path d="M5 2v2M9 2v2M2 6h10" stroke="#8BA3C4" strokeWidth="1.2" strokeLinecap="round"/></svg>
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                className="bg-transparent border-0 outline-none text-[#1A2B42] font-medium cursor-pointer pr-1"
              >
                <option>2026</option>
                <option>2025</option>
              </select>
            </div>
            {/* Export Excel */}
            <button className="btn flex items-center gap-2 bg-[#F7F9FC] border border-[#E4ECF5] hover:border-[#2F80ED] text-[#1A2B42] text-sm font-medium px-4 py-2 rounded-xl transition-colors">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 13h8M8 3v8M5 9l3 3 3-3" stroke="#27AE60" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Excel
            </button>
            {/* Export Report */}
            <button className="btn flex items-center gap-2 bg-[#2F80ED] text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M2 12h12M4 8h8M4 5h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Export Report
            </button>
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#2F80ED] flex items-center justify-center text-white text-xs font-bold ml-1">JM</div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-8 py-7 flex flex-col gap-6">
          {/* Executive Summary Card */}
          <div className="bg-gradient-to-r from-[#1A2B42] to-[#2F4B72] rounded-2xl px-7 py-5 flex items-center justify-between shadow-md">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#8BA3C4] uppercase tracking-widest">Executive Summary — Sep 2026</span>
              <p className="text-white text-sm max-w-xl mt-1 leading-relaxed">
                YTD performance tracking at <strong className="text-[#56CCF2]">75.3%</strong> of annual ticket target with €106.4M GTV achieved.
                Q3 shows a softening trend — Sep came in <strong className="text-[#F2C94C]">11% below plan</strong>. Q4 recovery strategy in effect.
              </p>
            </div>
            <div className="flex items-center gap-6 shrink-0">
              {[
                { label: 'Months On Track', value: '6', color: '#27AE60' },
                { label: 'Months At Risk', value: '3', color: '#F2C94C' },
                { label: 'Below Plan', value: '3', color: '#EB5757' },
              ].map(s => (
                <div key={s.label} className="flex flex-col items-center gap-1">
                  <span className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-xs text-[#8BA3C4] text-center">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#8BA3C4] uppercase tracking-wider mr-2">Filter:</span>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeFilter === f
                    ? 'bg-[#2F80ED] text-white border-[#2F80ED]'
                    : 'bg-white text-[#8BA3C4] border-[#E4ECF5] hover:border-[#2F80ED] hover:text-[#2F80ED]'
                }`}
              >
                {f}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 text-xs text-[#8BA3C4]">
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4" stroke="#8BA3C4" strokeWidth="1.2"/><path d="M9.5 9.5L12 12" stroke="#8BA3C4" strokeWidth="1.2" strokeLinecap="round"/></svg>
              <input placeholder="Search month..." className="bg-white border border-[#E4ECF5] rounded-lg px-3 py-1.5 text-xs text-[#1A2B42] outline-none focus:border-[#2F80ED] w-32 transition-colors" />
            </div>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-4 gap-5">
            <KpiCard
              title="Expected Tickets"
              value="2,366K"
              subtitle="Annual FY2026 Target"
              icon={<TicketIcon />}
              progress={ytdTickets}
              badge={{ label: 'YTD Actual', value: '1,782K', color: '#2F80ED' }}
            />
            <KpiCard
              title="GTV Target"
              value="€140.9M"
              subtitle="Gross Transaction Value"
              icon={<GtvIcon />}
              progress={ytdGtv}
              trend={{ direction: 'up', value: '+18.4% YoY' }}
              badge={{ label: 'YTD Actual', value: '€106.4M', color: '#27AE60' }}
              accent="#2F80ED"
            />
            <KpiCard
              title="Service Charge"
              value="€20.4M"
              subtitle="Revenue Contribution"
              icon={<ChargeIcon />}
              progress={ytdSc}
              miniChart={miniTrend}
              badge={{ label: 'Rev. Contribution', value: '14.5%', color: '#2F80ED' }}
              accent="#56CCF2"
            />
            <KpiCard
              title="Inside Fee Target"
              value="€9.95M"
              subtitle="Monthly target: €0.83M"
              icon={<FeeIcon />}
              progress={ytdIf}
              trend={{ direction: 'down', value: '-3.2% MoM' }}
              badge={{ label: 'YTD Actual', value: '€7.46M', color: '#F2C94C' }}
              accent="#2F80ED"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-5">
            <HorizontalBarChart />
            <StackedColumnChart />
          </div>

          {/* Table */}
          <GoalsTable />

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-[#8BA3C4] pb-4">
            <span>Commercial Goals Dashboard v2.1 — Confidential & Proprietary</span>
            <span>Data source: CRM & Finance System — Refreshed daily at 06:00 UTC</span>
          </div>
        </main>
      </div>
    </div>
  );
}
