import {
  LoggerService,
  RootConfigService,
} from '@backstage/backend-plugin-api/index';
import { Event, EventService } from './types';
import { z } from 'zod';

interface Options {
  config: RootConfigService;
  logger: LoggerService;
}

const EventSchema = z.object({
  id: z.number(),
  title: z.string(),
  start: z.string(),
  end: z.string(),
  rrule: z.string().optional(),
});

const EventsArraySchema = z.array(EventSchema);

export const CreateEventService = async ({
  config,
  logger,
}: Options): Promise<EventService> => {
  logger.info('Initializing EventService');

  return {
    async getEvents() {
      const configEvents = config.get('events-calendar.events') as Event[];

      const { success } = EventsArraySchema.safeParse(configEvents);

      return {
        events: success ? configEvents : [],
      };
    },
  };
};
