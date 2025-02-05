export interface EventMetadata {
  location?: string;
  meetingLink?: string;
}

export interface Event {
  id: number;
  title: string;
  start: string; // ISO string or date-time format
  end: string; // ISO string or date-time format
  allDay?: boolean;
  recurrence?: string; // iCalendar RFC 5545 format
  description?: string;
  metadata?: EventMetadata;
}

export interface EventsResponse {
  events: Event[];
}
