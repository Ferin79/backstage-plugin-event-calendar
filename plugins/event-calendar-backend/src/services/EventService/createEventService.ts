import {
  LoggerService,
  RootConfigService,
} from '@backstage/backend-plugin-api/index';
import { EventService } from './types';

interface Options {
  config: RootConfigService;
  logger: LoggerService;
}

export const CreateEventService = async ({
  config,
  logger,
}: Options): Promise<EventService> => {
  logger.info('Initializing EventService');

  return {
    async getEvents() {
      const configEvents = config.getConfigArray('events-calendar.events');

      console.log(configEvents);

      return {
        events: [],
      };
    },
  };
};
