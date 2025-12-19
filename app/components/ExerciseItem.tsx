interface ExerciseItemProps {
  id: string;
  name: string;
  sets?: string;
  reps?: string;
  duration?: string;
  notes?: string;
  isChecked: boolean;
  isGuidance: boolean;
  onToggle: () => void;
}

export function ExerciseItem({
  id,
  name,
  sets,
  reps,
  duration,
  notes,
  isChecked,
  isGuidance,
  onToggle,
}: ExerciseItemProps) {
  return (
    <div
      className={`rounded-lg border-2 transition-all ${
        isGuidance
          ? 'bg-blue-50 border-blue-200'
          : isChecked
          ? 'bg-green-50 border-green-300 shadow-md'
          : 'bg-white border-slate-200 hover:border-slate-300'
      }`}
    >
      <button
        onClick={() => !isGuidance && onToggle()}
        disabled={isGuidance}
        className={`w-full px-4 py-4 text-left flex items-start gap-3 ${!isGuidance ? 'cursor-pointer' : 'cursor-default'}`}
      >
        {/* Checkbox */}
        {!isGuidance && (
          <div
            className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center mt-0.5 transition-all ${
              isChecked
                ? 'bg-green-500 border-green-600'
                : 'border-slate-300 bg-white'
            }`}
          >
            {isChecked && (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        )}
        {isGuidance && (
          <div className="flex-shrink-0 w-6 h-6 rounded-lg border-2 border-blue-300 bg-blue-100 flex items-center justify-center mt-0.5">
            <svg
              className="w-4 h-4 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
            </svg>
          </div>
        )}

        {/* Exercise Details */}
        <div className="flex-grow">
          <p
            className={`font-semibold text-lg ${
              isGuidance
                ? 'text-blue-700'
                : isChecked
                ? 'text-green-700 line-through'
                : 'text-slate-900'
            }`}
          >
            {name}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {sets && (
              <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                {sets}
              </span>
            )}
            {reps && (
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {reps}
              </span>
            )}
            {duration && (
              <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                {duration}
              </span>
            )}
          </div>
          {notes && notes !== 'Guidance' && (
            <p className="text-sm text-slate-600 mt-2 italic">💡 {notes}</p>
          )}
        </div>
      </button>
    </div>
  );
}
