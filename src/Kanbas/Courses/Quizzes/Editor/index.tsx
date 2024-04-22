import React, {useEffect} from "react";
import {useNavigate, useLocation, useParams, NavLink, Link} from "react-router-dom";
import {FaBan, FaCheckCircle, FaEllipsisV} from "react-icons/fa";
import {KanbasState} from "../../../store";
import * as client from "../client";
import {
  addQuiz,
  updateQuiz,
  selectQuiz,
  deleteQuiz,
  setQuizzes,
} from "../reducer";

import {useSelector, useDispatch} from "react-redux";
import {selectAssignment} from "../../Assignments/reducer";

function QuizEditor() {
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
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
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
      <div className="flex-fill">
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
        <div className="form-control-input">
          <div className="mb-3">
            <p>Quiz Name</p>
            <input value={quiz?.quiz_name} onChange={(e) =>
                dispatch(selectQuiz({...quiz, quiz_name: e.target.value}))
            } className="form-control mb-2" placeholder="New Quiz"/>
          </div>
          <div className="mb-3">
            <p>Quiz Instructions: </p>
            <textarea className="form-control" id="quizDescription"
                      value={quiz?.quiz_instructions} onChange={(e) =>
                dispatch(selectQuiz({...quiz, quiz_instructions: e.target.value}))
            }></textarea>
          </div>
          <div className="mb-3 row">
            Quiz Type
            <select className="form-control" id="quiztype" value={quiz?.quiz_type}
                    onChange={(e) =>
                        dispatch(selectQuiz({...quiz, quiz_type: e.target.value}))
                    }>
              <option>Graded Quiz</option>
              <option>Practice Quiz</option>
              <option>Graded Survey</option>
              <option>Ungraded Survey</option>
            </select>
          </div>
          <div className="mb-3">
            <p>Points</p>
            <input type="number" value={quiz?.points} onChange={(e) =>
                dispatch(selectQuiz({...quiz, points: e.target.value}))
            } className="form-control mb-2" placeholder="100"/>
          </div>
          <div className="mb-3 row">
            Assignment Group
            <select className="form-control" id="assignmentGroup" value={quiz?.assignment_group}
                    onChange={(e) =>
                        dispatch(selectQuiz({...quiz, assignment_group: e.target.value}))
                    }>
              <option>quizzes</option>
              <option>exams</option>
              <option>assignments</option>
              <option>project</option>
            </select>
          </div>
          <div className="mb-3 row">
            Options
            <label>
              <input checked={quiz.shuffle_answers} type="checkbox"
                     onChange={(e) =>
                         dispatch(selectQuiz({...quiz, shuffle_answers: e.target.checked}))
                     }/>
              Shuffle Answers
            </label>
            Time Limit
            <input value={quiz?.time_limit} onChange={(e) =>
                dispatch(selectQuiz({...quiz, time_limit: e.target.value}))
            } className="form-control mb-2" placeholder="New Quiz"/>
            <label>
              <input checked={quiz.multiple_attempts} type="checkbox"
                     onChange={(e) =>
                         dispatch(selectQuiz({...quiz, multiple_attempts: e.target.checked}))
                     }/>
              Allow Multiple Attempts
            </label>
            <label>
              <input checked={quiz.show_correct_answers} type="checkbox"
                     onChange={(e) =>
                         dispatch(selectQuiz({...quiz, show_correct_answers: e.target.checked}))
                     }/>
              Show Correct Answers
            </label>
            <br/>
          </div>
          <div className="mb-3">
            <p>Access Code</p>
            <input type="text" value={quiz?.access_code} onChange={(e) =>
                dispatch(selectQuiz({...quiz, access_code: e.target.value}))
            } className="form-control mb-2" placeholder="Access Code"/>
          </div>
          <label>
            <input checked={quiz.one_question_at_a_time} type="checkbox"
                   onChange={(e) =>
                       dispatch(selectQuiz({...quiz, one_question_at_a_time: e.target.checked}))
                   }/>
            One Question at a Time
          </label>
          <br/>
          <label>
            <input checked={quiz.webcam_required} type="checkbox"
                   onChange={(e) =>
                       dispatch(selectQuiz({...quiz, webcam_required: e.target.checked}))
                   }/>
            Webcam Required
          </label>
          <br/>
          <label>
            <input checked={quiz.lock_questions_after_answering} type="checkbox"
                   onChange={(e) =>
                       dispatch(selectQuiz({
                         ...quiz,
                         lock_questions_after_answering: e.target.checked
                       }))
                   }/>
            Lock Questions After Answering
          </label>
          <br/>
          <div className="mb-3">
            <p>Assign to</p>
            <select className="form-control" id="assignmentGroup" value="Everyone">
              <option>Everyone</option>
            </select>
          </div>
          <div className="mb-3">
            <p>Due</p>
            <input type="date" value={formatDate(quiz?.due_date)} onChange={(e) =>
                dispatch(selectQuiz({...quiz, due_date: e.target.value}))
            } className="form-control mb-2"/>
          </div>
          <div className="mb-3">
            <p>Available from</p>
            <input type="date" value={formatDate(quiz?.available_date)} onChange={(e) =>
                dispatch(selectQuiz({...quiz, available_date: e.target.value}))
            } className="form-control mb-2"/>
          </div>
          <div className="mb-3">
            <p>Until</p>
            <input type="date" value={formatDate(quiz?.until_date)} onChange={(e) =>
                dispatch(selectQuiz({...quiz, until_date: e.target.value}))
            } className="form-control mb-2"/>
          </div>
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
      </div>
  )
      ;
}

export default QuizEditor;