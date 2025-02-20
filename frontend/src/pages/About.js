import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About QuizTopia
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            At QuizTopia, we believe that learning should be an engaging and
            interactive experience. Our platform offers a diverse range of
            quizzes designed to challenge and expand your knowledge across
            various subjects.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600">
              Our mission is to foster a love for learning by providing
              accessible and enjoyable educational content. We aim to create a
              community where knowledge seekers can connect, challenge
              themselves, and celebrate their achievements.
            </p>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <img
              src="/assets/community.jpg"
              alt="Our Mission"
              width={400}
              className="shadow-md"
            />
          </div>
        </div>
      </section>
      {/* Community Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="/assets/community_people.jpg"
              alt="Community"
              className="rounded-lg shadow-md"
              width={400}
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Community
            </h2>
            <p className="text-lg text-gray-600">
              Become a part of the QuizTopia community today. Engage with fellow
              learners, participate in discussions, and share your knowledge.
              Together, we can make learning a fun and collaborative journey.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
