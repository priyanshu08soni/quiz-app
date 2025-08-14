import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Book,
  Clock,
  Trophy,
  ArrowBigRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [attempts, setAttempts] = useState([]);
  const [filteredAttempts, setFilteredAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleQuizDetails = async (id) => {
    try {
      const response = await fetch(
        `https://quiz-app-imh9.onrender.com/quizzes/quiz-attempt/${id}`
      );
      if (!response.ok) throw new Error(`Fetching failed: ${response.status}`);
      const result = await response.json();
      navigate(`/quizzes/${id}/answers`, { state: { attempt: result } });
    } catch (err) {
      toast.error("Failed to fetch quiz");
    }
  };

  useEffect(() => {
    const fetchAttempts = async () => {
      if (!userId) {
        toast.error("Please login to view your dashboard");
        return;
      }
      try {
        const response = await fetch(
          `https://quiz-app-imh9.onrender.com/quizzes/quiz-attempts/${userId}`
        );
        const data = await response.json();
        setAttempts(data.attempts);
        setFilteredAttempts(data.attempts);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchAttempts();
  }, [userId]);
  useEffect(() => {
    let filtered = attempts.filter((attempt) =>
      attempt.quizId.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (selectedDate) {
      filtered = filtered.filter(
        (attempt) =>
          new Date(attempt.attemptedAt).toISOString().split("T")[0] ===
          selectedDate
      );
    }
    setFilteredAttempts(filtered);
  }, [searchTerm, selectedDate, attempts]);

  const stats = [
    {
      title: "Total Quizzes",
      value: attempts.length,
      icon: <Book className="h-6 w-6" />,
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      title: "Average Score",
      value: attempts.length
        ? Math.round(
            attempts.reduce((acc, curr) => acc + curr.totalScore, 0) /
              attempts.length
          )
        : 0,
      icon: <Trophy className="h-6 w-6" />,
      color: "bg-gradient-to-br from-green-400 to-green-600",
    },
    {
      title: "Latest Attempt",
      value: attempts.length
        ? new Date(
            attempts[attempts.length - 1]?.attemptedAt
          ).toLocaleDateString()
        : "No attempts",
      icon: <Clock className="h-6 w-6" />,
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
  ];

  const groupAttemptsByTitle = () => {
    const grouped = {};
    attempts.forEach((attempt) => {
      const title = attempt.quizId.title;
      if (!grouped[title]) {
        grouped[title] = [];
      }
      grouped[title].push({
        name: attempt.attemptedAt,
        score: attempt.totalScore,
      });
    });
    return grouped;
  };

  const groupedAttempts = groupAttemptsByTitle();


  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const date = new Date(payload[0].payload.name);
      return (
        <div className="bg-white p-3 shadow-md border border-primary rounded-xl">
          <p className="text-sm font-semibold text-gray-600">Date: {date.toLocaleDateString()} {date.toLocaleTimeString()}</p>
          <p className="text-sm text-primary">Score: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-6 flex items-center justify-between rounded-2xl border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-fadeIn"
            >
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>
        {/* Enhanced Filters Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search Quiz
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  placeholder="Search by quiz name..."
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Filter by Date
              </label>
              <input
                id="date"
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 outline-none"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            {(searchTerm || selectedDate) && (
              <div className="mt-5">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedDate("");
                  }}
                  className="px-8 py-2 bg-white text-primary border border-primary rounded-full hover:bg-primary/10 transition-colors duration-200 animate-fadeIn"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
          {filteredAttempts.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredAttempts.length} of {attempts.length} attempts
            </div>
          )}
        </div>

        {/* Quiz Attempts Table */}
        <div className="grid grid-cols-1 gap-6  rounded-2xl">
          <div className="bg-white col-span-1 rounded-2xl shadow-md border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-fadeIn">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Attempts
              </h2>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Quiz Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAttempts.length > 0 ? (
                    filteredAttempts.map((attempt, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {attempt.quizId.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {attempt.totalScore}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(attempt.attemptedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <ArrowBigRight
                            className="text-primary cursor-pointer hover:text-blue-500"
                            onClick={() => handleQuizDetails(attempt._id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-4 text-gray-500"
                      >
                        No quizzes match the filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-1">
            <div className="grid grid-cols-1 gap-6">
              {Object.entries(groupedAttempts).map(([title, data], index) => (
                <div
                  key={index}
                  className="bg-white col-span-1 rounded-2xl shadow-md p-6 border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-fadeIn"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {title} Performance
                  </h2>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data}>
                        <XAxis
                          dataKey="name"
                          textAnchor="end"
                          height={60}
                          tickFormatter={(value) =>
                            new Date(value).toLocaleDateString()
                          }
                          tick={{ fontSize: 14 }}
                        />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar
                          dataKey="score"
                          fill="#9b87f5"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
