import { useState } from 'react';
import Header from '../components/Header';
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Phone,
  User,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { interviews } from '../data/mockData';

const statusConfig = {
  scheduled: { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Calendar, label: 'Scheduled' },
  completed: { color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle, label: 'Completed' },
  cancelled: { color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle, label: 'Cancelled' },
};

const locationIcons = {
  'Google Meet': Video,
  Zoom: Video,
  'In-person': MapPin,
  Phone: Phone,
};

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function InterviewCard({ interview }) {
  const status = statusConfig[interview.status];
  const LocationIcon = locationIcons[interview.location] || Video;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary-700">{interview.avatar}</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{interview.candidateName}</p>
            <p className="text-xs text-slate-500">{interview.role}</p>
          </div>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium border ${status.color}`}
        >
          {status.label}
        </span>
      </div>

      <div className="bg-slate-50 rounded-lg p-3 space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4 text-slate-400" />
          {new Date(interview.date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock className="w-4 h-4 text-slate-400" />
          {interview.time} ({interview.duration})
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <LocationIcon className="w-4 h-4 text-slate-400" />
          {interview.location}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
          <User className="w-3 h-3 text-violet-600" />
        </div>
        <div>
          <span className="text-xs text-slate-600">{interview.interviewer}</span>
          <span className="text-xs text-slate-400 ml-1">({interview.interviewerRole})</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
        <span
          className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
            interview.type === 'Technical Interview'
              ? 'bg-purple-50 text-purple-700'
              : interview.type === 'Phone Screen'
              ? 'bg-cyan-50 text-cyan-700'
              : interview.type === 'Culture Fit'
              ? 'bg-pink-50 text-pink-700'
              : 'bg-amber-50 text-amber-700'
          }`}
        >
          {interview.type}
        </span>
      </div>

      {interview.status === 'scheduled' && (
        <div className="flex gap-2 mt-3">
          <button className="flex-1 px-3 py-2 bg-primary-600 text-white text-xs font-medium rounded-lg hover:bg-primary-700 transition-colors">
            Join Meeting
          </button>
          <button className="px-3 py-2 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors">
            Reschedule
          </button>
        </div>
      )}
    </div>
  );
}

function MiniCalendar() {
  const today = new Date();
  const currentMonth = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Generate calendar days (simplified)
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  const days = [];
  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Days with interviews
  const interviewDays = interviews
    .filter((i) => i.status === 'scheduled')
    .map((i) => new Date(i.date).getDate());

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-800">{currentMonth}</h3>
        <div className="flex gap-1">
          <button className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-[10px] font-medium text-slate-400 py-1">
            {day}
          </div>
        ))}
        {days.map((day, i) => {
          const isToday = day === today.getDate();
          const hasInterview = interviewDays.includes(day);

          return (
            <div key={i} className="text-center py-1">
              {day ? (
                <button
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors relative ${
                    isToday
                      ? 'bg-primary-600 text-white'
                      : hasInterview
                      ? 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {day}
                  {hasInterview && !isToday && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500" />
                  )}
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Interviews() {
  const [filter, setFilter] = useState('all');

  const filtered =
    filter === 'all' ? interviews : interviews.filter((i) => i.status === filter);

  const scheduledCount = interviews.filter((i) => i.status === 'scheduled').length;
  const completedCount = interviews.filter((i) => i.status === 'completed').length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header title="Interviews" subtitle={`${scheduledCount} upcoming interviews`} />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            <MiniCalendar />

            {/* Quick Stats */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
              <h3 className="text-sm font-semibold text-slate-800">This Week</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Scheduled</span>
                  <span className="text-sm font-semibold text-primary-600">{scheduledCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Completed</span>
                  <span className="text-sm font-semibold text-green-600">{completedCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total</span>
                  <span className="text-sm font-semibold text-slate-700">{interviews.length}</span>
                </div>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
              <Plus className="w-4 h-4" />
              Schedule Interview
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filter Tabs */}
            <div className="flex gap-2 mb-4">
              {[
                { key: 'all', label: 'All' },
                { key: 'scheduled', label: 'Upcoming' },
                { key: 'completed', label: 'Completed' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    filter === tab.key
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Interview Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((interview) => (
                <InterviewCard key={interview.id} interview={interview} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-12 text-center bg-white rounded-xl border border-slate-200">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500">No interviews found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
