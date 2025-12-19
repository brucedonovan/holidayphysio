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
  const timerProgressPercent = timerDuration > 0 ? (timerSeconds / timerDuration) * 100 : 0;
  
  // Determine text color based on workout type
  let textColorClass = 'text-white';
  if (day.type === 'light') {
    textColorClass = 'text-blue-900';
  } else if (day.type === 'rest') {
    textColorClass = 'text-gray-700';
  } else if (day.type === 'optional') {
    textColorClass = 'text-amber-900';
  }

  return (
    <div className="sticky top-0 z-20">
      <div
        className={`bg-gradient-to-r ${getTypeColor(day.type)} ${textColorClass} shadow-lg`}
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
              <div className="text-3xl font-bold">
                {timerActive && formatTime ? formatTime(timerSeconds) : `${completionPercent}%`}
              </div>
              <p className="text-xs opacity-90">{timerActive ? 'Timer' : 'Today'}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Timer Progress Bar */}
      {timerActive && (
        <div className="h-3 bg-slate-300 bg-opacity-30 overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-100 ease-linear"
            style={{ width: `${timerProgressPercent}%` }}
          />
        </div>
      )}
    </div>
  );
}
