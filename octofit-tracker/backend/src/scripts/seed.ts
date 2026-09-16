import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Seed the octofit_db database with test data.
    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'alex.runner',
        email: 'alex.runner@example.com',
        firstName: 'Alex',
        lastName: 'Rivera',
        joinedAt: new Date('2026-01-15'),
      },
      {
        username: 'jamie.lifts',
        email: 'jamie.lifts@example.com',
        firstName: 'Jamie',
        lastName: 'Chen',
        joinedAt: new Date('2026-02-03'),
      },
      {
        username: 'sam.cyclist',
        email: 'sam.cyclist@example.com',
        firstName: 'Sam',
        lastName: 'Okafor',
        joinedAt: new Date('2026-02-20'),
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Morning Momentum',
        description: 'Early risers building consistent daily habits.',
        members: [users[0]._id, users[1]._id],
        createdAt: new Date('2026-02-01'),
      },
      {
        name: 'Weekend Warriors',
        description: 'A balanced team for active weekends and recovery.',
        members: [users[1]._id, users[2]._id],
        createdAt: new Date('2026-02-10'),
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'Running',
        durationMinutes: 35,
        distanceKilometers: 5.2,
        recordedAt: new Date('2026-09-14T07:15:00Z'),
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        type: 'Strength training',
        durationMinutes: 45,
        distanceKilometers: 0,
        recordedAt: new Date('2026-09-14T06:30:00Z'),
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        type: 'Cycling',
        durationMinutes: 60,
        distanceKilometers: 18.4,
        recordedAt: new Date('2026-09-13T09:00:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, team: teams[0]._id, points: 860, rank: 1, updatedAt: new Date() },
      { user: users[1]._id, team: teams[0]._id, points: 720, rank: 2, updatedAt: new Date() },
      { user: users[2]._id, team: teams[1]._id, points: 640, rank: 3, updatedAt: new Date() },
    ]);

    await Workout.insertMany([
      {
        name: 'Foundation Full Body',
        focus: 'Full body',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Glute bridges', 'Plank'],
      },
      {
        name: 'Tempo Cardio Builder',
        focus: 'Cardio',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: ['Jumping jacks', 'High knees', 'Mountain climbers', 'Burpees'],
      },
      {
        name: 'Strength Progression',
        focus: 'Strength',
        difficulty: 'advanced',
        durationMinutes: 45,
        exercises: ['Deadlift', 'Goblet squat', 'Dumbbell row', 'Push press'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
