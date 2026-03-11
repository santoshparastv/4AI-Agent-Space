import { useState } from 'react';
import Header from '../components/Header';
import { GripVertical, MoreHorizontal, Star, Clock, ChevronRight } from 'lucide-react';
import { candidates, pipelineStages } from '../data/mockData';

function CandidateCard({ candidate, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, candidate)}
      className="kanban-card bg-white rounded-lg border border-slate-200 p-3.5 cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-semibold text-primary-700">{candidate.avatar}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 truncate">{candidate.name}</p>
          <p className="text-xs text-slate-500 truncate">{candidate.role}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-xs text-slate-500">{candidate.rating}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Clock className="w-3 h-3" />
          {candidate.experience}
        </div>
      </div>

      {candidate.skills.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1">
          {candidate.skills.slice(0, 2).map((skill) => (
            <span key={skill} className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[10px] font-medium rounded">
              {skill}
            </span>
          ))}
          {candidate.skills.length > 2 && (
            <span className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[10px] font-medium rounded">
              +{candidate.skills.length - 2}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default function Pipeline() {
  const [pipelineCandidates, setPipelineCandidates] = useState(candidates);
  const [dragOverStage, setDragOverStage] = useState(null);

  const getCandidatesForStage = (stageId) => {
    return pipelineCandidates.filter(
      (c) => c.stage.toLowerCase() === stageId.toLowerCase() && c.status !== 'rejected'
    );
  };

  const handleDragStart = (e, candidate) => {
    e.dataTransfer.setData('candidateId', candidate.id.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, stageId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverStage(stageId);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = (e, stageId) => {
    e.preventDefault();
    setDragOverStage(null);
    const candidateId = parseInt(e.dataTransfer.getData('candidateId'));
    const stageLabel = pipelineStages.find((s) => s.id === stageId)?.label || stageId;

    setPipelineCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId
          ? { ...c, stage: stageLabel, status: stageId === 'hired' ? 'hired' : 'active' }
          : c
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header title="Pipeline" subtitle="Drag candidates between stages to update their progress" />

      <div className="p-6">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {pipelineStages.map((stage) => {
            const stageCandidates = getCandidatesForStage(stage.id);
            const isOver = dragOverStage === stage.id;

            return (
              <div
                key={stage.id}
                className="flex-shrink-0 w-[300px]"
                onDragOver={(e) => handleDragOver(e, stage.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${stage.dotColor}`} />
                    <h3 className="text-sm font-semibold text-slate-700">{stage.label}</h3>
                    <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {stageCandidates.length}
                    </span>
                  </div>
                  <button className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Column Body */}
                <div
                  className={`rounded-xl p-2 min-h-[400px] transition-colors duration-200 ${
                    isOver
                      ? 'bg-primary-50 border-2 border-dashed border-primary-300'
                      : 'bg-slate-100/60 border-2 border-transparent'
                  }`}
                >
                  <div className="space-y-2.5">
                    {stageCandidates.map((candidate) => (
                      <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        onDragStart={handleDragStart}
                      />
                    ))}

                    {stageCandidates.length === 0 && (
                      <div className="py-8 text-center">
                        <p className="text-xs text-slate-400">
                          {isOver ? 'Drop here' : 'No candidates'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
