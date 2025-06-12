import { Schema, model } from "mongoose";

const testSchema = new Schema({
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default model('Test', testSchema);