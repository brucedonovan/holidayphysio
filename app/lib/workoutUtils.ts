export function getTypeColor(type: string): string {
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
}

export function getTypeLabel(type: string): string {
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
}

export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}
