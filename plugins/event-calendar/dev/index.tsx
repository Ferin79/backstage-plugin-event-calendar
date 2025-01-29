import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { eventCalendarPlugin, EventCalendarPage } from '../src/plugin';

createDevApp()
  .registerPlugin(eventCalendarPlugin)
  .addPage({
    element: <EventCalendarPage />,
    title: 'Root Page',
    path: '/event-calendar',
  })
  .render();
