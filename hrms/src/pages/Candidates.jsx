import { useState, useMemo } from 'react';
import Header from '../components/Header';
import {
  Search,
  Filter,
  ChevronDown,
  Star,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Eye,
  Edit,
  Trash2,
  X,
  StarHalf,
} from 'lucide-react';
import { candidates } from '../data/mockData';

const stageColors = {
  Applied: 'bg-slate-100 text-slate-700',
  Screening: 'bg-blue-50 text-blue-700',
  Interview: 'bg-purple-50 text-purple-700',
  Offer: 'bg-amber-50 text-amber-700',
  Hired: 'bg-green-50 text-green-700',
  Rejected: 'bg-red-50 text-red-700',
};

function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />);
    } else if (i - 0.5 <= rating) {
      stars.push(<StarHalf key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />);
    } else {
      stars.push(<Star key={i} className="w-3.5 h-3.5 text-slate-200" />);
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

function CandidateDrawer({ candidate, onClose }) {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white shadow-2xl animate-slide-in overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-5 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-slate-800">Candidate Profile</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Profile Header */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-xl font-bold text-primary-700">{candidate.avatar}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-800">{candidate.name}</h3>
              <p className="text-sm text-slate-500">{candidate.role}</p>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${stageColors[candidate.stage]}`}
                >
                  {candidate.stage}
                </span>
                <StarRating rating={candidate.rating} />
                <span className="text-xs text-slate-400">{candidate.rating}</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-700">Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="w-4 h-4 text-slate-400" />
                {candidate.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone className="w-4 h-4 text-slate-400" />
                {candidate.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                {candidate.source}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-500">Department</p>
              <p className="text-sm font-medium text-slate-700">{candidate.department}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-500">Experience</p>
              <p className="text-sm font-medium text-slate-700">{candidate.experience}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-500">Applied Date</p>
              <p className="text-sm font-medium text-slate-700">{candidate.appliedDate}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-500">Source</p>
              <p className="text-sm font-medium text-slate-700">{candidate.source}</p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Notes</h4>
            <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3">{candidate.notes}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button className="flex-1 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
              Move to Next Stage
            </button>
            <button className="px-4 py-2.5 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
              Schedule Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Candidates() {
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const stages = ['All', 'Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'];
  const departments = ['All', ...new Set(candidates.map((c) => c.department))];

  const filtered = useMemo(() => {
    return candidates.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.role.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());
      const matchesStage = stageFilter === 'All' || c.stage === stageFilter;
      const matchesDept = departmentFilter === 'All' || c.department === departmentFilter;
      return matchesSearch && matchesStage && matchesDept;
    });
  }, [search, stageFilter, departmentFilter]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header title="Candidates" subtitle={`${filtered.length} candidates found`} />

      <div className="p-6">
        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, role, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors ${
                showFilters
                  ? 'bg-primary-50 text-primary-700 border-primary-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {(stageFilter !== 'All' || departmentFilter !== 'All') && (
                <span className="w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                  {(stageFilter !== 'All' ? 1 : 0) + (departmentFilter !== 'All' ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-4 flex-wrap animate-fade-in">
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Stage</label>
                <div className="flex gap-1.5 flex-wrap">
                  {stages.map((stage) => (
                    <button
                      key={stage}
                      onClick={() => setStageFilter(stage)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        stageFilter === stage
                          ? 'bg-primary-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Department</label>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              {(stageFilter !== 'All' || departmentFilter !== 'All') && (
                <button
                  onClick={() => {
                    setStageFilter('All');
                    setDepartmentFilter('All');
                  }}
                  className="text-xs text-primary-600 hover:text-primary-800 font-medium mt-4"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Candidates Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedCandidate(candidate)}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-primary-700">
                            {candidate.avatar}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{candidate.name}</p>
                          <p className="text-xs text-slate-500">{candidate.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-slate-700">{candidate.role}</p>
                      <p className="text-xs text-slate-400">{candidate.department}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          stageColors[candidate.stage]
                        }`}
                      >
                        {candidate.stage}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <StarRating rating={candidate.rating} />
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-slate-600">{candidate.source}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-slate-500">{candidate.appliedDate}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-slate-500">No candidates match your filters.</p>
              <button
                onClick={() => {
                  setSearch('');
                  setStageFilter('All');
                  setDepartmentFilter('All');
                }}
                className="mt-2 text-sm text-primary-600 hover:text-primary-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      <CandidateDrawer candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
    </div>
  );
}
