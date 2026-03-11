import { useState } from 'react';
import Header from '../components/Header';
import {
  MapPin,
  Clock,
  Users,
  DollarSign,
  Building2,
  Wifi,
  MoreHorizontal,
  Plus,
  Search,
  Eye,
  Edit,
  Copy,
  Archive,
  ExternalLink,
  X,
} from 'lucide-react';
import { jobs } from '../data/mockData';

function JobCard({ job, onView }) {
  const isOpen = job.status === 'open';

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all duration-200 cursor-pointer animate-fade-in"
      onClick={() => onView(job)}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-base font-semibold text-slate-800">{job.title}</h3>
          <p className="text-sm text-slate-500 mt-0.5">{job.department}</p>
        </div>
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isOpen ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'
          }`}
        >
          {isOpen ? 'Open' : 'Closed'}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="w-4 h-4 text-slate-400" />
          {job.location}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Wifi className="w-4 h-4 text-slate-400" />
          {job.remote}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <DollarSign className="w-4 h-4 text-slate-400" />
          {job.salary}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock className="w-4 h-4 text-slate-400" />
          {job.type}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <Users className="w-4 h-4" />
          <span className="font-medium text-slate-700">{job.applicants}</span> applicants
        </div>
        <span className="text-xs text-slate-400">
          Posted {new Date(job.posted).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>
    </div>
  );
}

function JobDetailModal({ job, onClose }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-5 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">{job.title}</h2>
            <p className="text-sm text-slate-500">{job.department}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Quick Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500">Location</p>
              <p className="text-sm font-medium text-slate-700 mt-0.5">{job.location}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500">Work Type</p>
              <p className="text-sm font-medium text-slate-700 mt-0.5">{job.remote}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500">Salary Range</p>
              <p className="text-sm font-medium text-slate-700 mt-0.5">{job.salary}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500">Applicants</p>
              <p className="text-sm font-medium text-slate-700 mt-0.5">{job.applicants}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Description</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{job.description}</p>
          </div>

          {/* Requirements */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Requirements</h4>
            <ul className="space-y-1.5">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span>
              Posted: {new Date(job.posted).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span>
              Closes: {new Date(job.closes).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
              <Eye className="w-4 h-4" />
              View Applicants
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
              <ExternalLink className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Jobs() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);

  const filtered = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.department.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openCount = jobs.filter((j) => j.status === 'open').length;
  const closedCount = jobs.filter((j) => j.status === 'closed').length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header title="Jobs" subtitle={`${openCount} open positions`} />

      <div className="p-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden">
              {[
                { key: 'all', label: `All (${jobs.length})` },
                { key: 'open', label: `Open (${openCount})` },
                { key: 'closed', label: `Closed (${closedCount})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    statusFilter === tab.key
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              Post Job
            </button>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} onView={setSelectedJob} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">No jobs match your search.</p>
          </div>
        )}
      </div>

      <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
}
