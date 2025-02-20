const mongoose = require('mongoose');

const QuizAttemptSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    responses: [
        {
            question: String,
            selectedChoice: String,
            correctChoice: String,
            isCorrect: Boolean,
            points: Number
        }
    ],
    totalScore: Number,
    attemptedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("quizAttempts", QuizAttemptSchema);
