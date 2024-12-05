export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const isDateInPast = (date: string): boolean => {
  return new Date(date) < new Date(new Date().toDateString());
};

export const getTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let i = 9; i <= 17; i++) {
    slots.push(`${i.toString().padStart(2, '0')}:00`);
  }
  return slots;
};

export const isDeskAvailableForDate = (desk: { bookings?: { date: string }[] }, date: string): boolean => {
  if (!desk.bookings) return true;
  return !desk.bookings.some(booking => booking.date === date);
};