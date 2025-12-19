interface NavigationProps {
  isTimerActive: boolean;
  onTimerClick: () => void;
}

export function Navigation({
  isTimerActive,
  onTimerClick,
}: NavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 shadow-lg">
      <div className="max-w-2xl mx-auto px-4 py-4 flex justify-center">
        <button
          onClick={onTimerClick}
          type="button"
          className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center font-bold text-2xl transition-all active:scale-95 select-none cursor-pointer ${
            isTimerActive
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          aria-label={isTimerActive ? 'Stop timer' : 'Start timer'}
        >
          {isTimerActive ? '⏹' : '⏱'}
        </button>
      </div>
    </div>
  );
}
