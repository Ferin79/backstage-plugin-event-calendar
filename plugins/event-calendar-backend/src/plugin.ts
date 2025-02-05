import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { CreateEventService } from './services/EventService/createEventService';
import { getEventsFromConfig } from './utils/getEventsFromConfig';

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
        urlReader: coreServices.urlReader,
      },
      async init({ logger, httpRouter, config, urlReader }) {
        const events = await getEventsFromConfig({ config, logger, urlReader });

        const eventService = await CreateEventService({
          logger,
          events,
        });

        httpRouter.use(
          await createRouter({
            eventService,
          }),
        );

        httpRouter.addAuthPolicy({
          path: '/events',
          allow: 'unauthenticated',
        });
      },
    });
  },
});
