import Header from '../components/Header';
import {
  Users,
  Briefcase,
  Calendar,
  UserCheck,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  FilePlus,
  Send,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { dashboardStats, hiringTrend, sourceData, recentActivity } from '../data/mockData';

const iconMap = {
  'file-plus': FilePlus,
  calendar: Calendar,
  send: Send,
  'check-circle': CheckCircle,
  'arrow-right': ArrowRight,
};

const activityColors = {
  application: 'bg-blue-100 text-blue-600',
  interview: 'bg-purple-100 text-purple-600',
  offer: 'bg-amber-100 text-amber-600',
  hired: 'bg-green-100 text-green-600',
  stage: 'bg-slate-100 text-slate-600',
};

function StatCard({ icon: Icon, label, value, change, changeType, color }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow animate-fade-in">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {change && (
          <span
            className={`flex items-center gap-0.5 text-xs font-medium ${
              changeType === 'up' ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {changeType === 'up' ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" />
            )}
            {change}
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-sm text-slate-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs text-slate-500">
            {entry.name}: <span className="font-semibold text-slate-700">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header title="Dashboard" subtitle="Welcome back! Here's your recruiting overview." />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            icon={Users}
            label="Total Candidates"
            value={dashboardStats.totalCandidates}
            change="+12%"
            changeType="up"
            color="bg-primary-500"
          />
          <StatCard
            icon={Briefcase}
            label="Active Jobs"
            value={dashboardStats.activeJobs}
            change="+2"
            changeType="up"
            color="bg-violet-500"
          />
          <StatCard
            icon={Calendar}
            label="Interviews This Week"
            value={dashboardStats.interviewsThisWeek}
            change="+18%"
            changeType="up"
            color="bg-cyan-500"
          />
          <StatCard
            icon={UserCheck}
            label="Hired This Month"
            value={dashboardStats.hiredThisMonth}
            change="-1"
            changeType="down"
            color="bg-green-500"
          />
          <StatCard
            icon={Clock}
            label="Avg. Time to Hire"
            value={`${dashboardStats.timeToHire}d`}
            change="-3d"
            changeType="up"
            color="bg-amber-500"
          />
          <StatCard
            icon={TrendingUp}
            label="Offer Accept Rate"
            value={`${dashboardStats.offerAcceptRate}%`}
            change="+5%"
            changeType="up"
            color="bg-rose-500"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hiring Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-slate-800">Hiring Trend</h3>
                <p className="text-sm text-slate-500">Applications vs Hires over time</p>
              </div>
              <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>Last 7 months</option>
                <option>Last 12 months</option>
                <option>This year</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={hiringTrend}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="applications"
                  name="Applications"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#colorApps)"
                />
                <Area
                  type="monotone"
                  dataKey="hires"
                  name="Hires"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#colorHires)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Source Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-base font-semibold text-slate-800 mb-1">Source Breakdown</h3>
            <p className="text-sm text-slate-500 mb-4">Where candidates come from</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {sourceData.map((source) => (
                <div key={source.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                    <span className="text-sm text-slate-600">{source.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{source.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-base font-semibold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => {
              const IconComp = iconMap[activity.icon] || ArrowRight;
              return (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activityColors[activity.type]
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700">{activity.message}</p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{activity.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
