import { Content, Header, Page } from '@backstage/core-components';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useAsync from 'react-use/lib/useAsync';
import { EventsResponse } from '../../types/Event';

const localizer = momentLocalizer(moment);

export const EventCalendarComponent = () => {
  const config = useApi(configApiRef);

  const { value } = useAsync(async (): Promise<EventsResponse> => {
    const backendUrl = config.getString('backend.baseUrl');
    const backendApiEndPoint = `${backendUrl}/api/event-calendar-backend/events`;
    const response = await fetch(backendApiEndPoint);
    const events = await response.json();
    return events;
  }, []);

  return (
    <Page themeId="tool">
      <Header title="Calendar" />
      <Content>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <Calendar
              localizer={localizer}
              events={value?.events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '80vh' }}
            />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
