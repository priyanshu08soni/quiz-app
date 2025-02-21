# QUIZ APP

Overview

This is a full-stack interactive quiz application built using React.js for the frontend and Express.js with MongoDB for the backend. The platform allows users to create quizzes, attempt multiple times, receive instant feedback, track progress, and review answers.

Features

User Authentication: Secure login and registration system.

Quiz Creation: Users can create and manage quizzes.

Multiple Attempts: Users can attempt quizzes multiple times.

Instant Feedback: Users receive immediate feedback after answering questions.

Progress Tracking: Users can track their quiz history.

Answer Review: Users can review answers after completing a quiz.

Data Persistence: MongoDB is used to store quiz data.

Responsive Design: Optimized for both mobile and desktop users.

Tech Stack

Frontend

React.js

React Router

Tailwind CSS

Recharts (for graphical representation)

React Toastify & Sonner (for notifications)

Axios (for API calls)

Backend

Node.js & Express.js

MongoDB & Mongoose

JWT (for authentication)

bcrypt (for password hashing)

Joi (for request validation)

Multer (for file uploads)

Dotenv (for environment variables)

Installation & Setup

Prerequisites

Ensure you have the following installed:

Node.js & npm

MongoDB

Clone the Repository

git clone https://github.com/yourusername/quiz-app.git
cd quiz-app

Backend Setup

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Create a .env file in the backend directory and configure:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend server:

npm test

Frontend Setup

Navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install

Start the development server:

npm start

Usage

Open http://localhost:3000 in your browser.

Register or log in to start taking quizzes.

Create, attempt, and review quizzes with instant feedback.

Deployment

Frontend

The frontend can be deployed on Vercel or Netlify.

Backend

The backend can be deployed on platforms like Render, Railway, or a VPS.

Contributing

Fork the repository.

Create a new branch (git checkout -b feature-branch).

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature-branch).

Open a Pull Request.

License

This project is licensed under the MIT License.
