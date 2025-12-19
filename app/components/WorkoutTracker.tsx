'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import workoutPlan from '@/lib/workoutData';
import type { WorkoutDay } from '@/lib/workoutData';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { ExerciseItem } from './ExerciseItem';
import { Menu } from './Menu';
import { SplashScreen } from './SplashScreen';
import {
  formatTime,
  playNotificationSound,
} from '@/app/lib/timerUtils';
import { getTypeColor, getTypeLabel, getTodayDate } from '@/app/lib/workoutUtils';

const TIMER_DURATION = 30;

export default function WorkoutTracker() {
  // State
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [checkedExercises, setCheckedExercises] = useState<Set<string>>(
    new Set()
  );
  const [currentDay, setCurrentDay] = useState<WorkoutDay | null>(null);
  const [completionPercent, setCompletionPercent] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [completedDays, setCompletedDays] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerDuration, setTimerDuration] = useState(30);
  const [showSplash, setShowSplash] = useState(true);

  // Initialize on mount
  useEffect(() => {
    const today = getTodayDate();
    let dateToUse = workoutPlan[0].date;
    
    // Try to find today's date
    const todayInPlan = workoutPlan.find((d) => d.date === today);
    if (todayInPlan) {
      dateToUse = todayInPlan.date;
    } else {
      // Find the closest date
      const todayDate = new Date(today);
      let closestDay = workoutPlan[0];
      let closestDiff = Math.abs(new Date(closestDay.date).getTime() - todayDate.getTime());
      
      for (const day of workoutPlan) {
        const dayDate = new Date(day.date);
        const diff = Math.abs(dayDate.getTime() - todayDate.getTime());
        if (diff < closestDiff) {
          closestDiff = diff;
          closestDay = day;
        }
      }
      dateToUse = closestDay.date;
    }
    
    setSelectedDate(dateToUse);

    const saved = localStorage.getItem('checkedExercises');
    if (saved) {
      try {
        setCheckedExercises(new Set(JSON.parse(saved)));
      } catch {
        // Failed to load saved state, using empty set
      }
    }
  }, []);

  // Calculate overall progress
  useEffect(() => {
    let totalExercises = 0;
    let totalChecked = 0;
    let daysCompleted = 0;

    workoutPlan.forEach((day) => {
      const filtered = day.exercises.filter(
        (e) => !e.notes || e.notes !== 'Guidance'
      );
      totalExercises += filtered.length;
      const dayChecked = filtered.filter((e) =>
        checkedExercises.has(e.id)
      ).length;
      totalChecked += dayChecked;

      if (filtered.length > 0 && dayChecked === filtered.length) {
        daysCompleted++;
      }
    });

    const percent =
      totalExercises > 0 ? Math.round((totalChecked / totalExercises) * 100) : 0;
    setOverallProgress(percent);
    setCompletedDays(daysCompleted);
  }, [checkedExercises]);

  // Update current day and completion percent
  useEffect(() => {
    const day = workoutPlan.find((d) => d.date === selectedDate);
    setCurrentDay(day || null);

    if (day) {
      const filteredExercises = day.exercises.filter(
        (e) => !e.notes || e.notes !== 'Guidance'
      );
      const checkedCount = filteredExercises.filter((e) =>
        checkedExercises.has(e.id)
      ).length;
      const percent =
        filteredExercises.length > 0
          ? Math.round((checkedCount / filteredExercises.length) * 100)
          : 0;
      setCompletionPercent(percent);
    }
  }, [selectedDate, checkedExercises]);

  // Timer logic
  useEffect(() => {
    if (!timerActive) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setTimerActive(false);
          playNotificationSound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive]);

  // Handlers
  const handleToggleExercise = (exerciseId: string) => {
    const updated = new Set(checkedExercises);
    if (updated.has(exerciseId)) {
      updated.delete(exerciseId);
    } else {
      updated.add(exerciseId);
    }
    setCheckedExercises(updated);
    localStorage.setItem('checkedExercises', JSON.stringify(Array.from(updated)));
  };

  const handleStartTimer = () => {
    setTimerSeconds(timerDuration);
    setTimerActive(true);
  };

  const handleStopTimer = () => {
    setTimerActive(false);
    setTimerSeconds(0);
  };

  const handleTimerDurationSelect = (duration: number) => {
    setTimerDuration(duration);
    setTimerSeconds(duration);
    setTimerActive(true);
  };

  const handleFabClick = () => {
    if (timerActive) {
      handleStopTimer();
    } else {
      handleStartTimer();
    }
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setShowMenu(false);
  };

  const handleNavigate = (direction: 'prev' | 'next' | 'today') => {
    const currentIndex = workoutPlan.findIndex((d) => d.date === selectedDate);

    if (direction === 'prev' && currentIndex > 0) {
      setSelectedDate(workoutPlan[currentIndex - 1].date);
    } else if (direction === 'next' && currentIndex < workoutPlan.length - 1) {
      setSelectedDate(workoutPlan[currentIndex + 1].date);
    } else if (direction === 'today') {
      const today = getTodayDate();
      const dateToUse =
        workoutPlan.find((d) => d.date === today)?.date || workoutPlan[0].date;
      setSelectedDate(dateToUse);
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
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
      <Header
        day={currentDay}
        completionPercent={completionPercent}
        timerActive={timerActive}
        timerSeconds={timerSeconds}
        timerDuration={timerDuration}
        formatTime={formatTime}
        onMenuClick={() => setShowMenu(true)}
        getTypeColor={getTypeColor}
        getTypeLabel={getTypeLabel}
      />

      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto">
      {/* Menu Dialog */}
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
                  <div className="flex justify-end p-4">
                    <button
                      type="button"
                      onClick={() => setShowMenu(false)}
                      className="relative rounded-md text-slate-400 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      aria-label="Close menu"
                    >
                      <span className="absolute -inset-2.5" />
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                  </div>

                  <Menu
                    selectedDate={selectedDate}
                    overallProgress={overallProgress}
                    completedDays={completedDays}
                    checkedExercises={checkedExercises}
                    onDateChange={handleDateChange}
                  />
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-3">
          {currentDay.exercises.map((exercise) => {
            const isChecked = checkedExercises.has(exercise.id);
            const isGuidance = exercise.notes === 'Guidance';

            return (
              <ExerciseItem
                key={exercise.id}
                id={exercise.id}
                name={exercise.name}
                sets={exercise.sets}
                reps={exercise.reps}
                duration={exercise.duration}
                notes={exercise.notes}
                isChecked={isChecked}
                isGuidance={isGuidance}
                onToggle={() => handleToggleExercise(exercise.id)}
              />
            );
          })}
        </div>
      </div>
      </div>

      {/* Navigation with Timer */}
      <Navigation
        isTimerActive={timerActive}
        onTimerClick={handleFabClick}
        onTimerDurationSelect={handleTimerDurationSelect}
      />
    </div>
    </>
  );
}
