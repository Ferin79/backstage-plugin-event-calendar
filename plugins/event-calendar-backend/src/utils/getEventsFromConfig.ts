import {
  LoggerService,
  RootConfigService,
  UrlReaderService,
} from '@backstage/backend-plugin-api';
import * as fs from 'fs';
import * as path from 'path';
import yaml from 'yaml';
import { z } from 'zod';
import {
  Event,
  EventsCalendarConfig,
  UrlEvents,
} from '../services/EventService/types';
import { getRecurringEvents } from './getRecurringEvents';

const EventSchema = z.object({
  id: z.number(),
  title: z.string(),
  start: z.string(),
  end: z.string(),
  recurrence: z.string().optional(),
});

interface Options {
  config: RootConfigService;
  logger: LoggerService;
  urlReader: UrlReaderService;
}

/**
 * Fetches and parses events from a given URL.
 */
const fetchEventsFromUrl = async (
  url: string,
  urlReader: UrlReaderService,
  logger: LoggerService,
): Promise<Event[]> => {
  try {
    logger.info(`Fetching events from ${url}`);

    if (url.startsWith('http')) {
      const response = await urlReader.readUrl(url);
      const data = JSON.parse(response.buffer.toString() || '{}') as UrlEvents;
      return data.events || [];
    }
    const localPath = path.resolve(url);
    const fileContent = fs.readFileSync(localPath, 'utf8');
    const data = yaml.parse(fileContent) as UrlEvents;
    return data.events || [];
  } catch (error) {
    logger.error(`Failed to fetch events from ${url}: ${error}`);
    return [];
  }
};

/**
 * Retrieves events from the config, combining local and remote sources.
 */
export const getEventsFromConfig = async ({
  config,
  logger,
  urlReader,
}: Options): Promise<Event[]> => {
  const eventsCalendar =
    config.getOptional<EventsCalendarConfig>('eventsCalendar');

  if (!eventsCalendar?.sources) {
    logger.warn('No valid events calendar configuration found');
    return [];
  }

  const localEvents = eventsCalendar.sources.events || [];
  const urls = eventsCalendar.sources.urls || [];

  const fetchedEvents = await Promise.all(
    urls.map(url => fetchEventsFromUrl(url, urlReader, logger)),
  );

  const allEvents = [...localEvents, ...fetchedEvents.flat()].flatMap(
    getRecurringEvents,
  );

  // Filter valid events
  const validEvents = allEvents.filter((event, index) => {
    const result = EventSchema.safeParse(event);
    if (!result.success) {
      logger.warn(`Invalid event at index ${index}: ${JSON.stringify(event)}`);
    }
    return result.success;
  });

  return validEvents;
};
