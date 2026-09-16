import mongoose, { Document, Schema, Types } from 'mongoose';

export interface LeaderboardDocument extends Document {
  user: Types.ObjectId;
  team: Types.ObjectId;
  points: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<LeaderboardDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  points: { type: Number, required: true, min: 0 },
  rank: { type: Number, required: true, min: 1 },
  updatedAt: { type: Date, required: true },
});

export const Leaderboard = mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);