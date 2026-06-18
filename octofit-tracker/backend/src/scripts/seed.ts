/**
 * Seed the octofit_db database with test data.
 * 
 * This script initializes the Octofit database with realistic sample data
 * including users, teams, activities, workouts, and leaderboard entries.
 */

import { connectDB, disconnectDB } from '../db';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Workout } from '../models/workout';
import { Leaderboard } from '../models/leaderboard';
import mongoose from 'mongoose';

async function seed() {
  try {
    // Connect to database
    await connectDB();
    console.log('🌱 Starting seed process...\n');

    // Clear existing data
    console.log('🧹 Clearing existing collections...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Workout.deleteMany({});
    await Leaderboard.deleteMany({});
    console.log('✅ Collections cleared\n');

    // Seed Activities
    console.log('📝 Seeding activities...');
    const activities = await Activity.insertMany([
      { name: 'Running', type: 'cardio', points: 10, description: 'Go for a run' },
      { name: 'Cycling', type: 'cardio', points: 12, description: 'Ride a bicycle' },
      { name: 'Weight Training', type: 'strength', points: 15, description: 'Lift weights' },
      { name: 'Swimming', type: 'cardio', points: 14, description: 'Swim laps' },
      { name: 'Yoga', type: 'flexibility', points: 8, description: 'Practice yoga' },
      { name: 'HIIT Workout', type: 'cardio', points: 18, description: 'High intensity interval training' }
    ]);
    console.log(`✅ Created ${activities.length} activities\n`);

    // Seed Users
    console.log('👥 Seeding users...');
    const users = await User.insertMany([
      { name: 'Alice Johnson', email: 'alice@octofit.com', avatar: 'https://i.pravatar.cc/150?img=1', points: 450 },
      { name: 'Bob Smith', email: 'bob@octofit.com', avatar: 'https://i.pravatar.cc/150?img=2', points: 380 },
      { name: 'Carol Davis', email: 'carol@octofit.com', avatar: 'https://i.pravatar.cc/150?img=3', points: 520 },
      { name: 'David Wilson', email: 'david@octofit.com', avatar: 'https://i.pravatar.cc/150?img=4', points: 290 },
      { name: 'Eve Martinez', email: 'eve@octofit.com', avatar: 'https://i.pravatar.cc/150?img=5', points: 410 },
      { name: 'Frank Brown', email: 'frank@octofit.com', avatar: 'https://i.pravatar.cc/150?img=6', points: 350 }
    ]);
    console.log(`✅ Created ${users.length} users\n`);

    // Seed Teams
    console.log('🏆 Seeding teams...');
    const teams = await Team.insertMany([
      {
        name: 'Fitness Warriors',
        description: 'A team dedicated to fitness excellence',
        members: [users[0]._id, users[1]._id],
        totalPoints: 830
      },
      {
        name: 'Health Heroes',
        description: 'Building healthy lifestyles together',
        members: [users[2]._id, users[3]._id],
        totalPoints: 810
      },
      {
        name: 'Active Squad',
        description: 'Moving, grooving, and improving',
        members: [users[4]._id, users[5]._id],
        totalPoints: 760
      }
    ]);
    console.log(`✅ Created ${teams.length} teams\n`);

    // Seed Workouts
    console.log('💪 Seeding workouts...');
    const workouts = await Workout.insertMany([
      {
        userId: users[0]._id,
        activityId: activities[0]._id,
        duration: 45,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        distance: 5.2,
        calories: 450,
        notes: 'Great morning run'
      },
      {
        userId: users[0]._id,
        activityId: activities[2]._id,
        duration: 60,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        calories: 500,
        notes: 'Chest and triceps day'
      },
      {
        userId: users[1]._id,
        activityId: activities[1]._id,
        duration: 50,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        distance: 18.5,
        calories: 520,
        notes: 'Long distance cycling'
      },
      {
        userId: users[2]._id,
        activityId: activities[3]._id,
        duration: 40,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        distance: 1.6,
        calories: 380,
        notes: 'Pool workout'
      },
      {
        userId: users[2]._id,
        activityId: activities[5]._id,
        duration: 30,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        calories: 420,
        notes: 'Intense HIIT session'
      },
      {
        userId: users[3]._id,
        activityId: activities[4]._id,
        duration: 60,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        calories: 200,
        notes: 'Relaxing yoga class'
      },
      {
        userId: users[4]._id,
        activityId: activities[0]._id,
        duration: 55,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        distance: 6.1,
        calories: 480,
        notes: 'Trail running'
      },
      {
        userId: users[5]._id,
        activityId: activities[2]._id,
        duration: 75,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        calories: 600,
        notes: 'Full body strength training'
      }
    ]);
    console.log(`✅ Created ${workouts.length} workouts\n`);

    // Seed Leaderboard
    console.log('📊 Seeding leaderboard...');
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        rank: 1,
        points: 520,
        workoutCount: 2
      },
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        rank: 2,
        points: 450,
        workoutCount: 2
      },
      {
        userId: users[4]._id,
        teamId: teams[2]._id,
        rank: 3,
        points: 410,
        workoutCount: 1
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        rank: 4,
        points: 380,
        workoutCount: 1
      },
      {
        userId: users[5]._id,
        teamId: teams[2]._id,
        rank: 5,
        points: 350,
        workoutCount: 1
      },
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        rank: 6,
        points: 290,
        workoutCount: 1
      }
    ]);
    console.log(`✅ Created ${leaderboardEntries.length} leaderboard entries\n`);

    console.log('✨ Database seeding completed successfully!');
    console.log('\n📈 Summary:');
    console.log(`   • Users: ${users.length}`);
    console.log(`   • Teams: ${teams.length}`);
    console.log(`   • Activities: ${activities.length}`);
    console.log(`   • Workouts: ${workouts.length}`);
    console.log(`   • Leaderboard Entries: ${leaderboardEntries.length}`);
    console.log('\n🚀 Ready to query the API!');

    await disconnectDB();
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
