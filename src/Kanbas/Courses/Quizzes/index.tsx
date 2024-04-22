import React, {useState, useEffect} from "react";
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
  const {courseId} = useParams();
  const quizList = useSelector((state: KanbasState) => state.quizReducer.quizzes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    client.findAllQuizzes().then(quizzes => dispatch(setQuizzes(quizzes)));
  }, [dispatch]);

  const handleTogglePublish = (quiz: any) => {
    const updatedQuiz = {...quiz, published: !quiz.published};
    client.updateQuiz(updatedQuiz)
    .then(() => {
      const updatedQuizzes = quizList.map(q =>
          q._id === quiz._id ? updatedQuiz : q
      );
      dispatch(setQuizzes(updatedQuizzes));
    })
    .catch(err => {
      console.error("Failed to update quiz", err);
    });
  };

  const toggleMenu = (quizId: any) => {
    setActiveMenu(activeMenu === quizId ? null : quizId);
  };
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };
  const getAvailability = (quiz: any) => {
    const now = new Date();
    const available_date = new Date(quiz.available_date);
    const until_date = new Date(quiz.until_date);
    if (now < available_date) {
      return `Not available until ${formatDate(available_date)}`
    } else if (now < until_date) {
      return "Available"
    } else {
      return "Closed"
    }
  };

  const handleEditQuiz = (quizId: any) => {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`);
  };

  const handleDeleteQuiz = (quizId: any) => {
    const isConfirmed = window.confirm('Are you sure you want to delete?');
    if (isConfirmed) {
      client.deleteQuiz(quizId).then(() => {
        dispatch(deleteQuiz(quizId));
        setActiveMenu(null);
      });
    }
  };

  return (
      <>
        <div className="d-flex">
          <div className="flex-fill">
          <span className="float-end">
            <button className="btn btn-outline-secondary"><FaPlus/> Group</button>
            <button className="btn btn-danger"
                    onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/new`)}><FaPlus/> Quiz</button>
            <button className="btn btn-outline-secondary"><FaEllipsisV/></button>
          </span>
            <input type="text" className="form-control w-50" placeholder="Search for Quiz"/>
            <hr/>
            <ul className="list-group wd-modules">
              {quizList.map((quiz, index) => (
                  <li key={index} className="list-group-item">
                    <FaEllipsisV className="me-2 clickable" onClick={() => toggleMenu(quiz._id)}/>
                    {activeMenu === quiz._id && (
                        <ul className="context-menu">
                          <li onClick={() => handleEditQuiz(quiz._id)}>Edit</li>
                          <li onClick={() => handleDeleteQuiz(quiz._id)}>Delete</li>
                          <li onClick={() => handleTogglePublish(quiz)}>{quiz.published ? 'Unpublish' : 'Publish'}</li>
                        </ul>
                    )}
                    <FaEdit className="me-2 clickable" onClick={() => handleEditQuiz(quiz._id)}/>
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
                          style={{color: "black"}}>{quiz.quiz_name}</Link>
                    <span className="float-end">
                  {quiz.published ? <FaCheckCircle className="text-success"/> :
                      <FaBan className="text-secondary"/>}
                      <FaEllipsisV className="ms-2"/>
                </span>
                    <br/>
                    <span style={{fontSize: 10}}>
                  {getAvailability(quiz)} |
                  Due {formatDate(quiz.due_date)} at 11:59pm | {quiz.points} pts | {quiz.questions.length} Questions
                </span>
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </>
  );
}

export default Quizzes;
