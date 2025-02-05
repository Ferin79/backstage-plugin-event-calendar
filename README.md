# Event Calendar Plugin

Welcome to the **Event Calendar Plugin**! This plugin enables you to display events within your developer portal.

## Overview

This plugin offers a simple, non-intrusive way to track and join events in your organization without cluttering personal calendars. Unlike Google or Microsoft calendars, where you need invitations to events or have to manually import them, this plugin allows teams to share **optional events** like office hours, review meetings, and more, which anyone in the organization can join if they choose.

### Use Case

In large organizations with multiple teams hosting regular events, it's easy to get overwhelmed by invitations and cluttered calendars. The Event Calendar Plugin lets teams list events that are optional for anyone to attend, without the need to send invites or overload individual calendars.

#### Example Use Case:

If your organization has several teams with rotating office hours or recurring review meetings, the plugin allows these teams to list their events in a shared calendar. Team members can view and join any event that interests them, without needing to manage cluttered invites.

This plugin is especially useful for large teams, collaborative groups, or departments that run regular, but optional, meetings.

## Screenshots

![All Events / Meetings](./examples/all-events.png 'All Events / Meetings')

![Event Details](./examples/event-detail.png 'Event Details')

![Event Card](./examples/events-card.png 'Events Card')

## Setup

The following sections will help you get the Event Calendar Plugin setup and running.

### Backend

You need to set up the Event Calendar backend plugin before you move forward with any of the following steps if you haven't already.

#### Installation

To start using the Event Calendar Plugin, follow these steps:

- Install Dependency:

  ```bash
  # From your Backstage root directory
  yarn --cwd packages/backend add backstage-plugin-event-calendar-backend
  ```

- Configure:

  In the `packages/backend/src/index.ts` file, add the following:

  ```typescript
  import { createBackend } from '@backstage/backend-defaults';

  const backend = createBackend();

  backend.add(import('backstage-plugin-event-calendar-backend'));

  backend.start();
  ```

### Frontend

You need to set up the Event Calendar backend plugin before you move forward with any of the following steps if you haven't already.

#### Installation

- Install Dependency:

  ```bash
  # From your Backstage root directory
  yarn --cwd packages/app add backstage-plugin-event-calendar
  ```

- Configure Routes:

  **App.tsx**

  ```javascript
  import { EventCalendarPage } from 'backstage-plugin-event-calendar';

  <Route path="/event-calendar" element={<EventCalendarPage />} />;
  ```

  **Root.tsx**

  ```javascript
  import EventNoteIcon from '@material-ui/icons/EventNote';

  <SidebarItem icon={EventNoteIcon} to="event-calendar" text="Events" />;
  ```

### YAML Configuration Example (app-config.yaml)

```yaml
eventsCalendar:
  sources:
    urls:
      - '../../examples/events.json'
      - '../../examples/events.yaml'
    events:
      - id: 1
        title: 'Office Hours'
        start: '2025-02-25 10:15'
        end: '2025-02-25 11:30'

      - id: 2
        title: 'Ski Trip'
        start: '2025-02-05'
        end: '2025-02-05'
        allDay: true

      - id: 3
        title: 'DevX Meeting'
        start: '2024-02-10T10:00:00.000Z'
        end: '2024-02-10T11:00:00.000Z'
        recurrence: 'FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE;UNTIL=20260229T235959'
        desc: 'Discuss the future of DevX'
        metadata:
          location: 'Room 101'
          meetingLink: 'https://meet.google.com/abc-xyz'
```

#### Example JSON file

```json
{
  "events": [
    {
      "id": 11,
      "title": "Tech Conference",
      "start": "2025-03-10T09:00:00.000Z",
      "end": "2025-03-10T17:00:00.000Z",
      "allDay": false,
      "metadata": {
        "location": "Convention Center",
        "meetingLink": "https://zoom.us/tech-conference"
      }
    }
  ]
}
```

#### Example YAML file

```yaml
events:
  - id: 1
    title: 'New Year Celebration'
    start: '2025-01-01'
    end: '2025-01-01'
    allDay: true
```

#### Event Object

| Field                  | Type      | Description                                                                  | Required |
| ---------------------- | --------- | ---------------------------------------------------------------------------- | -------- |
| `id`                   | `number`  | Unique identifier for the event.                                             | Yes      |
| `title`                | `string`  | Title or name of the event.                                                  | Yes      |
| `start`                | `string`  | Start date and time of the event in ISO 8601 format.                         | Yes      |
| `end`                  | `string`  | End date and time of the event in ISO 8601 format.                           | Yes      |
| `allDay`               | `boolean` | Flag indicating whether the event is an all-day event.                       | No       |
| `metadata`             | `object`  | Additional event-related information. Contains `location` and `meetingLink`. | No       |
| `metadata.location`    | `string`  | Location where the event will take place.                                    | No       |
| `metadata.meetingLink` | `string`  | URL link for joining the event (e.g., Zoom link).                            | No       |
