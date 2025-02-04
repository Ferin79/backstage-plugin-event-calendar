import { InfoCard } from '@backstage/core-components';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import moment from 'moment';
import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useAsync from 'react-use/lib/useAsync';
import { Event, EventsResponse } from '../../types/Event';
import EventDialog from '../EventDialog/EventDialog';

const localizer = momentLocalizer(moment);

export const EventCalendarCard = ({ title = '' }) => {
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
    <>
      <InfoCard
        title={title || moment().format('dddd, MMMM Do YYYY')}
        noPadding
        titleTypographyProps={{
          variant: 'h6',
        }}
      >
        <Calendar
          scrollToTime={new Date()}
          toolbar={false}
          defaultView={Views.DAY}
          views={['day']}
          allDayAccessor={event => !!event.allDay}
          localizer={localizer}
          events={value?.events}
          startAccessor={event => {
            return moment(event.start).toDate();
          }}
          endAccessor={event => {
            return moment(event.end).toDate();
          }}
          style={{ height: 500 }}
          onSelectEvent={e => {
            setSelectedEvent(e);
          }}
        />
      </InfoCard>

      <EventDialog selectedEvent={selectedEvent} handleClose={handleClose} />
    </>
  );
};
