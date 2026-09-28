/**
 * Dooze Bot — studio booking domain.
 *
 * Phase 1 ships only these types, the field config and the entry panel.
 * Phase 2 adds: producer directory, availability/slots, the booking form,
 * and booking management (list / reschedule / cancel).
 */

export type SessionType = 'recording' | 'mixing' | 'mastering' | 'production' | 'rehearsal';

export interface Producer {
  id: string;
  name: string;
  labelId: string;
  specialties: SessionType[];
}

export interface TimeSlot {
  studioId: string;
  date: string; // yyyy-mm-dd
  start: string; // HH:mm
  end: string; // HH:mm
  available: boolean;
}

export interface BookingRequest {
  artistId: string;
  producerId: string;
  studioId: string;
  date: string;
  start: string;
  durationHours: number;
  sessionType: SessionType;
  notes?: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'declined' | 'cancelled';

export interface Booking extends BookingRequest {
  id: string;
  status: BookingStatus;
  requestedBy: string; // character id
  createdAt: string;
}
