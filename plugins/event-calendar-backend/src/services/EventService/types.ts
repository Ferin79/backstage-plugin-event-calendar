export interface Event {
  id: number;
  title: string;
  start: string;
  end: string;
  rrule?: string;
}

export interface EventService {
  getEvents(): Promise<{ events: Event[] }>;
}
