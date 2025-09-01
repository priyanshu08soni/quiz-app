import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right'
    })
}

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right'
    })
}
export const BASE_URL = "https://quiz-app-imh9.onrender.com";
export const API_PATHS = {
    AUTH:{
        REGISTER: `${BASE_URL}/auth/signup`,
        LOGIN: `${BASE_URL}/auth/login`,
    },
    QUIZ:{
        CREATE_QUIZ: `${BASE_URL}/quizzes`,
        GET_ALL_QUIZZES: `${BASE_URL}/quizzes` ,
        GET_QUIZ: `${BASE_URL}/quizzes/${id}`,
        QUIZ_SUBMIT: `${BASE_URL}/quizzes/quiz-attempts`,
        QUIZ_ATTEMPT: `${BASE_URL}/quizzes/quiz-attempt/${id}`,
        QUIZ_ATTEMPTS_ALL: `${BASE_URL}/quizzes/quiz-attempts/${userId}`
    }
}