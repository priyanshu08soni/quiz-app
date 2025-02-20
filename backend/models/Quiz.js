const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [
    {
      questionText: { type: String, required: true },
      choices: [{ text: String, isCorrect: Boolean }],
      points: { type: Number, required: true }, // Add points per question
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Quiz", QuizSchema);
