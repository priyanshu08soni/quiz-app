import React from "react";
import { useNavigate } from "react-router-dom";

const QuizzesCard = ({ icon: Icon, title, description, quizId }) => {
    const navigate = useNavigate();
    return (
        <div className="group p-6 rounded-2xl bg-white border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-fadeIn">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-gray-600">{description}</p>
            <button
                onClick={() => navigate(`/quizzes/${quizId}`)}
                className="w-full mt-2 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-200 animate-fadeIn"
            >
                Start Quiz
            </button>
        </div>
  );
};

export default QuizzesCard;
