import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';



const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:5000/quizzes/${id}`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        if (data && data.success && data.quiz) {
          setQuiz(data.quiz);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (questionIndex, choiceIndex) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: choiceIndex }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    const attempt = {
      userId: userId,
      quizId: id,
      responses: quiz.questions.map((q, index) => ({
        question: q.questionText,
        selectedChoice: q.choices[answers[index]]?.text || null,
        isCorrect: q.choices[answers[index]]?.isCorrect || false,
        points: q.choices[answers[index]]?.isCorrect ? q.points : 0,
      })),
    };

    try {
      const response = await fetch("http://localhost:5000/quizzes/quiz-attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attempt),
      });

      if (!response.ok) throw new Error(`Submission failed: ${response.status}`);
      const result = await response.json();
      navigate(`/quizzes/${id}/answers`, { state: { attempt: result } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to submit quiz');
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
  if (!quiz) return <div className="flex justify-center items-center min-h-screen">No quiz found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <Navbar/>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h2>
        <p className="text-gray-600 mb-8">{quiz.description}</p>

        <div className="space-y-8">
          {quiz.questions.map((question, qIndex) => (
            <div key={qIndex} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {question.questionText} <span className="text-primary">({question.points} pts)</span>
              </h3>
              <div className="space-y-3">
                {question.choices.map((choice, cIndex) => (
                  <label key={cIndex} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      value={cIndex}
                      checked={answers[qIndex] === cIndex}
                      onChange={() => handleAnswerChange(qIndex, cIndex)}
                      className="form-radio text-primary focus:ring-primary"
                    />
                    <span className="text-gray-700">{choice.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;