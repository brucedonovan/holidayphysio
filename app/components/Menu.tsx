import workoutPlan from '@/lib/workoutData';
import { MoonIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface MenuProps {
  selectedDate: string;
  overallProgress: number;
  completedDays: number;
  checkedExercises: Set<string>;
  onDateChange: (date: string) => void;
}

export function Menu({
  selectedDate,
  overallProgress,
  completedDays,
  checkedExercises,
  onDateChange,
}: MenuProps) {
  return (
    <div className="flex-1 overflow-y-auto px-3 py-3 sm:px-4 space-y-2 flex flex-col">
      {/* Overall Progress */}
      <div className="p-3 bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg">
        <p className="text-xs font-semibold text-slate-900 mb-2">
          Overall Progress
        </p>
        <div className="flex items-center justify-between mb-1">
          <div className="flex-grow mr-2">
            <div className="w-full bg-slate-300 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-bold text-slate-900 min-w-fit">
            {overallProgress}%
          </span>
        </div>
        <p className="text-xs text-slate-600">
          {completedDays} of {workoutPlan.length} days
        </p>
      </div>

      {/* Day Selection */}
      <div className="border-t border-slate-200 pt-2 flex-1 flex flex-col">
        <p className="text-xs font-semibold text-slate-900 mb-2 uppercase">
          Select a Day
        </p>
        <div className="grid grid-cols-2 gap-2 overflow-y-auto">
          {workoutPlan.map((day) => {
            const isSelected = day.date === selectedDate;
            const allExercisesChecked = day.exercises.every((ex) =>
              checkedExercises.has(ex.id)
            );
            const dayProgress = Math.round(
              (day.exercises.filter((ex) => checkedExercises.has(ex.id)).length /
                day.exercises.length) *
                100
            );

            let bgColor = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
            let borderStyle = '';

            if (allExercisesChecked) {
              bgColor = 'bg-green-500 text-white shadow-md';
            } else if (day.type === 'full') {
              bgColor = 'bg-blue-600 text-white hover:bg-blue-700';
            } else if (day.type === 'light') {
              bgColor = 'bg-blue-300 text-blue-900 hover:bg-blue-400';
            } else if (day.type === 'rest') {
              bgColor =
                'bg-gray-200 text-gray-700 hover:bg-gray-300';
            } else if (day.type === 'optional') {
              bgColor = 'bg-amber-200 text-amber-900 hover:bg-amber-300';
            }

            if (isSelected) {
              borderStyle = 'ring-2 ring-blue-500 ring-offset-2 shadow-lg';
            }

            return (
              <button
                key={day.date}
                onClick={() => onDateChange(day.date)}
                className={`p-2 rounded font-semibold transition-all text-xs ${bgColor} ${borderStyle} flex items-center gap-2`}
                title={day.day}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-white bg-opacity-20 relative overflow-hidden">
                  {allExercisesChecked ? (
                    <CheckCircleIcon className="w-4 h-4" />
                  ) : day.type === 'full' ? (
                    <div className="w-full h-full rounded-full" style={{
                      background: 'linear-gradient(to top, rgb(7, 89, 133) 75%, transparent 75%)'
                    }} />
                  ) : day.type === 'light' ? (
                    <div className="w-full h-full rounded-full opacity-70 relative" style={{
                      background: 'linear-gradient(to top, rgb(7, 89, 133) 50%, transparent 50%)'
                    }} />
                  ) : day.type === 'rest' ? (
                    <MoonIcon className="w-4 h-4" />
                  ) : day.type === 'optional' ? (
                    <div className="w-full h-full rounded-full opacity-70 relative" style={{
                      background: 'linear-gradient(to top, rgb(7, 89, 133) 25%, transparent 25%)'
                    }} />
                  ) : null}
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-xs leading-tight">{day.date}</div>
                  {dayProgress > 0 && dayProgress < 100 && (
                    <div className="text-xs">{dayProgress}% completed</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
