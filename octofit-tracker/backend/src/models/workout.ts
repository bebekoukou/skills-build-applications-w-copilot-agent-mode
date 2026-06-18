import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  activityId: mongoose.Types.ObjectId;
  duration: number;
  date: Date;
  distance?: number;
  calories?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityId: { type: Schema.Types.ObjectId, ref: 'Activity', required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
    distance: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    notes: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
