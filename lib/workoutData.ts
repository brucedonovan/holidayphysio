export interface Exercise {
  id: string;
  name: string;
  sets?: string;
  reps?: string;
  duration?: string;
  notes?: string;
}

export interface WorkoutDay {
  date: string;
  day: string;
  type: 'rest' | 'light' | 'full' | 'optional';
  duration?: string;
  exercises: Exercise[];
}

const workoutPlan: WorkoutDay[] = [
  {
    date: '2025-12-21',
    day: 'Sunday, 21 Dec',
    type: 'full',
    duration: '45min-1hr',
    exercises: [
      { id: 'mobility-1', name: 'Mobility', duration: '5–8 min' },
      { id: 'toes-heels-1', name: 'Walk on toes / heels', sets: '2 rounds' },
      { id: 'glute-iso-1', name: 'Glute bridge isometric (both feet)', sets: '3', duration: '30–40s' },
      { id: 'glute-single-1', name: 'Single-leg glute bridge concentric', sets: '3', reps: '8 / side' },
      { id: 'wall-sits-1', name: 'Wall sits', sets: '3', duration: '30–45s' },
      { id: 'knee-hyper-1', name: 'Knee hyperextension control', sets: '3', reps: '10' },
      { id: 'squat-box-1', name: 'Squat to box', sets: '3', reps: '10' },
      { id: 'lateral-plank-1', name: 'Lateral plank', sets: '3', duration: '30s / side' },
      { id: 'calf-raises-1', name: 'Calf raises', sets: '3', reps: '20' },
    ],
  },
  {
    date: '2025-12-22',
    day: 'Monday, 22 Dec',
    type: 'light',
    duration: '30–40 min',
    exercises: [
      { id: 'mobility-2', name: 'Mobility', duration: '8 min' },
      { id: 'toes-heels-2', name: 'Walk on toes / heels', sets: '2 rounds' },
      { id: 'glute-iso-2', name: 'Glute bridge isometric', sets: '2', duration: '30s' },
      { id: 'squat-box-2', name: 'Squat to box', sets: '2', reps: '8' },
      { id: 'lateral-plank-2', name: 'Lateral plank', sets: '2', duration: '30s / side' },
      { id: 'calf-raises-2', name: 'Calf raises', sets: '2', reps: '20' },
    ],
  },
  {
    date: '2025-12-23',
    day: 'Tuesday, 23 Dec',
    type: 'rest',
    exercises: [
      { id: 'rest-1', name: 'Gentle walking and light stretching only' },
    ],
  },
  {
    date: '2025-12-24',
    day: 'Wednesday, 24 Dec',
    type: 'light',
    duration: '30–40 min',
    exercises: [
      { id: 'mobility-3', name: 'Mobility', duration: '10 min' },
      { id: 'toes-heels-3', name: 'Walk on toes / heels', sets: '2 rounds' },
      { id: 'glute-iso-3', name: 'Glute bridge isometric', sets: '2', duration: '30s' },
      { id: 'calf-raises-3', name: 'Calf raises', sets: '2', reps: '20' },
    ],
  },
  {
    date: '2025-12-25',
    day: 'Thursday, 25 Dec',
    type: 'rest',
    exercises: [
      { id: 'rest-2', name: 'Rest' },
      { id: 'optional-mobility', name: 'Optional 5–10 min mobility if stiff', notes: 'Optional' },
    ],
  },
  {
    date: '2025-12-26',
    day: 'Friday, 26 Dec',
    type: 'full',
    duration: '45min-1hr',
    exercises: [
      { id: 'mobility-4', name: 'Mobility', duration: '5–8 min' },
      { id: 'toes-heels-4', name: 'Walk on toes / heels', sets: '2 rounds' },
      { id: 'glute-iso-4', name: 'Glute bridge isometric (both feet)', sets: '3', duration: '30–40s' },
      { id: 'glute-single-2', name: 'Single-leg glute bridge concentric', sets: '3', reps: '8 / side' },
      { id: 'wall-sits-2', name: 'Wall sits', sets: '3', duration: '30–45s' },
      { id: 'knee-hyper-2', name: 'Knee hyperextension control', sets: '3', reps: '10' },
      { id: 'squat-box-3', name: 'Squat to box', sets: '3', reps: '10' },
      { id: 'lateral-plank-3', name: 'Lateral plank', sets: '3', duration: '30s / side' },
      { id: 'calf-raises-4', name: 'Calf raises', sets: '3', reps: '20' },
      { id: 'effort-note', name: 'Keep effort ≤ 7/10', notes: 'Guidance' },
    ],
  },
  {
    date: '2025-12-27',
    day: 'Saturday, 27 Dec',
    type: 'light',
    duration: '30–40 min',
    exercises: [
      { id: 'mobility-5', name: 'Mobility', duration: '8 min' },
      { id: 'toes-heels-5', name: 'Walk on toes / heels', sets: '2 rounds' },
      { id: 'glute-single-3', name: 'Single-leg glute bridge', sets: '2', reps: '8 / side' },
      { id: 'squat-box-4', name: 'Squat to box', sets: '2', reps: '8' },
      { id: 'lateral-plank-4', name: 'Lateral plank', sets: '2', duration: '30s / side' },
      { id: 'calf-raises-5', name: 'Calf raises', sets: '2', reps: '20' },
    ],
  },
  {
    date: '2025-12-28',
    day: 'Sunday, 28 Dec',
    type: 'rest',
    exercises: [
      { id: 'rest-3', name: 'Gentle walk and mobility' },
    ],
  },
  {
    date: '2025-12-29',
    day: 'Monday, 29 Dec',
    type: 'full',
    duration: '45min-1hr',
    exercises: [
      { id: 'mobility-6', name: 'Mobility', duration: '5–8 min' },
      { id: 'toes-heels-6', name: 'Walk on toes / heels', sets: '2 rounds' },
      { id: 'glute-iso-5', name: 'Glute bridge isometric (both feet)', sets: '3', duration: '30–40s' },
      { id: 'glute-single-4', name: 'Single-leg glute bridge concentric', sets: '3', reps: '8 / side' },
      { id: 'wall-sits-3', name: 'Wall sits', sets: '3', duration: '30–45s', notes: 'Optional progression: 45–60s' },
      { id: 'knee-hyper-3', name: 'Knee hyperextension control', sets: '3', reps: '10' },
      { id: 'squat-box-5', name: 'Squat to box', sets: '3', reps: '10', notes: 'Optional progression: 3 × 12' },
      { id: 'lateral-plank-5', name: 'Lateral plank', sets: '3', duration: '30s / side' },
      { id: 'calf-raises-6', name: 'Calf raises', sets: '3', reps: '20' },
    ],
  },
  {
    date: '2025-12-30',
    day: 'Tuesday, 30 Dec',
    type: 'full',
    duration: '45min-1hr',
    exercises: [
      { id: 'mobility-7', name: 'Mobility', duration: '5–8 min' },
      { id: 'toes-heels-7', name: 'Walk on toes / heels', sets: '2 rounds' },
      { id: 'glute-iso-6', name: 'Glute bridge isometric (both feet)', sets: '3', duration: '30–40s' },
      { id: 'glute-single-5', name: 'Single-leg glute bridge concentric', sets: '3', reps: '8 / side' },
      { id: 'wall-sits-4', name: 'Wall sits', sets: '3', duration: '30–45s' },
      { id: 'knee-hyper-4', name: 'Knee hyperextension control', sets: '3', reps: '10' },
      { id: 'squat-box-6', name: 'Squat to box', sets: '3', reps: '10' },
      { id: 'lateral-plank-6', name: 'Lateral plank', sets: '3', duration: '30s / side' },
      { id: 'calf-raises-7', name: 'Calf raises', sets: '3', reps: '20' },
      { id: 'focus-note', name: 'Focus on quality and control', notes: 'Guidance' },
    ],
  },
  {
    date: '2025-12-31',
    day: 'Wednesday, 31 Dec',
    type: 'optional',
    duration: '15–30 min',
    exercises: [
      { id: 'mobility-8', name: 'Mobility', duration: '10 min' },
      { id: 'toes-heels-8', name: 'Walk on toes / heels', sets: '2 rounds' },
      { id: 'glute-iso-7', name: 'Glute bridge isometric', sets: '2', duration: '30s' },
      { id: 'calf-raises-8', name: 'Calf raises', sets: '2', reps: '20' },
    ],
  },
  {
    date: '2026-01-01',
    day: 'Thursday, 1 Jan',
    type: 'rest',
    exercises: [
      { id: 'rest-4', name: 'Walk and gentle mobility only' },
    ],
  },
  {
    date: '2026-01-02',
    day: 'Friday, 2 Jan',
    type: 'full',
    duration: '45min-1hr',
    exercises: [
      { id: 'mobility-9', name: 'Mobility', duration: '5–8 min' },
      { id: 'toes-heels-9', name: 'Walk on toes / heels', sets: '2 rounds' },
      { id: 'glute-iso-8', name: 'Glute bridge isometric (both feet)', sets: '3', duration: '30–40s' },
      { id: 'glute-single-6', name: 'Single-leg glute bridge concentric', sets: '3', reps: '8 / side' },
      { id: 'wall-sits-5', name: 'Wall sits', sets: '3', duration: '30–45s' },
      { id: 'knee-hyper-5', name: 'Knee hyperextension control', sets: '3', reps: '10' },
      { id: 'squat-box-7', name: 'Squat to box', sets: '3', reps: '10' },
      { id: 'lateral-plank-7', name: 'Lateral plank', sets: '3', duration: '30s / side' },
      { id: 'calf-raises-9', name: 'Calf raises', sets: '3', reps: '20' },
    ],
  },
  {
    date: '2026-01-03',
    day: 'Saturday, 3 Jan',
    type: 'optional',
    exercises: [
      { id: 'optional-light', name: 'Optional Light Control / Mobility', notes: 'Only if feeling fresh, otherwise rest' },
    ],
  },
];

export default workoutPlan;
