import { Content, Header, Page } from '@backstage/core-components';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useAsync from 'react-use/lib/useAsync';
import { Event, EventsResponse } from '../../types/Event';
import EventDialog from '../EventDialog/EventDialog';

const localizer = momentLocalizer(moment);

export const EventCalendarPage = () => {
  const config = useApi(configApiRef);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { value } = useAsync(async (): Promise<EventsResponse> => {
    const backendUrl = config.getString('backend.baseUrl');
    const backendApiEndPoint = `${backendUrl}/api/event-calendar-backend/events`;
    const response = await fetch(backendApiEndPoint);
    const events = await response.json();
    return events;
  }, []);

  const handleClose = () => {
    setSelectedEvent(null);
  };

  return (
    <Page themeId="tool">
      <Header title="Calendar" />
      <Content>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <Calendar
              allDayAccessor={event => !!event.allDay}
              localizer={localizer}
              events={value?.events}
              startAccessor={event => {
                return moment(event.start).toDate();
              }}
              endAccessor={event => {
                return moment(event.end).toDate();
              }}
              style={{ height: '80vh' }}
              onSelectEvent={e => {
                setSelectedEvent(e);
              }}
            />

            <EventDialog
              selectedEvent={selectedEvent}
              handleClose={handleClose}
            />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
