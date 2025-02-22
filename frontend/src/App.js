import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import RefreshHandler from './RefrshHandler';
import Quizzes from './pages/Quizzes';
import Quiz from './pages/Quiz';
import AnswerReview from './pages/AnswerReview';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import CreateQuiz from './pages/CreateQuiz';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start as null to indicate loading

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated === null 
      ? <div>Loading...</div> 
      : isAuthenticated 
        ? element 
        : <Navigate to="/login" />;
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Prevent rendering routes until authentication is checked
  }

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
        <Route path='/quizzes' element={<PrivateRoute element={<Quizzes />} />} />
        <Route path='/create-quiz' element={<PrivateRoute element={<CreateQuiz />} />} />
        <Route path='/quizzes/:id' element={<PrivateRoute element={<Quiz />} />} />
        <Route path='/quizzes/:id/answers' element={<PrivateRoute element={<AnswerReview />} />} />
        <Route path='/about' element={<About/>} />
        {/* <Route path= "*" element = {<NotFound/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
