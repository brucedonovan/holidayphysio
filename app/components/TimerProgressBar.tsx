interface TimerProgressBarProps {
  timerSeconds: number;
  timerDuration: number;
  formatTime: (seconds: number) => string;
}

export function TimerProgressBar({
  timerSeconds,
  timerDuration,
  formatTime,
}: TimerProgressBarProps) {
  if (timerSeconds === 0) return null;

  const progressPercent = (timerSeconds / timerDuration) * 100;

  return (
    <div className="sticky top-0 z-10 bg-blue-50 shadow-md p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-bold text-blue-600 min-w-fit">
            {formatTime(timerSeconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
