export interface EventResource {
  location?: string;
  meetingLink?: string;
}

export interface Event {
  id: number;
  title: string;
  start: string;
  end: string;
  desc?: string;
  rrule?: string;
  allDay?: boolean;
  resource?: EventResource;
}

export interface EventsResponse {
  events: Event[];
}
