import React from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { CheckpointItem } from '../types';
import { StatusBadge } from './StatusBadge';

interface CheckpointTimelineProps {
  checkpoints: CheckpointItem[];
}

export const CheckpointTimeline: React.FC<CheckpointTimelineProps> = ({ checkpoints }) => {
  if (!checkpoints || checkpoints.length === 0) {
    return (
      <div className="py-8 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
        <p className="text-sm">No transit checkpoints logged yet for this shipment.</p>
      </div>
    );
  }

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return {
        date: d.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        time: d.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      };
    } catch {
      return { date: dateStr, time: '' };
    }
  };

  return (
    <div className="relative pl-6 sm:pl-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
      <div className="space-y-6">
        {checkpoints.map((cp, idx) => {
          const { date, time } = formatDate(cp.timestamp);
          const isLatest = idx === 0;

          return (
            <div key={cp.id || idx} className="relative group">
              {/* Timeline indicator node */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  isLatest
                    ? 'bg-brand-gold border-brand-navy shadow-gold-glow ring-4 ring-brand-gold/20'
                    : 'bg-white border-slate-300 group-hover:border-brand-gold'
                }`}
              >
                <div
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                    isLatest ? 'bg-brand-navy animate-pulse' : 'bg-slate-400'
                  }`}
                />
              </div>

              {/* Event card */}
              <div
                className={`p-4 sm:p-5 rounded-xl border transition-all ${
                  isLatest
                    ? 'bg-white border-brand-gold/40 shadow-md ring-1 ring-brand-gold/10'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={cp.status} size="sm" />
                    {isLatest && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-brand-gold/15 text-brand-gold-dark rounded-full">
                        Latest Activity
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {date}
                    </span>
                    {time && (
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {time}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2 mb-2 text-slate-700 font-semibold text-sm sm:text-base">
                  <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <span>{cp.location}</span>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pl-6">
                  {cp.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
