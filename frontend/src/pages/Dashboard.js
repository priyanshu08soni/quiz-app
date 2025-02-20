import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
import { LayoutDashboard, Book, Clock, Trophy } from "lucide-react";
import Navbar from "../components/Navbar";
const Dashboard = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAttempts = async () => {
      if (!userId) {
        toast.error("Please login to view your dashboard");
        return;
      }
      try {
        const response = await fetch(`https://quiz-app-omega-three-83.vercel.app/quizzes/quiz-attempts/${userId}`);
        const data = await response.json();
        setAttempts(data.attempts);
      } catch (error) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchAttempts();
  }, [userId]);

  const stats = [
    {
      title: "Total Quizzes",
      value: attempts.length,
      icon: <Book className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Average Score",
      value: attempts.length
        ? Math.round(attempts.reduce((acc, curr) => acc + curr.totalScore, 0) / attempts.length)
        : 0,
      icon: <Trophy className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      title: "Latest Attempt",
      value: attempts.length
        ? new Date(attempts[attempts.length - 1]?.attemptedAt).toLocaleDateString()
        : "No attempts",
      icon: <Clock className="h-6 w-6" />,
      color: "bg-purple-500",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <Navbar />
      <div className="flex items-center gap-4 mb-8 px-6">
        <LayoutDashboard className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto px-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-full text-white`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 px-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Attempts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Quiz Title</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Score</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {attempts.map((attempt, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{attempt.quizId.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{attempt.totalScore}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{new Date(attempt.attemptedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quiz Performance</h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attempts.map(attempt => ({ name: attempt.quizId.title, score: attempt.totalScore }))}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#9b87f5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;