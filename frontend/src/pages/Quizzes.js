import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import { BookCopy } from "lucide-react";
const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("https://quiz-app-imh9.onrender.com/quizzes");
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setQuizzes(data);
        } else if (data.quizzes && Array.isArray(data.quizzes)) {
          setQuizzes(data.quizzes);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        toast.error("Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <Navbar />
      <section className="container mx-auto">
        <div className="flex items-center gap-4 mb-8" >
          <BookCopy className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-gray-900">Available Quizzes</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{quiz.description}</p>
              </div>
              <button
                onClick={() => navigate(`/quizzes/${quiz._id}`)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Quizzes;
