// models/Habit.ts
import { Schema, model, Document } from 'mongoose';

interface IHabit extends Document {
    userId: string;
    name: string;
    description?: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    targetDays?: number[]; // For weekly habits (0-6 for Sunday-Saturday)
    targetDate?: number; // For monthly habits (1-31)
    reminderTime?: Date;
    createdAt: Date;
    updatedAt: Date;
    streak: number;
    longestStreak: number;
}

const habitSchema = new Schema<IHabit>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
    targetDays: [Number], // For weekly habits
    targetDate: Number, // For monthly habits
    reminderTime: Date,
    streak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 }
}, { timestamps: true });

export const Habit = model<IHabit>('Habit', habitSchema);