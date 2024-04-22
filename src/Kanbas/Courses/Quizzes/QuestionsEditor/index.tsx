import React, {useEffect} from "react";
import {useNavigate, useLocation, useParams, NavLink, Outlet, Link} from "react-router-dom";
import {FaBan, FaCheckCircle, FaEdit, FaEllipsisV, FaPlus} from "react-icons/fa";
import {KanbasState} from "../../../store";
import * as client from "../client";
import {
  addQuiz,
  updateQuiz,
  selectQuiz,
  setQuizzes,
} from "../reducer";

import {useSelector, useDispatch} from "react-redux";

function QuestionsEditor() {
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
  const handleSaveAndPublish = () => {
    if (pathname.includes("new")) {
      client.createQuiz(quiz).then(() => {
        dispatch(addQuiz(quiz));
        if (!quiz.published) {
          handleTogglePublish(quiz);
        }
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
      });
    } else {
      client.updateQuiz(quiz).then(() => {
        dispatch(updateQuiz(quiz));
        if (!quiz.published) {
          handleTogglePublish(quiz);
        }
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
      });
    }
  };
  const dispatch = useDispatch();
  const handleDeleteButton = (currQuestion: any) => {
    const isConfirmed = window.confirm('Are you sure you want to delete?');
    if (isConfirmed) {
      const updatedQuestions = quiz.questions.filter((question: {
        _id: any;
      }) => question._id !== currQuestion._id);
      const updatedQuiz = {...quiz, questions: updatedQuestions};
      client.updateQuiz(updatedQuiz).then(() => {
        dispatch(updateQuiz(updatedQuiz));
      });
    }
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
      <div>
        <div>
          <span>
            Points {quiz.points} &nbsp;&nbsp;&nbsp;
          </span>
          <span>
            {quiz.published ? <FaCheckCircle className="text-success"/> :
                <FaBan className="text-secondary"/>}
            {quiz.published ? "  Published" : "  Not Published"}&nbsp;&nbsp;&nbsp;
          </span>
          <span>
          <button className="btn btn-outline-secondary"><FaEllipsisV/></button>
        </span>
        </div>
        <hr/>
        <div className="nav nav-tabs">
          <NavLink
              className={({isActive}) => "nav-item nav-link" + (isActive ? " active" : "")}
              to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`}>
            Details
          </NavLink>
          <NavLink
              className={({isActive}) => "nav-item nav-link" + (isActive ? " active" : "")}
              to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/editquestions`}>
            Questions
          </NavLink>
        </div>
        <div>
          <h1>Questions Editor</h1>
          <ul className="list-group">
            {quiz.questions.map((question: any, index: number) => (
                <li key={index} className="list-group-item">
                  <FaEllipsisV className="me-2"/>
                  <Link
                      to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/editquestions/${question._id}`}
                      style={{color: "black"}}><FaEdit className="me-2"/>{question.text}</Link>
                  <span className="float-end">
                  <FaCheckCircle className="text-success"/><FaEllipsisV
                      className="ms-2"/></span><br/>
                  <span style={{fontSize: 10}}><a
                      style={{color: "red"}}>{question.type}</a> | {question.points} pts</span>
                  <button className="float-end btn btn-outline-danger"
                          onClick={() => handleDeleteButton(question)}>
                    Delete
                  </button>
                </li>))}
          </ul>
        </div>
        <div>
          <button className="btn btn-outline-secondary ms-2"
                  onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/editquestions/new`)}>
            <FaPlus/> New Question
          </button>
        </div>
        <hr/>
        <div className="col-sm-4 text-end">
          <button className="btn btn-danger ms-2 float-end"
                  onClick={() => handleSave()}>
            Save
          </button>
          <button className="btn btn-secondary ms-2 float-end"
                  onClick={() => handleSaveAndPublish()}>
            Save & Publish
          </button>
          <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}
                className="btn btn-secondary float-end">
            Cancel
          </Link>
        </div>
      </div>
  );
}

export default QuestionsEditor;