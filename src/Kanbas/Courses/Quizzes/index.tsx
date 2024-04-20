import React, {useEffect, useState} from "react";
import {
  FaCaretDown,
  FaCheckCircle,
  FaEdit,
  FaEllipsisV,
  FaPlus,
  FaPlusCircle,
} from "react-icons/fa";
import {useNavigate, useParams, Link} from "react-router-dom";
import {KanbasState} from "../../store";
import {
  deleteQuiz,
  setQuizzes
} from "./reducer";

import * as client from "./client";
import {useSelector, useDispatch} from "react-redux";
import {findAllQuizzes} from "./client";

function Quizzes() {
  const quizList = useSelector((state: KanbasState) =>
      state.quizReducer.quizzes);
  const quiz = useSelector((state: KanbasState) =>
      state.quizReducer.quiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewQuizzes = () => {
    navigate(`/Kanbas/Quizzes/new`);
  };
  const {quizId} = useParams();

  useEffect(() => {
    client.findAllQuizzes().then(quizzes => dispatch(setQuizzes(quizzes)));
  }, [dispatch]);

  const handleDeleteButton = (quiz: { _id: any; }) => {
    const isConfirmed = window.confirm('Are you sure you want to delete?');
    if (isConfirmed) {
      client.deleteQuiz(quiz._id).then(() => {
        dispatch(deleteQuiz(quiz._id));
      });
    }
  };
  return (
      <>
        <h1>HAHAHA</h1>
        <ul className="list-group">
          {quizList.map((quiz, index) => (
              <li key={index} className="list-group-item">
                <FaEllipsisV className="me-2"/>
                <FaEdit className="me-2"/>
                <Link
                    to={`/Kanbas/Quizzes/${quiz._id}`}>{quiz.quiz_name}</Link>
                <span className="float-end">
                  <FaCheckCircle className="text-success"/><FaEllipsisV
                    className="ms-2"/></span><br/>
                <span style={{fontSize: 10}}><a
                    style={{color: "red"}}>{quiz.quiz_type}</a> | {quiz.due_date} at 11:59pm | {quiz.points}</span>
                <button className="float-end btn btn-outline-danger"
                        onClick={() => handleDeleteButton(quiz)}>
                  Delete
                </button>
              </li>))}
        </ul>
      </>
  );
}

export default Quizzes;