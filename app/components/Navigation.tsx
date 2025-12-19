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
    <div className="fixed bottom-6 right-6 z-30">
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
        className={`w-20 h-20 rounded-full font-semibold text-6xl transition-all active:scale-95 select-none cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center ${
          isTimerActive
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        aria-label={isTimerActive ? 'Stop timer' : 'Start timer'}
      >
        {isTimerActive ? '⏹' : '⏱'}
      </button>

      {/* Duration Menu */}
      {showMenu && !isTimerActive && (
        <div className="absolute bottom-full right-0 mb-3 bg-white rounded-lg shadow-xl p-3 space-y-2 z-40">
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
  );
}
