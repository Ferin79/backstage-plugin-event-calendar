import {
  LoggerService,
  RootConfigService,
} from '@backstage/backend-plugin-api';
import { Event, EventService } from './types';
import { z } from 'zod';
import { getRecurringEvents } from '../../utils/getRecurringEvents';

interface Options {
  config: RootConfigService;
  logger: LoggerService;
}

const EventSchema = z.object({
  id: z.number(),
  title: z.string(),
  start: z.string(),
  end: z.string(),
  recurrence: z.string().optional(),
});

export const CreateEventService = async ({
  config,
  logger,
}: Options): Promise<EventService> => {
  logger.info('Initializing EventService');

  return {
    async getEvents() {
      const configEvents = config.get(
        'eventsCalendar.sources.localEvents',
      ) as Event[];
      if (
        !Array.isArray(configEvents) ||
        !configEvents.every(e => EventSchema.safeParse(e).success)
      ) {
        return { events: [] };
      }
      return { events: configEvents.flatMap(getRecurringEvents) };
    },
  };
};
