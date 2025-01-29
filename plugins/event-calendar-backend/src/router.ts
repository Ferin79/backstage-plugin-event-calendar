import express from 'express';
import Router from 'express-promise-router';
import { EventService } from './services/EventService/types';

export async function createRouter({
  eventService,
}: {
  eventService: EventService;
}): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  router.get('/events', async (_req, res) => {
    res.json(await eventService.getEvents());
  });

  return router;
}
