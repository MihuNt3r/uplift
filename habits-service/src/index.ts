import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Test from './models/Test';
import { Habit } from "./models/Habit.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/habits')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Habit Service is running');
});

// POST endpoint to save custom message in MongoDB
app.post('/test-mongo', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            res.status(400).json({ error: 'Field "message" is required in the request body' });
            return;
        }

        const savedDoc = await Test.create({ message });
        res.status(201).json({
            message: 'Document saved successfully',
            document: savedDoc,
        });
    } catch (err) {
        console.error('Failed to save document:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET endpoint to fetch all test documents
app.get('/test-mongo', async (_req, res) => {
    try {
        const documents = await Test.find();
        res.status(200).json(documents);
    } catch (err) {
        console.error('Failed to fetch documents:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/habits', async (req, res) => {


    return;
});

app.get('/habits', async (req, res) => {
    try {
        const habits = await Habit.find();
        res.status(200).json(habits);
    } catch (err) {
        console.error('Failed to fetch habits:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});