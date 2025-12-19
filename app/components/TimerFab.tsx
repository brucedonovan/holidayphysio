interface TimerFabProps {
  isActive: boolean;
  onClick: () => void;
}

export function TimerFab({ isActive, onClick }: TimerFabProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40 pointer-events-auto">
      <button
        onClick={onClick}
        type="button"
        className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center font-bold text-2xl transition-all active:scale-95 select-none cursor-pointer ${
          isActive
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        aria-label={isActive ? 'Stop timer' : 'Start timer'}
      >
        {isActive ? '⏹' : '⏱'}
      </button>
    </div>
  );
}
