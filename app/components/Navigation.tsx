import { useState, useRef } from 'react';
import { ClockIcon, StopIcon } from '@heroicons/react/24/solid';

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
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // If long-press menu would show, don't trigger click
    if (pressTimer.current !== null) {
      return;
    }
    
    // If menu is already open, close it instead of calling timer
    if (showMenu) {
      setShowMenu(false);
      return;
    }
    
    // Call the timer click handler
    onTimerClick();
  };

  const handlePressStart = () => {
    if (isTimerActive) return;
    
    // Start long press timer
    pressTimer.current = setTimeout(() => {
      setShowMenu(true);
      pressTimer.current = null;
    }, 500);
  };

  const handlePressEnd = () => {
    // Clear the long press timer if it hasn't fired yet
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const handleSelectDuration = (duration: number) => {
    setShowMenu(false);
    onTimerDurationSelect?.(duration);
  };

  return (
    <div className="fixed bottom-6 right-6 z-30">
      <button
        onClick={handleClick}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        type="button"
        className={`w-20 h-20 rounded-full font-semibold transition-all active:scale-95 select-none cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center ${
          isTimerActive
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        aria-label={isTimerActive ? 'Stop timer' : 'Start timer'}
      >
        {isTimerActive ? (
          <StopIcon className="w-10 h-10" />
        ) : (
          <ClockIcon className="w-10 h-10" />
        )}
      </button>

      {/* Duration Menu */}
      {showMenu && !isTimerActive && (
        <div className="absolute bottom-full right-0 mb-3 bg-white rounded-lg shadow-xl p-3 space-y-2 z-40">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelectDuration(30);
            }}
            className="block w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded transition-colors whitespace-nowrap"
          >
            30 seconds
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelectDuration(45);
            }}
            className="block w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded transition-colors whitespace-nowrap"
          >
            45 seconds
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSelectDuration(60);
            }}
            className="block w-full px-4 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded transition-colors whitespace-nowrap"
          >
            1 minute
          </button>
        </div>
      )}
    </div>
  );
}
