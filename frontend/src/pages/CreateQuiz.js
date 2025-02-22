import React from 'react'
import QuizForm from '../components/QuizForm'
import Navbar from '../components/Navbar'

const CreateQuiz = () => {
  return (
    <div className='min-h-screen bg-gray-50 py-20'>
        <Navbar/>
        <QuizForm/>
    </div>
  )
}

export default CreateQuiz
