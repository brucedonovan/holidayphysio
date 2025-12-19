import { useState, useRef } from 'react';

interface NavigationProps {
  isTimerActive: boolean;
  onTimerClick: () => void;
  onTimerDurationSelect?: (duration: number) => void;
}

export function Navigation({
  isTimerActive,
  onTimerClick,
  onTimerDurationSelect,
}: NavigationProps) {
  const [showMenu, setShowMenu] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    if (isTimerActive) return;
    longPressTimer.current = setTimeout(() => {
      setShowMenu(true);
    }, 500);
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    // If menu is open, don't call onTimerClick
    if (!showMenu) {
      onTimerClick();
    }
  };

  const handleSelectDuration = (duration: number) => {
    setShowMenu(false);
    onTimerDurationSelect?.(duration);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 shadow-lg">
      <div className="max-w-2xl mx-auto px-4 py-4 flex justify-center relative">
        <button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => clearTimeout(longPressTimer.current || undefined)}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onClick={() => {
            if (!showMenu) {
              onTimerClick();
            }
          }}
          type="button"
          className={`px-8 py-3 rounded-lg font-semibold text-base transition-all active:scale-95 select-none cursor-pointer ${
            isTimerActive
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          aria-label={isTimerActive ? 'Stop timer' : 'Start timer'}
        >
          {isTimerActive ? '⏹ Stop' : '⏱ Start Timer'}
        </button>

        {/* Duration Menu */}
        {showMenu && !isTimerActive && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg shadow-xl p-3 space-y-2 z-40">
            <button
              onClick={() => handleSelectDuration(30)}
              className="block w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded transition-colors whitespace-nowrap"
            >
              30 seconds
            </button>
            <button
              onClick={() => handleSelectDuration(45)}
              className="block w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded transition-colors whitespace-nowrap"
            >
              45 seconds
            </button>
            <button
              onClick={() => handleSelectDuration(60)}
              className="block w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded transition-colors whitespace-nowrap"
            >
              1 minute
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
