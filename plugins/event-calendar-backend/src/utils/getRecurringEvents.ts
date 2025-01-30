import { RRule } from 'rrule';
import { Event } from './../services/EventService/types';

export const getRecurringEvents = (event: Event): Event[] => {
  if (!event.rrule?.trim().length) {
    return [event];
  }

  const rule = RRule.fromString(event.rrule);
  const occurrences = rule.all();

  return occurrences.map(startDate => {
    const start = new Date(startDate);
    const end = new Date(start);
    const [startHours, startMinutes] = event.start
      .split(' ')[1]
      .split(':')
      .map(Number);
    const [endHours, endMinutes] = event.end
      .split(' ')[1]
      .split(':')
      .map(Number);

    start.setHours(startHours, startMinutes, 0, 0);
    end.setHours(endHours, endMinutes, 0, 0);

    const e: Event = {
      id: event.id,
      title: event.title,
      start: start.toUTCString(),
      end: end.toUTCString(),
    };

    return e;
  });
};
