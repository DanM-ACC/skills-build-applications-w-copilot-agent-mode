import mongoose, { Document, Schema } from 'mongoose';

export interface WorkoutDocument extends Document {
  name: string;
  focus: string;
  difficulty: string;
  durationMinutes: number;
  exercises: string[];
}

const workoutSchema = new Schema<WorkoutDocument>({
  name: { type: String, required: true, trim: true },
  focus: { type: String, required: true, trim: true },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  durationMinutes: { type: Number, required: true, min: 1 },
  exercises: { type: [String], required: true },
});

export const Workout = mongoose.model<WorkoutDocument>('Workout', workoutSchema);