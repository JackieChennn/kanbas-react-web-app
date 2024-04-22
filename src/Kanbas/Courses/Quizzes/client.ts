import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
// const API_BASE = "http://localhost:4000";
const QUIZZES_API = `${API_BASE}/api/quizzes`;
export const createQuiz = async (quiz: any) => {
  const response = await axios.post(
      QUIZZES_API,
      quiz
  );
  return response.data;
};
export const updateQuiz = async (quiz: any) => {
  const response = await axios
  .put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};
export const deleteQuiz = async (quizId: any) => {
  const response = await axios
  .delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};
export const findAllQuizzes = async () => {
  const response = await axios
  .get(QUIZZES_API);
  return response.data;
};