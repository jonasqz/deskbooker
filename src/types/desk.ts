export interface Desk {
  id: string;
  name: string;
  location: string;
  isAvailable: boolean;
  bookings?: DeskBooking[];
}

export interface DeskBooking {
  id: string;
  deskId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface Booking {
  id: string;
  deskId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
}