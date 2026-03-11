import Header from '../components/Header';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { sourceData, departmentData } from '../data/mockData';
import { TrendingUp, TrendingDown, Target, Users, Clock, Award } from 'lucide-react';

const timeToHireData = [
  { stage: 'Applied to Screen', days: 3 },
  { stage: 'Screen to Interview', days: 7 },
  { stage: 'Interview to Offer', days: 12 },
  { stage: 'Offer to Accept', days: 6 },
];

const conversionData = [
  { stage: 'Applied', count: 156, rate: 100 },
  { stage: 'Screened', count: 89, rate: 57 },
  { stage: 'Interviewed', count: 42, rate: 27 },
  { stage: 'Offered', count: 12, rate: 8 },
  { stage: 'Hired', count: 8, rate: 5 },
];

const weeklyActivity = [
  { week: 'W1', applications: 23, screenings: 12, interviews: 8, offers: 2 },
  { week: 'W2', applications: 31, screenings: 15, interviews: 10, offers: 3 },
  { week: 'W3', applications: 28, screenings: 18, interviews: 7, offers: 4 },
  { week: 'W4', applications: 35, screenings: 14, interviews: 12, offers: 1 },
];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

function MetricCard({ icon: Icon, label, value, change, changeType, color }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          <div className="flex items-center gap-1.5">
            <p className="text-xs text-slate-500">{label}</p>
            {change && (
              <span
                className={`flex items-center gap-0.5 text-xs font-medium ${
                  changeType === 'up' ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {changeType === 'up' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {change}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Analytics() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header title="Analytics" subtitle="Recruiting performance insights" />

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={Target}
            label="Conversion Rate"
            value="5.1%"
            change="+0.8%"
            changeType="up"
            color="bg-primary-500"
          />
          <MetricCard
            icon={Clock}
            label="Avg. Time to Hire"
            value="28 days"
            change="-3 days"
            changeType="up"
            color="bg-violet-500"
          />
          <MetricCard
            icon={Users}
            label="Pipeline Volume"
            value="156"
            change="+12%"
            changeType="up"
            color="bg-cyan-500"
          />
          <MetricCard
            icon={Award}
            label="Offer Accept Rate"
            value="87%"
            change="+5%"
            changeType="up"
            color="bg-green-500"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hiring Funnel */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-base font-semibold text-slate-800 mb-1">Hiring Funnel</h3>
            <p className="text-sm text-slate-500 mb-4">Candidate conversion through stages</p>
            <div className="space-y-3">
              {conversionData.map((stage) => (
                <div key={stage.stage} className="flex items-center gap-3">
                  <span className="text-sm text-slate-600 w-24 flex-shrink-0">{stage.stage}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden relative">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-700 flex items-center justify-end pr-3"
                      style={{ width: `${stage.rate}%` }}
                    >
                      {stage.rate > 15 && (
                        <span className="text-xs font-semibold text-white">{stage.count}</span>
                      )}
                    </div>
                    {stage.rate <= 15 && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">
                        {stage.count}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-slate-400 w-10 text-right">
                    {stage.rate}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Department Overview */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-base font-semibold text-slate-800 mb-1">Department Overview</h3>
            <p className="text-sm text-slate-500 mb-4">Open vs filled positions by department</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={departmentData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="department" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12 }}
                  formatter={(value) => <span className="text-slate-600">{value}</span>}
                />
                <Bar dataKey="open" name="Open" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="filled" name="Filled" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Time to Hire Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-base font-semibold text-slate-800 mb-1">Time to Hire Breakdown</h3>
            <p className="text-sm text-slate-500 mb-4">Average days per stage</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={timeToHireData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="stage"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  width={130}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="days" name="Days" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Activity */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-base font-semibold text-slate-800 mb-1">Weekly Activity</h3>
            <p className="text-sm text-slate-500 mb-4">Recruitment activity this month</p>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyActivity}>
                <defs>
                  <linearGradient id="colorApps2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey="applications"
                  name="Applications"
                  stroke="#3b82f6"
                  fill="url(#colorApps2)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="screenings"
                  name="Screenings"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="interviews"
                  name="Interviews"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="offers"
                  name="Offers"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source Performance */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-base font-semibold text-slate-800 mb-1">Source Performance</h3>
          <p className="text-sm text-slate-500 mb-4">Candidate quality by source</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {sourceData.map((source) => (
              <div key={source.name} className="bg-slate-50 rounded-lg p-4 text-center">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                  style={{ backgroundColor: `${source.color}20` }}
                >
                  <span className="text-lg font-bold" style={{ color: source.color }}>
                    {source.value}%
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-700">{source.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">of total hires</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
