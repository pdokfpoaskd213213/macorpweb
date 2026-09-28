import type { BookingRequest } from './types';

export interface BookingFieldDef {
  key: keyof BookingRequest;
  label: string;
  hint: string;
}

/**
 * Single source of truth for the booking form's fields and their order.
 * The Phase 1 preview panel renders these read-only; the Phase 2 form
 * renders the same list as real inputs.
 */
export const BOOKING_FIELDS: BookingFieldDef[] = [
  { key: 'artistId', label: 'Artist', hint: 'Your signed act or project' },
  { key: 'producerId', label: 'Producer', hint: 'Engineer or producer on the session' },
  { key: 'studioId', label: 'Studio', hint: 'Room A, B or C' },
  { key: 'date', label: 'Date', hint: 'Calendar of open days' },
  { key: 'start', label: 'Time', hint: 'Available slots for the room' },
  { key: 'sessionType', label: 'Session', hint: 'Recording, mixing, mastering, production' },
];

export const SESSION_TYPE_LABELS = {
  recording: 'Recording',
  mixing: 'Mixing',
  mastering: 'Mastering',
  production: 'Production',
  rehearsal: 'Rehearsal',
} as const;
