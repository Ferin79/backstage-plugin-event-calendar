import { RRule } from 'rrule';
import { Event } from './../services/EventService/types';

export const getRecurringEvents = (event: Event): Event[] => {
  if (!event.recurrence?.trim().length) {
    return [event];
  }

  const rule = RRule.fromString(event.recurrence);
  const startTime = event.start.split('T')[1];
  const endTime = event.end.split('T')[1];

  return rule.all().map(date => {
    const dateString = date.toISOString().split('T')[0];
    const start = new Date(`${dateString}T${startTime}`);
    const end = new Date(`${dateString}T${endTime}`);

    delete event.recurrence;

    return {
      ...event,
      start: start.toISOString(),
      end: end.toISOString(),
    } as Event;
  });
};
