
const User = require("../models/User");
const QuizModel = require("../models/Quiz");
const QuizAttemptModel = require("../models/QuizAttempt"); // ✅ Import the missing model
const quizController = require('express').Router();
// Create a new quiz
quizController.post('/', async (req, res) => {
    try {
        const { title, description, questions } = req.body;
        const quiz = new QuizModel({ title, description, questions });
        await quiz.save();
        res.status(201).json({ message: 'Quiz created successfully', success: true, quiz });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});

// Get all quizzes
quizController.get('/', async (req, res) => {
    try {
        const quizzes = await QuizModel.find();
        res.status(200).json({ success: true, quizzes });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});

// Get a single quiz by ID
quizController.get('/:id', async (req, res) => {
    try {
        const quiz = await QuizModel.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found', success: false });
        res.status(200).json({ success: true, quiz });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});

// Update a quiz by ID
quizController.put('/:id', async (req, res) => {
    try {
        const updatedQuiz = await QuizModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedQuiz) return res.status(404).json({ message: 'Quiz not found', success: false });
        res.status(200).json({ message: 'Quiz updated successfully', success: true, updatedQuiz });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});

// Delete a quiz by ID
quizController.delete('/:id', async (req, res) => {
    try {
        const deletedQuiz = await QuizModel.findByIdAndDelete(req.params.id);
        if (!deletedQuiz) return res.status(404).json({ message: 'Quiz not found', success: false });
        res.status(200).json({ message: 'Quiz deleted successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
});

quizController.post('/quiz-attempts', async (req, res) => {
    try {
        const { userId, quizId, responses } = req.body;

        // ✅ Validate input data
        if (!userId || !quizId || !responses || !Array.isArray(responses)) {
            return res.status(400).json({ success: false, message: "Invalid request data" });
        }

        // ✅ Fetch the quiz and check if it exists
        const quiz = await QuizModel.findById(quizId);
        if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found' });

        // ✅ Calculate score
        let totalScore = 0;
        const validatedResponses = responses.map((response, index) => {
            const question = quiz.questions[index];

            if (!question || !question.choices) {
                return { question: "Invalid Question", selectedChoice: response.selectedChoice, isCorrect: false, points: 0 };
            }

            const correctChoice = question.choices.find(choice => choice.isCorrect);
            const isCorrect = correctChoice && response.selectedChoice === correctChoice.text;
            const points = isCorrect ? question.points : 0;

            totalScore += points;

            return {
                question: question.questionText,
                selectedChoice: response.selectedChoice,
                correctChoice: correctChoice.text,
                isCorrect,
                points
            };
        });

        // ✅ Save the attempt in QuizAttempt model
        const attempt = new QuizAttemptModel({
            userId,
            quizId,
            responses: validatedResponses,
            totalScore
        });

        await attempt.save();

        // ✅ Update user document with the attempt
        await User.findByIdAndUpdate(userId, {
            $push: { quizAttempts: { quizId, score: totalScore, attemptedAt: new Date() } }
        });

        res.status(201).json({ success: true, message: 'Quiz attempt recorded', attempt });

    } catch (error) {
        console.error("Quiz Attempt Error:", error); // ✅ Log the error for debugging
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});
quizController.get('quiz-attempts/:id', async (req, res) => {
    try {
        const { id } = req.params; // Correctly extract 'id' from params
        console.log("Fetching attempts for user:", id);

        if (!id || id.length !== 24) { // Validate ObjectId length
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        // ✅ Validate user existence
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // ✅ Fetch quiz attempts and populate quiz details
        const attempts = await QuizAttemptModel.find({ userId: id }) // Corrected query
            .populate({
                path: 'quizId',
                select: 'title description'
            })
            .sort({ attemptedAt: -1 });

        res.status(200).json({ success: true, attempts });
    } catch (error) {
        console.error('Error fetching quiz attempts:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});





module.exports = quizController
