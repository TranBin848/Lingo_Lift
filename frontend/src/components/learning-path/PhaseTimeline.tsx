import type { Phase } from '../../types/learningPath';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface PhaseTimelineProps {
  phases: Phase[];
  currentPhaseNumber: number;
}

export function PhaseTimeline({ phases, currentPhaseNumber }: PhaseTimelineProps) {
  const getPhaseIcon = (phase: Phase) => {
    if (phase.status === 'Completed') {
      return <CheckCircle2 className="w-6 h-6 text-green-500" />;
    } else if (phase.status === 'InProgress') {
      return <Clock className="w-6 h-6 text-blue-500 animate-pulse" />;
    } else {
      return <Circle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getLineColor = (phase: Phase) => {
    if (phase.status === 'Completed') {
      return 'bg-green-500';
    } else if (phase.status === 'InProgress') {
      return 'bg-gradient-to-r from-green-500 to-blue-500';
    } else {
      return 'bg-gray-300 dark:bg-gray-600';
    }
  };

  return (
    <div className="relative">
      {/* Desktop Timeline - Horizontal */}
      <div className="hidden lg:block">
        <div className="relative flex items-center justify-between px-8">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-gray-300 dark:bg-gray-600">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
              style={{
                width: `${((currentPhaseNumber - 1) / (phases.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Phase Nodes */}
          {phases.map((phase, index) => (
            <div key={phase.id} className="relative flex flex-col items-center z-10">
              {/* Icon Circle */}
              <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
                {getPhaseIcon(phase)}
              </div>

              {/* Phase Info */}
              <div className="mt-4 text-center max-w-[150px]">
                <p className="text-xs font-bold text-gray-900 dark:text-white mb-1">
                  Phase {phase.phaseNumber}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {phase.title.split(':')[1]?.trim() || phase.title}
                </p>
                {phase.status === 'InProgress' && (
                  <div className="mt-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                    In Progress
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Timeline - Vertical */}
      <div className="lg:hidden space-y-4">
        {phases.map((phase, index) => (
          <div key={phase.id} className="relative flex items-start gap-4">
            {/* Vertical Line */}
            {index < phases.length - 1 && (
              <div
                className={`absolute left-3 top-12 w-0.5 h-16 ${getLineColor(phase)}`}
              />
            )}

            {/* Icon */}
            <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-md z-10">
              {getPhaseIcon(phase)}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  Phase {phase.phaseNumber}
                </p>
                {phase.status === 'InProgress' && (
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                    Current
                  </span>
                )}
                {phase.status === 'Completed' && (
                  <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-medium">
                    Completed
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {phase.title}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {phase.description}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {phase.durationWeeks} weeks • Target: Band {phase.expectedBandScore}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
