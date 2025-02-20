import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Brain, Target, Timer, Trophy, Users } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'Smart Learning',
      description: 'Adaptive quizzes that grow with your knowledge level.'
    },
    {
      icon: Timer,
      title: 'Time Management',
      description: 'Practice with timed quizzes to improve your speed.'
    },
    {
      icon: Trophy,
      title: 'Achievement System',
      description: 'Earn badges and track your progress over time.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with other learners and share knowledge.'
    },
    {
      icon: Target,
      title: 'Focused Practice',
      description: 'Target specific areas for improvement.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 animate-fadeIn">
            Welcome to QuizTopia
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fadeIn">
            Your journey to knowledge mastery starts here. Challenge yourself with our interactive quizzes and track your progress.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-200 animate-fadeIn" onClick={()=>navigate("/quizzes")}>
              Start Quiz
            </button>
            <button className="px-8 py-3 bg-white text-primary border border-primary rounded-full hover:bg-primary/10 transition-colors duration-200 animate-fadeIn" onClick={()=>navigate("/about")}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose QuizTopia?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already improving their skills with QuizTopia.
          </p>
          <button className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-200" onClick={()=>navigate("/quizzes")}>
            Get Started Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;