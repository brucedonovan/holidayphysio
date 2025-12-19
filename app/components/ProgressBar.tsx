interface ProgressBarProps {
  percent: number;
  label: string;
}

export function ProgressBar({ percent, label }: ProgressBarProps) {
  return (
    <div className="sticky top-0 z-10 bg-white shadow-md p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="w-full bg-slate-300 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-semibold text-slate-700 min-w-fit">{label}</span>
        </div>
      </div>
    </div>
  );
}
