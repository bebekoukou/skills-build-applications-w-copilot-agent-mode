import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  name: string;
  type: string;
  points: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    points: { type: Number, required: true },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
