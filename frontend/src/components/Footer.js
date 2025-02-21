import React from "react";
import { Award, Github, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold">QuizTopia</span>
            </div>
            <p className="text-gray-600 text-sm px-10">
              Empowering learning through interactive quizzes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-600">
                <a
                  href="/"
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <a
                  href="/quizzes"
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  Quizzes
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <a
                  href="/dashboard"
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  Dashboard
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <a
                  href="/about"
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>priyanshus20k4@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+91 8000643228</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <Github className="h-4 w-4" />
                <a href="https://github.com/priyanshu08soni/">
                  priyanshu08soni
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <Linkedin className="h-4 w-4" />
                <a href="www.linkedin.com/in/priyanshu-soni-180219257">
                  priyanshu-soni-180219257
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm flex items-center justify-center">
            Made by
            Priyanshu Soni
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
