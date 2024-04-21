import {FaBan, FaCheckCircle, FaEllipsisV} from "react-icons/fa";
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {KanbasState} from "../../../../store";
import * as client from "../../client";
import {addQuiz, selectQuiz, setQuizzes, updateQuiz} from "../../reducer";

function QuestionEditor() {
  const {courseId, quizId, questionId} = useParams();
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

  const currQuestion = quiz.questions.filter((question: {
    _id: any;
  }) => question._id === questionId)[0];
  const handleTextChange = (newText: any) => {
    const updatedQuestions = quiz.questions.map((question: { _id: any; }) => {
      if (question._id === currQuestion._id) {
        return {...question, text: newText};
      }
      return question;
    });
    dispatch(selectQuiz({...quiz, questions: updatedQuestions}));
  };
  const handleTypeChange = (newType: any) => {
    const updatedQuestions = quiz.questions.map((question: { _id: any; }) => {
      if (question._id === currQuestion._id) {
        return {...question, type: newType};
      }
      return question;
    });
    dispatch(selectQuiz({...quiz, questions: updatedQuestions}));
  };
  const handlePointsChange = (newPoints: any) => {
    const updatedQuestions = quiz.questions.map((question: { _id: any; }) => {
      if (question._id === currQuestion._id) {
        return {...question, points: newPoints};
      }
      return question;
    });
    dispatch(selectQuiz({...quiz, questions: updatedQuestions}));
  };
  const handleQuestionChange = (newQuestion: any) => {
    const updatedQuestions = quiz.questions.map((question: { _id: any; }) => {
      if (question._id === currQuestion._id) {
        return {...question, question: newQuestion};
      }
      return question;
    });
    dispatch(selectQuiz({...quiz, questions: updatedQuestions}));
  };
  const DisplayMultipleChoiceQuestionAnswers = () => {
    return (<h1>DisplayMultipleChoiceQuestionAnswers</h1>)
  }
  const DisplayTrueFalseQuestionAnswers = () => {
    return (<h1>DisplayTrueFalseQuestionAnswers</h1>)
  }
  const DisplayMultipleBlanksQuestionAnswers = () => {
    return (<h1>DisplayMultipleBlanksQuestionAnswers</h1>)
  }
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
        <div className="mb-3 d-flex">
          <input value={currQuestion?.text} onChange={(e) =>
              handleTextChange(e.target.value)
          } className="form-control" placeholder="New Question"/>
          <select className="form-control" id="quiztype" value={currQuestion?.type}
                  onChange={(e) =>
                      handleTypeChange(e.target.value)
                  }>
            <option>Multiple Choice Question</option>
            <option>True/False Question</option>
            <option>Multiple Blanks Question</option>
          </select>
          <span className="fw-bold align-content-center">pts:</span>
          <input value={currQuestion?.points} onChange={(e) =>
              handlePointsChange(e.target.value)
          } className="form-control" placeholder="New Question"/>
        </div>
        <hr/>
        <div>
          <span style={{fontSize: 18}} className="fw-bold">Question:</span>
          <textarea className="form-control"
                    value={currQuestion?.question} onChange={(e) =>
              handleQuestionChange(e.target.value)
          }></textarea>
        </div>
        <div>
          <span style={{fontSize: 18}} className="fw-bold">Answer:</span>
          {currQuestion.type === "Multiple Choice Question" ?
              DisplayMultipleChoiceQuestionAnswers() : currQuestion.type === "True/False Question" ?
                  DisplayTrueFalseQuestionAnswers() : DisplayMultipleBlanksQuestionAnswers()}
        </div>
        <h1>Current Question Status</h1>
        type: {currQuestion.type}<br/>
        text: {currQuestion.text}<br/>
        points: {currQuestion.points}<br/>
        question: {currQuestion.question}<br/>
        choices_correct_answer: {currQuestion.choices_correct_answer}<br/>
        choices_possible_answers: {currQuestion.choices_possible_answers}<br/>
        answer: {currQuestion.answer ? "True" : "False"}<br/>
        blanks_answer: {currQuestion.blanks_answer.map((answer: any) => (
          <div>
            answer_id: {answer.answer_id}<br/>
            answer: {answer.answer}<br/>
          </div>
      ))}<br/>
      </div>
  );
}

export default QuestionEditor