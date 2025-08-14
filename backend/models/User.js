const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    quizAttempts: [
        {
            quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
            score: Number,
            attemptedAt: { type: Date, default: Date.now }
        }
    ]
});
