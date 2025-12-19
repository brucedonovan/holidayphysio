'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import workoutPlan from '@/lib/workoutData';
import type { WorkoutDay } from '@/lib/workoutData';

export default function WorkoutTracker() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [checkedExercises, setCheckedExercises] = useState<Set<string>>(new Set());
  const [currentDay, setCurrentDay] = useState<WorkoutDay | null>(null);
  const [completionPercent, setCompletionPercent] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [completedDays, setCompletedDays] = useState(0);

  // Initialize on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const dateToUse = workoutPlan.find((d) => d.date === today)?.date || workoutPlan[0].date;
    setSelectedDate(dateToUse);

    // Load saved state from localStorage
    const saved = localStorage.getItem('checkedExercises');
    if (saved) {
      try {
        setCheckedExercises(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Failed to load saved state', e);
      }
    }
  }, []);

  // Calculate overall progress
  useEffect(() => {
    let totalExercises = 0;
    let totalChecked = 0;
    let daysCompleted = 0;

    workoutPlan.forEach((day) => {
      const filtered = day.exercises.filter((e) => !e.notes || e.notes !== 'Guidance');
      totalExercises += filtered.length;
      const dayChecked = filtered.filter((e) => checkedExercises.has(e.id)).length;
      totalChecked += dayChecked;
      
      // Mark day as completed if all exercises are checked
      if (filtered.length > 0 && dayChecked === filtered.length) {
        daysCompleted++;
      }
    });

    const percent = totalExercises > 0 ? Math.round((totalChecked / totalExercises) * 100) : 0;
    setOverallProgress(percent);
    setCompletedDays(daysCompleted);
  }, [checkedExercises]);

  // Update current day and completion percent when selected date changes
  useEffect(() => {
    const day = workoutPlan.find((d) => d.date === selectedDate);
    setCurrentDay(day || null);

    if (day) {
      const filteredExercises = day.exercises.filter(
        (e) => !e.notes || e.notes !== 'Guidance'
      );
      const checkedCount = filteredExercises.filter((e) => checkedExercises.has(e.id)).length;
      const percent = filteredExercises.length > 0 ? Math.round((checkedCount / filteredExercises.length) * 100) : 0;
      setCompletionPercent(percent);
    }
  }, [selectedDate, checkedExercises]);

  const toggleExercise = (exerciseId: string) => {
    const updated = new Set(checkedExercises);
    if (updated.has(exerciseId)) {
      updated.delete(exerciseId);
    } else {
      updated.add(exerciseId);
    }
    setCheckedExercises(updated);
    localStorage.setItem('checkedExercises', JSON.stringify(Array.from(updated)));
  };

  const goToToday = () => {
    const today = new Date().toISOString().split('T')[0];
    const dateToUse = workoutPlan.find((d) => d.date === today)?.date || workoutPlan[0].date;
    setSelectedDate(dateToUse);
  };

  const goToPrevious = () => {
    const currentIndex = workoutPlan.findIndex((d) => d.date === selectedDate);
    if (currentIndex > 0) {
      setSelectedDate(workoutPlan[currentIndex - 1].date);
    }
  };

  const goToNext = () => {
    const currentIndex = workoutPlan.findIndex((d) => d.date === selectedDate);
    if (currentIndex < workoutPlan.length - 1) {
      setSelectedDate(workoutPlan[currentIndex + 1].date);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full':
        return 'from-blue-500 to-blue-600';
      case 'light':
        return 'from-green-500 to-green-600';
      case 'rest':
        return 'from-slate-400 to-slate-500';
      case 'optional':
        return 'from-amber-500 to-amber-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'full':
        return 'Full Strength';
      case 'light':
        return 'Light Control';
      case 'rest':
        return 'Rest Day';
      case 'optional':
        return 'Optional';
      default:
        return type;
    }
  };

  if (!currentDay) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-white text-center">
          <p>Loading workout plan...</p>
        </div>
      </div>
    );
  }

  const currentIndex = workoutPlan.findIndex((d) => d.date === selectedDate);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === workoutPlan.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header with Menu Button */}
      <div className={`bg-gradient-to-r ${getTypeColor(currentDay.type)} text-white sticky top-0 z-20 shadow-lg`}>
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between mb-4">
            <div className="text-sm font-semibold opacity-90">ACL Holiday Physio</div>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm0 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm0 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>

          <h1 className="text-3xl font-bold">{currentDay.day}</h1>
          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-lg font-semibold">{getTypeLabel(currentDay.type)}</p>
              {currentDay.duration && <p className="text-sm opacity-90">{currentDay.duration}</p>}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{completionPercent}%</div>
              <p className="text-xs opacity-90">Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Menu */}
      <Dialog open={showMenu} onClose={setShowMenu} className="relative z-50">
        <div className="fixed inset-0" />
        
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="relative flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-base font-semibold text-white">Menu</DialogTitle>
                      <button
                        type="button"
                        onClick={() => setShowMenu(false)}
                        className="relative rounded-md text-blue-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-4">
                    {/* Overall Progress */}
                    <div className="p-4 bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg">
                      <p className="text-sm font-semibold text-slate-900 mb-3">Overall Progress</p>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-grow mr-3">
                          <div className="w-full bg-slate-300 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
                              style={{ width: `${overallProgress}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-lg font-bold text-slate-900 min-w-fit">{overallProgress}%</span>
                      </div>
                      <p className="text-xs text-slate-600">{completedDays} of {workoutPlan.length} days completed</p>
                    </div>

                    {/* Day Selection */}
                    <div className="border-t border-slate-200 pt-4 flex-1 flex flex-col">
                      <p className="text-sm font-semibold text-slate-900 mb-3 uppercase">Select a Day</p>
                      <div className="grid grid-cols-7 gap-2">
                        {workoutPlan.map((day, idx) => {
                          const isSelected = day.date === selectedDate;
                          const dayNum = idx + 1;
                          const allExercisesChecked = day.exercises.every((ex) =>
                            checkedExercises.has(`${day.date}-${ex.id}`)
                          );
                          
                          let bgColor = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                          if (isSelected) {
                            bgColor = 'bg-blue-500 text-white shadow-md ring-2 ring-blue-300';
                          } else if (allExercisesChecked) {
                            bgColor = 'bg-green-500 text-white shadow-md';
                          } else if (day.type === 'full') {
                            bgColor = 'bg-blue-100 text-blue-900 hover:bg-blue-200';
                          } else if (day.type === 'light') {
                            bgColor = 'bg-green-100 text-green-900 hover:bg-green-200';
                          } else if (day.type === 'rest') {
                            bgColor = 'bg-slate-300 text-slate-700 hover:bg-slate-400';
                          } else if (day.type === 'optional') {
                            bgColor = 'bg-amber-100 text-amber-900 hover:bg-amber-200';
                          }
                          
                          return (
                            <button
                              key={day.date}
                              onClick={() => {
                                setSelectedDate(day.date);
                                setShowMenu(false);
                              }}
                              className={`p-2 rounded font-semibold transition-all text-xs ${bgColor}`}
                              title={day.day}
                            >
                              {dayNum}
                            </button>
                          );
                        })}
                      </div>

                      {/* Day Legend */}
                      <div className="border-t border-slate-200 mt-4 pt-4 text-xs text-slate-600">
                        <p className="font-semibold text-slate-900 mb-2">Legend</p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-blue-100 border border-blue-300" />
                            <span>Full Workout</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-green-100 border border-green-300" />
                            <span>Light Workout</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-slate-300" />
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

                      {/* Safety Notes - Moved to bottom */}
                      <div className="mt-auto border-t border-slate-200 pt-4">
                        <button
                          onClick={() => setShowWarning(!showWarning)}
                          className="w-full text-left px-3 py-2 rounded hover:bg-slate-100 transition-colors font-semibold text-sm text-red-700 flex items-center justify-between"
                        >
                          ⚠️ Safety Notes {showWarning ? '▼' : '▶'}
                        </button>

                        {showWarning && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <ul className="text-sm text-red-800 space-y-2">
                              <li>• No swelling the following day = appropriate load</li>
                              <li>• Mild stiffness is normal</li>
                              <li>• Stop if instability, sharp pain, or catching occurs</li>
                              <li>• Consistency matters more than perfection</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto px-4 pt-4">
        <div className="w-full bg-slate-300 rounded-full h-2 overflow-hidden">
          <div
            className={`bg-gradient-to-r ${getTypeColor(currentDay.type)} h-full transition-all duration-300`}
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Exercises List */}
        <div className="space-y-3">
          {currentDay.exercises.map((exercise) => {
            const isChecked = checkedExercises.has(exercise.id);
            const isGuidance = exercise.notes === 'Guidance';

            return (
              <div
                key={exercise.id}
                className={`rounded-lg border-2 transition-all ${
                  isGuidance
                    ? 'bg-blue-50 border-blue-200'
                    : isChecked
                    ? 'bg-green-50 border-green-300 shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => !isGuidance && toggleExercise(exercise.id)}
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
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
                      </svg>
                    </div>
                  )}

                  {/* Exercise Details */}
                  <div className="flex-grow">
                    <p className={`font-semibold text-lg ${isGuidance ? 'text-blue-700' : isChecked ? 'text-green-700 line-through' : 'text-slate-900'}`}>
                      {exercise.name}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exercise.sets && (
                        <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                          {exercise.sets}
                        </span>
                      )}
                      {exercise.reps && (
                        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {exercise.reps}
                        </span>
                      )}
                      {exercise.duration && (
                        <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                          {exercise.duration}
                        </span>
                      )}
                    </div>
                    {exercise.notes && exercise.notes !== 'Guidance' && (
                      <p className="text-sm text-slate-600 mt-2 italic">💡 {exercise.notes}</p>
                    )}
                    {exercise.notes && exercise.notes === 'Optional' && (
                      <p className="text-sm text-amber-600 mt-2 font-medium">⚠️ Optional</p>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex gap-2">
            <button
              onClick={goToPrevious}
              disabled={isFirst}
              className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
                isFirst
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-500 text-white hover:bg-slate-600 active:scale-95'
              }`}
            >
              ← Previous
            </button>
            <button
              onClick={goToToday}
              className="flex-1 py-3 rounded-lg font-semibold text-sm bg-blue-500 text-white hover:bg-blue-600 active:scale-95 transition-all"
            >
              Today
            </button>
            <button
              onClick={goToNext}
              disabled={isLast}
              className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
                isLast
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-500 text-white hover:bg-slate-600 active:scale-95'
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
