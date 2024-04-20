import React, {useEffect} from "react";
import {
  FaBan,
  FaCaretDown,
  FaCheckCircle,
  FaEdit,
  FaEllipsisV,
  FaPlus,
  FaPlusCircle,
} from "react-icons/fa";
import {Link, useNavigate, useParams} from "react-router-dom";
import {KanbasState} from "../../store";
import {deleteQuiz, setQuizzes} from "./reducer";

import * as client from "./client";
import {useDispatch, useSelector} from "react-redux";

function Quizzes() {
  const quizList = useSelector((state: KanbasState) =>
      state.quizReducer.quizzes);
  const quiz = useSelector((state: KanbasState) =>
      state.quizReducer.quiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const now = new Date();

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' });
    return formatter.format(date);
  };
  const getAvailability = (quiz: any) => {
    const now = new Date();
    const available_date = new Date(quiz.available_date);
    const until_date = new Date(quiz.until_date);
    if (now < available_date) {
      return `Not available until ${formatDate(available_date)}`
    } else if (now >= available_date && now < until_date) {
      return `Available until ${formatDate(until_date)}`
    } else {
      return "Closed"
    }
  };
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
        <div className="d-flex">
          <div className="flex-fill">
      <span>
        <span className="float-end">
          <button className="btn btn-outline-secondary"><FaPlus/> Group</button>
          <button className="btn btn-danger"
                  onClick={() => handleNewQuizzes()}><FaPlus/> Quiz</button>
          <button className="btn btn-outline-secondary"><FaEllipsisV/></button>
        </span>
        <input type="text" className="form-control w-50" id="assignmentSearch"
               placeholder="Search for Quiz"/>
      </span>
            <hr/>
            <ul className="list-group wd-modules">
              <li className="list-group-item">
                <div>
                  <FaEllipsisV className="me-2"/> <FaCaretDown className="me-2"/> Assignment Quizzes
                  <span className="float-end">
              <span className="border me-3"
                    style={{borderRadius: 40, width: 120, textAlign: "center"}}>40% of Total</span>
              <FaPlusCircle className="ms-2"/><FaEllipsisV className="ms-2"/>
            </span>
                </div>
                <ul className="list-group">
                  {quizList.map((quiz, index) => (
                      <li key={index} className="list-group-item">
                        <FaEllipsisV className="me-2"/>
                        <FaEdit className="me-2"/>
                        {quiz.published ?
                            <Link to={`/Kanbas/Quizzes/${quiz._id}`} style={{color: "black"}}>{quiz.quiz_name}</Link> :
                            quiz.quiz_name}
                        <span className="float-end">
                  {quiz.published ?
                      <FaCheckCircle className="text-success"/> :
                      <FaBan className="text-secondary"/>}
                          <FaEllipsisV className="ms-2"/>
                </span><br/>
                        <span style={{fontSize: 10}}>
                  <a style={{color: "black"}}>{getAvailability(quiz)}</a> |
                          Due {formatDate(quiz.due_date)} at 11:59pm | {quiz.points} pts | {quiz.questions.length} Questions
                </span>
                        <button className="float-end btn btn-outline-danger"
                                onClick={() => handleDeleteButton(quiz)}>
                          Delete
                        </button>
                      </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </>
  )
      ;
}

export default Quizzes;