import { FaUsers, FaThLarge } from "react-icons/fa";
import { RiBarChartBoxLine } from "react-icons/ri";
import { FaMoneyBills } from "react-icons/fa6";
import { GoHome } from "react-icons/go";

export const navItems = [
  { id: 1, label: "Home", icon: GoHome },
  { id: 2, label: "Analytics", icon: RiBarChartBoxLine },
  { id: 3, label: "Revenue", icon: FaMoneyBills },
  { id: 4, label: "CRM", icon: FaUsers },
  { id: 5, label: "Apps", icon: FaThLarge },
];

export const sample: Tx[] = [
  { id: '1', title: 'Psychology of Money', subtitle: 'Roy Cash', amount: 'USD 600', date: 'Apr 03, 2022', type: 'in' },
  { id: '2', title: 'Buy me a coffee', subtitle: 'Jonathan Smart', amount: 'USD 100', date: 'Apr 02, 2022', type: 'in' },
  { id: '3', title: 'How to build an online brand', subtitle: 'Delvan Ludacris', amount: 'USD 100', date: 'Apr 02, 2022', type: 'in' },
  { id: '4', title: 'Cash withdrawal', subtitle: '', amount: 'USD 3000.33', date: 'Apr 01, 2022', type: 'out', status: 'successful' },
  { id: '5', title: 'Support my outreach', subtitle: 'Shawn Kane', amount: 'USD 400', date: 'Apr 02, 2022', type: 'in' },
  { id: '6', title: 'Cash withdrawal', subtitle: '', amount: 'USD 1004.44', date: 'Apr 01, 2022', type: 'out', status: 'pending' },
  { id: '7', title: 'Learn how to pitch your idea', subtitle: 'Dujon Jericho', amount: 'USD 500', date: 'Apr 02, 2022', type: 'in' },
]

export const TX_TYPES = [
  'Store Transactions',
  'Get Tipped',
  'Withdrawals',
  'Chargebacks',
  'Cashbacks',
  'Refer & Earn',
]
export const TX_STATUS = ['Successful', 'Pending', 'Failed']
export type DateRange = 'today' | 'last7days' | 'thisMonth' | 'last3months' | 'thisYear' | 'lastYear' | 'allTime' | 'custom'
export const dateRangeOptions: { label: string; value: DateRange }[] = [
  { label: 'Today', value: 'today' },
  { label: 'Last 7 days', value: 'last7days' },
  { label: 'This month', value: 'thisMonth' },
  { label: 'Last 3 months', value: 'last3months' },
  { label: 'This Year', value: 'thisYear' },
  { label: 'Last Year', value: 'lastYear' },
  { label: 'All time', value: 'allTime' }
] 