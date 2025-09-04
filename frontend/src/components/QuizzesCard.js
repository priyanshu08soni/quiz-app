import React from "react";
import { useNavigate } from "react-router-dom";

const QuizzesCard = ({ icon: Icon, title, description, quizId }) => {
  const navigate = useNavigate();

  return (
    <div className="group flex flex-col justify-between p-6 rounded-2xl bg-white border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-fadeIn h-full">
      {/* Icon */}
      <div>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600 line-clamp-3">{description}</p>
      </div>

      {/* Button sticks at bottom */}
      <button
        onClick={() => navigate(`/quizzes/${quizId}`)}
        className="w-full mt-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-200"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizzesCard;
