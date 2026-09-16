import { Router } from 'express';
import { Activity } from '../models/activity.js';

const router = Router();

router.get('/', async (_request, response) => {
  const activities = await Activity.find()
    .populate('user', 'username firstName lastName')
    .populate('team', 'name')
    .sort({ recordedAt: -1 })
    .lean();
  response.json(activities);
});

export default router;