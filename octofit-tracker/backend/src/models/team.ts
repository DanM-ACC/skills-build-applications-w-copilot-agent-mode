import mongoose, { Document, Schema, Types } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  description: string;
  members: Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, required: true },
});

export const Team = mongoose.model<TeamDocument>('Team', teamSchema);