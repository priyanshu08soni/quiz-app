import React, { useState } from "react";
import { Edit, PlusCircle, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const QuizForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState([{ text: "", isCorrect: false }]);
  const [points, setPoints] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addQuestion = () => {
    if (!questionText || choices.length < 2 || points <= 0) {
      toast.error("Please enter a valid question, at least two choices, and points.");
      return;
    }

    setQuestions([...questions, { questionText, choices, points: Number(points) }]);
    setQuestionText("");
    setChoices([{ text: "", isCorrect: false }]);
    setPoints("");
  };

  const addChoice = () => {
    if (choices.length < 4) {
      setChoices([...choices, { text: "", isCorrect: false }]);
    } else {
      toast.error("Maximum 4 choices allowed per question.");
    }
  };

  const updateChoice = (index, text, isCorrect) => {
    const newChoices = [...choices];
    newChoices[index] = { text, isCorrect };
    setChoices(newChoices);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuizCreation = async (e) => {
    e.preventDefault();
    if (!title || !description || questions.length === 0) {
      toast.error("Title, description, and at least one question are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://quiz-app-imh9.onrender.com/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, questions }),
      });

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        toast.success("Quiz created successfully!");
        setTimeout(() => navigate("/quizzes"), 1000);
      } else {
        toast.error("Failed to create quiz: " + (message || "Unknown error"));
      }
    } catch {
      toast.error("An error occurred while creating the quiz!");
    } finally {
      setLoading(false);
    }
  };

  const hasInput =
    questionText.trim() !== "" ||
    choices.some((c) => c.text.trim() !== "") ||
    points !== "";

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-center gap-4 mb-6">
        <Edit className="h-8 w-8 text-primary" />
        <h2 className="text-3xl font-bold text-gray-900">Create Your Quiz</h2>
      </div>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Add Questions</h3>
        <input
          type="text"
          placeholder="Question text"
          className="border p-2 rounded w-full mt-2"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />

        {choices.map((choice, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <input
              type="text"
              placeholder={`Choice ${index + 1}`}
              className="border p-2 rounded w-full"
              value={choice.text}
              onChange={(e) => updateChoice(index, e.target.value, choice.isCorrect)}
            />
            <input
              type="checkbox"
              checked={choice.isCorrect}
              onChange={(e) => updateChoice(index, choice.text, e.target.checked)}
            />
          </div>
        ))}

        <button onClick={addChoice} className="text-primary flex items-center gap-1 mt-2">
          <PlusCircle size={18} /> Add Choice
        </button>

        <input
          type="number"
          placeholder="Points"
          className="border p-2 rounded w-full mt-2"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />

        <div className="flex gap-2 mt-4">
          <button
            onClick={addQuestion}
            className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition"
          >
            Add Question
          </button>

          {hasInput && (
            <button
              onClick={() => {
                setQuestionText("");
                setChoices([{ text: "", isCorrect: false }]);
                setPoints("");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
            >
              Remove Question
            </button>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Questions Added</h3>
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div
              key={index}
              className="border p-3 rounded mt-2 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{q.questionText}</p>
                <p className="text-sm text-gray-500">Points: {q.points}</p>
              </div>
              <button
                onClick={() => removeQuestion(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={18} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No questions added yet.</p>
        )}
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handleQuizCreation}
          disabled={loading}
          className={`px-6 py-2 rounded-full text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary/90"
          } transition`}
        >
          {loading ? "Creating Quiz..." : "Create Quiz"}
        </button>
      </div>
    </div>
  );
};

export default QuizForm;
