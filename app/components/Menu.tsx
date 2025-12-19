import { useState } from 'react';
import workoutPlan from '@/lib/workoutData';

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

            let bgColor = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
            let borderStyle = '';

            if (allExercisesChecked) {
              bgColor = 'bg-green-500 text-white shadow-md';
            } else if (day.type === 'full') {
              bgColor = 'bg-blue-100 text-blue-900 hover:bg-blue-200';
            } else if (day.type === 'light') {
              bgColor = 'bg-blue-50 text-blue-800 hover:bg-blue-100';
            } else if (day.type === 'rest') {
              bgColor =
                'bg-white text-slate-400 border-2 border-slate-200 hover:bg-slate-50';
            } else if (day.type === 'optional') {
              bgColor = 'bg-amber-100 text-amber-900 hover:bg-amber-200';
            }

            if (isSelected) {
              borderStyle = 'ring-2 ring-blue-500 ring-offset-2 shadow-lg';
            }

            return (
              <button
                key={day.date}
                onClick={() => onDateChange(day.date)}
                className={`p-1 rounded font-semibold transition-all text-xs ${bgColor} ${borderStyle}`}
                title={day.day}
              >
                <div className="whitespace-normal">{day.date}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Day Legend */}
      <div className="border-t border-slate-200 pt-2 text-xs text-slate-600">
        <p className="font-semibold text-slate-900 mb-1">Legend</p>
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-slate-100 border-2 border-blue-500 ring-2 ring-blue-500 ring-offset-1" />
            <span className="text-xs">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-blue-100 border border-blue-300" />
            <span className="text-xs">Full</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-blue-50 border border-blue-300" />
            <span className="text-xs">Light</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-white border border-slate-300" />
            <span className="text-xs">Rest</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-amber-100 border border-amber-300" />
            <span className="text-xs">Optional</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-green-500" />
            <span className="text-xs">Done</span>
          </div>
        </div>
      </div>
    </div>
  );
}
