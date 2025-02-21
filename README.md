# QUIZ APP

## Overview

This is a full-stack interactive quiz application built using React.js for the frontend and Express.js with MongoDB for the backend. The platform allows users to create quizzes, attempt multiple times, receive instant feedback, track progress, and review answers.

## Features

User Authentication: Secure login and registration system.

Quiz Creation: Users can create and manage quizzes.

Multiple Attempts: Users can attempt quizzes multiple times.

Instant Feedback: Users receive immediate feedback after answering questions.

Progress Tracking: Users can track their quiz history.

Answer Review: Users can review answers after completing a quiz.

Data Persistence: MongoDB is used to store quiz data.

Responsive Design: Optimized for both mobile and desktop users.

## Tech Stack

### Frontend

React.js

React Router

Tailwind CSS

Recharts (for graphical representation)

React Toastify & Sonner (for notifications)

Axios (for API calls)

### Backend

Node.js & Express.js

MongoDB & Mongoose

JWT (for authentication)

bcrypt (for password hashing)

Joi (for request validation)

Multer (for file uploads)

Dotenv (for environment variables)

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

Node.js & npm

MongoDB

Clone the Repository

```terminal
-- git clone https://github.com/priyanshu08soni/quiz-app.git
-- cd quiz-app
```

## Create a .env file in the backend directory and configure:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

## Backend Setup

```terminal
$ cd backend

$ npm install

$ npm test
```

Frontend Setup
```terminal
$ cd ../frontend

$ npm install

$ npm start
```

Usage

Open http://localhost:3000 in your browser.

Register or log in to start taking quizzes.

Create, attempt, and review quizzes with instant feedback.


## Deployment

### Frontend

The frontend deployed Netlify.

### Backend

The backend deployed Render.


## License

This project is licensed under the MIT License.
