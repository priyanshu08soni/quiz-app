import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle } from 'lucide-react';
import Navbar from '../components/Navbar';


const AnswerReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { attempt } = (location.state) || {};

  if (!attempt) return (
    <div className="flex justify-center items-center min-h-screen">
      No attempt data found.
    </div>
  );

  const totalScore = attempt.attempt.responses.reduce((sum, response) => sum + response.points, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <Navbar/>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Quiz Review</h2>
            <p className="mt-2 text-lg text-gray-600">
              Total Score: <span className="font-semibold text-primary">{totalScore}</span>
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {attempt.attempt.responses.map((response, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-900">{response.question}</h3>
                    <p className="text-gray-600">
                      Your Answer: <span className="font-medium">{response.selectedChoice || "No Answer"}</span>
                    </p>
                    <p className="text-gray-600">
                      Correct Answer: <span className="font-medium text-green-600">{response.correctChoice}</span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {response.isCorrect ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500" />
                    )}
                    <span className="font-medium text-gray-900">{response.points} pts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-50">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerReview;
