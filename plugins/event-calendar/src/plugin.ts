import {
  createComponentExtension,
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const eventCalendarPlugin = createPlugin({
  id: 'event-calendar',
  routes: {
    root: rootRouteRef,
  },
});

export const EventCalendarPage = eventCalendarPlugin.provide(
  createRoutableExtension({
    name: 'EventCalendarPage',
    component: () =>
      import('./components/Calendar').then(m => m.EventCalendarPage),
    mountPoint: rootRouteRef,
  }),
);

export const EventCalendarCard = eventCalendarPlugin.provide(
  createComponentExtension({
    name: 'EventCalendarCard',
    component: {
      lazy: () =>
        import('./components/Calendar').then(m => m.EventCalendarCard),
    },
  }),
);
