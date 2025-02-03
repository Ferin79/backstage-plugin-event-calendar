export interface Event {
  id: number;
  title: string;
  start: string;
  end: string;
  rrule?: string;
}

export interface EventsResponse {
  events: Event[];
}
