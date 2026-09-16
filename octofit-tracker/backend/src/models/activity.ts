import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ActivityDocument extends Document {
  user: Types.ObjectId;
  team: Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKilometers: number;
  recordedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  type: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  distanceKilometers: { type: Number, required: true, min: 0 },
  recordedAt: { type: Date, required: true },
});

export const Activity = mongoose.model<ActivityDocument>('Activity', activitySchema);