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
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-4 flex flex-col">
      {/* Overall Progress */}
      <div className="p-4 bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg">
        <p className="text-sm font-semibold text-slate-900 mb-3">
          Overall Progress
        </p>
        <div className="flex items-center justify-between mb-2">
          <div className="flex-grow mr-3">
            <div className="w-full bg-slate-300 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
          <span className="text-lg font-bold text-slate-900 min-w-fit">
            {overallProgress}%
          </span>
        </div>
        <p className="text-xs text-slate-600">
          {completedDays} of {workoutPlan.length} days completed
        </p>
      </div>

      {/* Day Selection */}
      <div className="border-t border-slate-200 pt-4 flex-1 flex flex-col">
        <p className="text-sm font-semibold text-slate-900 mb-3 uppercase">
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
                className={`p-2 rounded font-semibold transition-all text-xs ${bgColor} ${borderStyle}`}
                title={day.day}
              >
                <div className="whitespace-normal">{day.date}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Day Legend */}
      <div className="border-t border-slate-200 pt-4 text-xs text-slate-600">
        <p className="font-semibold text-slate-900 mb-2">Legend</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-slate-100 border-2 border-blue-500 ring-2 ring-blue-500 ring-offset-1" />
            <span>Selected Day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-100 border border-blue-300" />
            <span>Full Workout</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-50 border border-blue-300" />
            <span>Light Workout</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-white border border-slate-300" />
            <span>Rest Day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-amber-100 border border-amber-300" />
            <span>Optional</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500" />
            <span>Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
