export function getTypeColor(type: string): string {
  switch (type) {
    case 'full':
      return 'from-blue-600 to-blue-700';
    case 'light':
      return 'from-blue-300 to-blue-400';
    case 'rest':
      return 'from-gray-200 to-gray-300';
    case 'optional':
      return 'from-amber-200 to-amber-300';
    default:
      return 'from-gray-200 to-gray-300';
  }
}

export function getTypeLabel(type: string): string {
  switch (type) {
    case 'full':
      return 'Full Day';
    case 'light':
      return 'Light Day';
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
