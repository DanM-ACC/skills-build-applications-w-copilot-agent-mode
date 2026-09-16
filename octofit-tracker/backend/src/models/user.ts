import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  joinedAt: Date;
}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  joinedAt: { type: Date, required: true },
});

export const User = mongoose.model<UserDocument>('User', userSchema);