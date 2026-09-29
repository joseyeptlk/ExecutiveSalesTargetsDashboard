import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  progress: number;
  badge?: { label: string; value: string; color: string };
  trend?: { direction: 'up' | 'down'; value: string };
  miniChart?: number[];
  accent?: string;
}

export default function KpiCard({ title, value, subtitle, icon, progress, badge, trend, miniChart, accent = '#2F80ED' }: KpiCardProps) {
  const clampedProgress = Math.min(progress, 100);

  return (
    <div className="card bg-white rounded-2xl p-6 shadow-sm border border-[#E4ECF5] flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8BA3C4]">{title}</span>
          {subtitle && <span className="text-xs text-[#8BA3C4]">{subtitle}</span>}
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accent}18` }}>
          <span style={{ color: accent }}>{icon}</span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2">
        <span className="text-3xl font-700 text-[#1A2B42] leading-none" style={{ fontWeight: 700 }}>{value}</span>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-500 pb-0.5 ${trend.direction === 'up' ? 'text-[#27AE60]' : 'text-[#EB5757]'}`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              {trend.direction === 'up'
                ? <path d="M7 2.5L11 7H8.5V11.5H5.5V7H3L7 2.5Z" fill="currentColor"/>
                : <path d="M7 11.5L3 7H5.5V2.5H8.5V7H11L7 11.5Z" fill="currentColor"/>}
            </svg>
            {trend.value}
          </div>
        )}
        {miniChart && (
          <svg width="64" height="28" viewBox="0 0 64 28" fill="none" className="pb-0.5">
            <polyline
              points={miniChart.map((v, i) => `${i * (64 / (miniChart.length - 1))},${28 - (v / Math.max(...miniChart)) * 24}`).join(' ')}
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-[#8BA3C4]">
          <span>YTD Progress</span>
          <span style={{ color: progress >= 100 ? '#27AE60' : progress >= 90 ? '#F2C94C' : '#1A2B42' }}>{clampedProgress.toFixed(0)}%</span>
        </div>
        <div className="h-1.5 bg-[#EDF2F7] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bar-fill"
            style={{ width: `${clampedProgress}%`, backgroundColor: progress >= 100 ? '#27AE60' : progress >= 90 ? '#F2C94C' : accent }}
          />
        </div>
      </div>

      {badge && (
        <div className="flex items-center gap-2 pt-1 border-t border-[#E4ECF5]">
          <span className="text-xs text-[#8BA3C4]">{badge.label}</span>
          <span className="text-xs font-600 ml-auto" style={{ color: badge.color, fontWeight: 600 }}>{badge.value}</span>
        </div>
      )}
    </div>
  );
}
