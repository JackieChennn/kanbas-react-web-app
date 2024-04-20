import React, {useEffect} from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { KanbasState } from "../../../store";
import * as client from "../client";
import {
    addQuiz,
    updateQuiz,
    selectQuiz,
    deleteQuiz,
    setQuizzes,
  } from "../reducer";

import { useSelector, useDispatch } from "react-redux";
function QuizEditor() {
  const { courseId, quizId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const quizzes = useSelector(
    (state: KanbasState) => state.quizReducer.quizzes
  );
  const tempQuiz = useSelector(
    (state: KanbasState) => state.quizReducer.tempQuiz
  );
  const quiz = useSelector(
    (state: KanbasState) => state.quizReducer.quiz
  );
  const handleSave = () => {
    if (pathname.includes("new")) {
      client.createQuiz(quiz).then(() => {
        dispatch(addQuiz(quiz));
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
      });
    } else {
      client.updateQuiz(quiz).then(() => {
        dispatch(updateQuiz(quiz));
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
      });
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (quizId !== "new") {
      const currentQuiz = quizzes.find(
        (quiz: any) => quiz._id === quizId
      );
      if (currentQuiz) {
        dispatch(selectQuiz(currentQuiz));
      }
    } else {
      dispatch(selectQuiz(tempQuiz));
    }
  }, [quizId, quizzes, tempQuiz, dispatch]);

  return (
        <div>
          <h1>Quiz Editor</h1>
        </div>
    );
}

export default QuizEditor;