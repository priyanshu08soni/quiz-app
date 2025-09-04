import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import { BookCopy, Search } from "lucide-react";
import QuizzesCard from "../components/QuizzesCard";
import { getAllQuizzes } from "../api/quizzes";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]); // 👈 for search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // 👈 search state

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizzesData = await getAllQuizzes();
        setQuizzes(quizzesData);
        setFilteredQuizzes(quizzesData); // 👈 initialize filtered list
      } catch (err) {
        setError(err.message || "An error occurred");
        toast.error("Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // 🔍 filter quizzes whenever searchQuery changes
  useEffect(() => {
    const filtered = quizzes.filter(
      (quiz) =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredQuizzes(filtered);
  }, [searchQuery, quizzes]);

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
        <div className="flex items-center gap-4 mb-8">
          <BookCopy className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-gray-900">Available Quizzes</h2>
        </div>

        {/* 🔍 Search Bar */}
        <div className="relative mb-8 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Quiz Cards */}
        {filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredQuizzes.map((quiz) => (
              <QuizzesCard
                key={quiz._id}
                icon={BookCopy}
                title={quiz.title}
                description={quiz.description}
                quizId={quiz._id}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No quizzes found.</p>
        )}
      </section>
    </div>
  );
};

export default Quizzes;
