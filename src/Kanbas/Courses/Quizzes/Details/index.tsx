import React, {useEffect} from "react";
import {useNavigate, useLocation, useParams, Link} from "react-router-dom";
import {FaPen, FaCheckCircle, FaEdit, FaEllipsisV, FaPlus} from "react-icons/fa";
import {KanbasState} from "../../../store";
import * as client from "../client";
import {
  addQuiz,
  updateQuiz,
  selectQuiz,
  setQuizzes,
} from "../reducer";

import {useSelector, useDispatch} from "react-redux";

function QuizDetail() {
  const {courseId, quizId} = useParams();
  const {pathname} = useLocation();
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
  const handleTogglePublish = (quiz: any) => {
    const updatedQuiz = {...quiz, published: !quiz.published};
    client.updateQuiz(updatedQuiz)
    .then(() => {
      const updatedQuizzes = quizzes.map(q =>
          q._id === quiz._id ? updatedQuiz : q
      );
      dispatch(setQuizzes(updatedQuizzes));
    })
    .catch(err => {
      console.error("Failed to update quiz", err);
    });
  };
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
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };
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
      <>
        <div className="d-flex">
          <div className="flex-fill">
          <span className="float-end">
            <button className="btn btn-success"
                    onClick={() => handleTogglePublish(quiz)}>{quiz.published ? 'Unpublish' : 'Publish'}
            </button>
            <button className="btn btn-secondary"
                    onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/preview`)}> Preview</button>
            <button className="btn btn-secondary"
                    onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`)}><FaPen/>Edit</button>
            <button className="btn btn-secondary"> ...</button>
          </span>
            <input type="text" className="form-control w-50" placeholder="Search for Quiz"/>
            <hr/>
          </div>
        </div>
        <h1>{quiz.quiz_name}</h1>
        <div className="row">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">Quiz
              Type: {quiz.quiz_type}</li>
            <li className="list-group-item d-flex justify-content-between align-items-center">Points
              : {quiz.points}</li>
            <li className="list-group-item d-flex justify-content-between align-items-center">Assignment
              Group: {quiz.assignment_group}</li>
            <li className="list-group-item d-flex justify-content-between align-items-center">Shuffle
              Answers: {quiz.shuffle_answers ? "Yes" : "No"}</li>
            <li className="list-group-item d-flex justify-content-between align-items-center">Time
              Limit: {quiz.time_limit}</li>
            <li className="list-group-item d-flex justify-content-between align-items-center">Multiple
              Attempts: {quiz.multiple_attempts ? "Yes" : "No"}</li>
            <li className="list-group-item d-flex justify-content-between align-items-center">Show
              Correct Answers: {quiz.show_correct_answers ? "Yes" : "No"}</li>
            <li className="list-group-item d-flex justify-content-between align-items-center">Access
              Code: {quiz.access_code === "" ? "No Access Code" : quiz.access_code}</li>
            <li className="list-group-item d-flex justify-content-between align-items-center">One
              Question at a Time: {quiz.one_question_at_a_time ? "Yes" : "No"}</li>
            <li className="list-group-item d-flex justify-content-between align-items-center">Webcam
              Required: {quiz.webcam_required ? "Yes" : "No"}</li>
            <li className="list-group-item d-flex justify-content-between align-items-center">Lock
              Questions After Answering: {quiz.lock_questions_after_answering ? "Yes" : "No"}</li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <table className="table">
                <tr>
                  <th>Due</th>
                  <th>For</th>
                  <th>Available from</th>
                  <th>Until</th>
                </tr>
                <tr>
                  <td>{formatDate(quiz.due_date)}</td>
                  <td>Everyone</td>
                  <td>{formatDate(quiz.available_date)}</td>
                  <td>{formatDate(quiz.until_date)}</td>
                </tr>
              </table>
            </li>
          </ul>
        </div>
      </>
  );
}

export default QuizDetail;