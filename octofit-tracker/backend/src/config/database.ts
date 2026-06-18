import mongoose from 'mongoose';

// MongoDB connection URI - uses Codespaces-aware connection or local
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Team Schema
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

// Activity Schema
const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: Number,
  calories: Number,
  createdAt: { type: Date, default: Date.now },
});

// Workout Schema
const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  name: { type: String, required: true },
  duration: Number,
  intensity: String,
  createdAt: { type: Date, default: Date.now },
});

// Models
export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const Workout = mongoose.model('Workout', workoutSchema);

// Leaderboard aggregation pipeline
export const getLeaderboard = async () => {
  return await Activity.aggregate([
    {
      $group: {
        _id: '$userId',
        totalActivities: { $sum: 1 },
        totalCalories: { $sum: '$calories' || 0 },
        totalDuration: { $sum: '$duration' || 0 },
      },
    },
    {
      $sort: { totalCalories: -1 },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'userInfo',
      },
    },
    {
      $unwind: '$userInfo',
    },
    {
      $project: {
        username: '$userInfo.username',
        totalActivities: 1,
        totalCalories: 1,
        totalDuration: 1,
      },
    },
  ]);
};

export default mongoose;
