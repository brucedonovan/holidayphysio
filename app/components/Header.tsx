import { CalendarIcon } from '@heroicons/react/24/outline';
import type { WorkoutDay } from '@/lib/workoutData';

interface HeaderProps {
  day: WorkoutDay;
  completionPercent: number;
  timerActive?: boolean;
  timerSeconds?: number;
  timerDuration?: number;
  formatTime?: (seconds: number) => string;
  onMenuClick: () => void;
  getTypeColor: (type: string) => string;
  getTypeLabel: (type: string) => string;
}

export function Header({
  day,
  completionPercent,
  timerActive = false,
  timerSeconds = 0,
  timerDuration = 30,
  formatTime,
  onMenuClick,
  getTypeColor,
  getTypeLabel,
}: HeaderProps) {
  const isTimer = timerActive && timerSeconds > 0;

  return (
    <div
      className={`bg-gradient-to-r ${getTypeColor(day.type)} text-white sticky top-0 z-20 shadow-lg`}
    >
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{day.day}</h1>
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
            aria-label="Open menu"
          >
            <CalendarIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">{getTypeLabel(day.type)}</p>
            {day.duration && <p className="text-sm opacity-90">{day.duration}</p>}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{isTimer && formatTime ? formatTime(timerSeconds) : `${completionPercent}%`}</div>
            <p className="text-xs opacity-90">{isTimer ? 'Timer' : 'Today'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
