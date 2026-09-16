import { Router } from 'express';
import { Leaderboard } from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_request, response) => {
  const leaderboard = await Leaderboard.find()
    .populate('user', 'username firstName lastName')
    .populate('team', 'name')
    .sort({ rank: 1 })
    .lean();
  response.json(leaderboard);
});

export default router;