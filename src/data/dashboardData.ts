export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export interface MonthData {
  month: string;
  expectedTickets: number; // thousands
  actualTickets: number;
  gtvTarget: number; // millions
  gtvActual: number;
  serviceCharge: number; // millions
  serviceChargeActual: number;
  insideFee: number; // millions
  insideFeeActual: number;
  achievement: number; // %
  status: 'On Track' | 'At Risk' | 'Below Plan';
}

export const monthlyData: MonthData[] = [
  { month: 'Jan', expectedTickets: 142, actualTickets: 148, gtvTarget: 8.4, gtvActual: 8.9, serviceCharge: 1.2, serviceChargeActual: 1.3, insideFee: 0.6, insideFeeActual: 0.62, achievement: 104, status: 'On Track' },
  { month: 'Feb', expectedTickets: 118, actualTickets: 121, gtvTarget: 7.1, gtvActual: 7.3, serviceCharge: 1.0, serviceChargeActual: 1.05, insideFee: 0.5, insideFeeActual: 0.52, achievement: 102, status: 'On Track' },
  { month: 'Mar', expectedTickets: 165, actualTickets: 159, gtvTarget: 9.8, gtvActual: 9.4, serviceCharge: 1.4, serviceChargeActual: 1.34, insideFee: 0.7, insideFeeActual: 0.67, achievement: 97, status: 'At Risk' },
  { month: 'Apr', expectedTickets: 188, actualTickets: 201, gtvTarget: 11.2, gtvActual: 12.0, serviceCharge: 1.6, serviceChargeActual: 1.72, insideFee: 0.8, insideFeeActual: 0.86, achievement: 107, status: 'On Track' },
  { month: 'May', expectedTickets: 210, actualTickets: 224, gtvTarget: 12.5, gtvActual: 13.3, serviceCharge: 1.8, serviceChargeActual: 1.92, insideFee: 0.9, insideFeeActual: 0.96, achievement: 106, status: 'On Track' },
  { month: 'Jun', expectedTickets: 245, actualTickets: 231, gtvTarget: 14.6, gtvActual: 13.8, serviceCharge: 2.1, serviceChargeActual: 1.98, insideFee: 1.0, insideFeeActual: 0.94, achievement: 94, status: 'At Risk' },
  { month: 'Jul', expectedTickets: 268, actualTickets: 274, gtvTarget: 16.0, gtvActual: 16.4, serviceCharge: 2.3, serviceChargeActual: 2.35, insideFee: 1.1, insideFeeActual: 1.13, achievement: 102, status: 'On Track' },
  { month: 'Aug', expectedTickets: 255, actualTickets: 248, gtvTarget: 15.2, gtvActual: 14.8, serviceCharge: 2.2, serviceChargeActual: 2.14, insideFee: 1.05, insideFeeActual: 1.02, achievement: 97, status: 'At Risk' },
  { month: 'Sep', expectedTickets: 198, actualTickets: 176, gtvTarget: 11.8, gtvActual: 10.5, serviceCharge: 1.7, serviceChargeActual: 1.51, insideFee: 0.85, insideFeeActual: 0.74, achievement: 89, status: 'Below Plan' },
  { month: 'Oct', expectedTickets: 172, actualTickets: 0, gtvTarget: 10.2, gtvActual: 0, serviceCharge: 1.5, serviceChargeActual: 0, insideFee: 0.75, insideFeeActual: 0, achievement: 0, status: 'Below Plan' },
  { month: 'Nov', expectedTickets: 185, actualTickets: 0, gtvTarget: 11.0, gtvActual: 0, serviceCharge: 1.6, serviceChargeActual: 0, insideFee: 0.8, insideFeeActual: 0, achievement: 0, status: 'Below Plan' },
  { month: 'Dec', expectedTickets: 220, actualTickets: 0, gtvTarget: 13.1, gtvActual: 0, serviceCharge: 1.9, serviceChargeActual: 0, insideFee: 0.95, insideFeeActual: 0, achievement: 0, status: 'Below Plan' },
];

export const kpiData = {
  expectedTickets: { target: 2366, actual: 1782, unit: 'K', label: 'Expected Tickets 2026' },
  gtv: { target: 140.9, actual: 106.4, unit: 'M', label: 'GTV Target 2026', yoy: 18.4 },
  serviceCharge: { target: 20.4, actual: 15.39, unit: 'M', label: 'Service Charge Target', revenueContrib: 14.5 },
  insideFee: { target: 9.95, actual: 7.46, unit: 'M', label: 'Inside Fee Target', monthlyTarget: 0.83 },
};
