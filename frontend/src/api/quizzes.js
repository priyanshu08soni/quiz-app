import { API_PATHS } from "../utils";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
// 🔹 Get all quizzes
export const getAllQuizzes = async () => {
  try {
    const response = await fetch(API_PATHS.QUIZ.GET_ALL_QUIZZES, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error: ${response.status}`);
    }

    // Handle both response formats: array or object
    if (Array.isArray(data)) {
      return data;
    } else if (data.quizzes && Array.isArray(data.quizzes)) {
      return data.quizzes;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    throw error instanceof Error ? error : new Error("Failed to fetch quizzes");
  }
};
export const fetchAllQuizAttempts = async (userId) => {
  try {
    const response = await fetch(API_PATHS.QUIZ.QUIZ_ATTEMPTS_ALL(userId), {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error(`Failed: ${response.status}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// ✅ Fetch details of a specific quiz attempt
export const fetchQuizAttemptDetails = async (id) => {
  try {
    const response = await fetch(API_PATHS.QUIZ.QUIZ_ATTEMPT(id), {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error(`Failed: ${response.status}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};
// ✅ Fetch quiz by ID
export const fetchQuizById = async (id) => {
  const response = await fetch(API_PATHS.QUIZ.GET_QUIZ(id), {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return await response.json();
};

// ✅ Submit a quiz attempt
export const submitQuizAttempt = async (attempt) => {
  const response = await fetch(API_PATHS.QUIZ.QUIZ_SUBMIT, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(attempt),
  });
  if (!response.ok) throw new Error(`Submission failed: ${response.status}`);
  return await response.json();
};
export const createQuiz = async (quizData) => {
  const response = await fetch(API_PATHS.QUIZ.CREATE_QUIZ, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(quizData),
  });

  if (!response.ok) throw new Error(`Quiz creation failed: ${response.status}`);
  return await response.json();
};
