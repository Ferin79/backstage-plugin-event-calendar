import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { CreateEventService } from './services/EventService/createEventService';

/**
 * eventCalendarBackendPlugin backend plugin
 *
 * @public
 */
export const eventCalendarBackendPlugin = createBackendPlugin({
  pluginId: 'event-calendar-backend',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        httpRouter: coreServices.httpRouter,
        config: coreServices.rootConfig,
      },
      async init({ logger, httpRouter, config }) {
        const eventService = await CreateEventService({ config, logger });

        httpRouter.use(
          await createRouter({
            eventService,
          }),
        );
      },
    });
  },
});
