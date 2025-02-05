import { LoggerService } from '@backstage/backend-plugin-api';
import { Event, EventService } from './types';

interface Options {
  logger: LoggerService;
  events: Event[];
}

export const CreateEventService = async ({
  logger,
  events,
}: Options): Promise<EventService> => {
  logger.info('Initializing EventService');

  return {
    async getEvents() {
      return { events };
    },
  };
};
