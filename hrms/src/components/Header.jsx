import { Search, Bell, Plus, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Header({ title, subtitle }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
      <div>
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div
          className={`flex items-center transition-all duration-200 ${
            searchOpen ? 'w-64' : 'w-10'
          }`}
        >
          {searchOpen ? (
            <div className="relative w-full animate-scale-in">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search candidates, jobs..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Add */}
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Candidate</span>
        </button>

        {/* Notifications */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-danger-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-xs font-semibold text-primary-700">RK</span>
          </div>
          <span className="text-sm font-medium text-slate-700 hidden sm:inline">Recruiter</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
