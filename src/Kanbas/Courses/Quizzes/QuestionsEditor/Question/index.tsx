import {FaBan, FaCheckCircle, FaEdit, FaEllipsisV} from "react-icons/fa";
import {Link, NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
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
  const handleDeleteAnswerButton = (currQuestion: any) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this answer?');
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
  const handleDeletePossibleAnswerButton = (currQuestion: { _id: any; }, index: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this answer?');
    if (isConfirmed) {
      const updatedQuestions = quiz.questions.map((question: {
        _id: any;
        choices_possible_answers: any[];
      }) => {
        if (question._id === currQuestion._id) {
          const value = question.choices_possible_answers[index];
          const newChoicesPossibleAnswers = question.choices_possible_answers.filter((x) => x !== value);
          return {...question, choices_possible_answers: newChoicesPossibleAnswers};
        }
        return question;
      });
      dispatch(selectQuiz({...quiz, questions: updatedQuestions}));
    }
  };
  const handleDeleteBlanksAnswerButton = (currQuestion: { _id: any; }, index: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this answer?');
    if (isConfirmed) {
      const updatedQuestions = quiz.questions.map((question: {
        _id: any;
        blanks_answer: any[];
      }) => {
        if (question._id === currQuestion._id) {
          const newBlanksAnswer = question.blanks_answer.filter((_, idx) => idx !== index);
          return {...question, blanks_answer: newBlanksAnswer};
        }
        return question;
      });
      dispatch(selectQuiz({...quiz, questions: updatedQuestions}));
    }
  };
  const handleAddPossibleAnswerButton = (currQuestion: { _id: any; }) => {
    const updatedQuestions = quiz.questions.map((question: {
      _id: any;
      choices_possible_answers: any;
    }) => {
      if (question._id === currQuestion._id) {
        const newAnswers = [...question.choices_possible_answers, ""];
        return {...question, choices_possible_answers: newAnswers};
      }
      return question;
    });
    dispatch(selectQuiz({...quiz, questions: updatedQuestions}));
  };
  const handleAddBlanksAnswerButton = (currQuestion: {
    _id: any;
    blanks_answer: string | any[];
  }) => {
    const updatedQuestions = quiz.questions.map((question: {
      _id: any;
      blanks_answer: any;
    }) => {
      if (question._id === currQuestion._id) {
        const newBlanksAnswers = [...question.blanks_answer, {
          answer_id: currQuestion.blanks_answer.length + 1,
          answer: ""
        }];
        return {...question, blanks_answer: newBlanksAnswers};
      }
      return question;
    });
    dispatch(selectQuiz({...quiz, questions: updatedQuestions}));
  };
  const handleSaveQuestionButton = () => {
    client.updateQuiz(quiz).then(() => {
      dispatch(updateQuiz(quiz));
      alert("Question updated successfully!");
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/editquestions`);
    }).catch(err => {
      console.error("Failed to save the question:", err);
      alert("Failed to save the question. Please try again.");
    });
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
  const handleQuestionCorrectAnswerChange = (newChoicesCorrectAnswer: any) => {
    const updatedQuestions = quiz.questions.map((question: { _id: any; }) => {
      if (question._id === currQuestion._id) {
        return {...question, choices_correct_answer: newChoicesCorrectAnswer};
      }
      return question;
    });
    dispatch(selectQuiz({...quiz, questions: updatedQuestions}));
  };
  const handleQuestionPossibleAnswerChange = (newPossibleAnswer: any, index: number) => {
    const updatedQuestions = quiz.questions.map((question: {
      _id: any;
      choices_possible_answers: any;
    }) => {
      if (question._id === currQuestion._id) {
        const updatedPossibleAnswers = [...question.choices_possible_answers];
        updatedPossibleAnswers[index] = newPossibleAnswer;
        return {...question, choices_possible_answers: updatedPossibleAnswers};
      }
      return question;
    });
    dispatch(selectQuiz({...quiz, questions: updatedQuestions}));
  };
  const handleAnswerChange = (newAnswer: any) => {
    const updatedQuestions = quiz.questions.map((question: { _id: any; }) => {
      if (question._id === currQuestion._id) {
        return {...question, answer: newAnswer};
      }
      return question;
    });
    dispatch(selectQuiz({...quiz, questions: updatedQuestions}));
  };
  const handleQuestionBlanksAnswerChange = (newBlanksAnswer: any, index: number) => {
    const updatedQuestions = quiz.questions.map((question: {
      _id: any;
      blanks_answer: any;
    }) => {
      if (question._id === currQuestion._id) {
        const updatedBlanksAnswers = [...question.blanks_answer];
        updatedBlanksAnswers[index] = {answer_id: index + 1, answer: newBlanksAnswer};
        return {...question, blanks_answer: updatedBlanksAnswers};
      }
      return question;
    });
    dispatch(selectQuiz({...quiz, questions: updatedQuestions}));
  };
  const DisplayMultipleChoiceQuestionAnswers = () => {
    return (
        <div>
          <ul className="list-group">
            <span>Correct Answer</span>
            <li key={0} className="list-group-item">
              <input value={currQuestion?.choices_correct_answer} onChange={(e) =>
                  handleQuestionCorrectAnswerChange(e.target.value)
              } className="form-control" placeholder="New Question"/>
            </li>

            <span>Possible Answer</span>
            {currQuestion.choices_possible_answers.map((answer: any, index: number) => (
                <li key={index} className="list-group-item"><FaEdit
                    className="me-2"/>
                  <input value={answer} onChange={(e) =>
                      handleQuestionPossibleAnswerChange(e.target.value, index)
                  } className="form-control" placeholder="New Question"/>
                  <button className="float-end btn btn-outline-danger"
                          onClick={() => handleDeletePossibleAnswerButton(currQuestion, index)}>
                    Delete
                  </button>
                </li>))}
          </ul>
          <button className="btn btn-outline-secondary"
                  onClick={() => handleAddPossibleAnswerButton(currQuestion)}>
            Add Another Answer
          </button>
        </div>
    );
  }
  const DisplayTrueFalseQuestionAnswers = () => {
    return (
        <div>
          <label>
            <input checked={currQuestion.answer} type="checkbox"
                   onChange={(e) =>
                       handleAnswerChange(e.target.checked)
                   }/>
            {currQuestion.answer ? "True" : "False"}
          </label>
        </div>
    );
  }
  const DisplayMultipleBlanksQuestionAnswers = () => {
    return (
        <div>
          <ol className="list-group">
            {currQuestion.blanks_answer.map((blank_answer: any, index: number) => (
                <li key={index} className="list-group-item"><FaEdit
                    className="me-2"/> Blank {index + 1}
                  <input value={blank_answer.answer} onChange={(e) =>
                      handleQuestionBlanksAnswerChange(e.target.value, index)
                  } className="form-control" placeholder="New Question"/>
                  <button className="float-end btn btn-outline-danger"
                          onClick={() => handleDeleteBlanksAnswerButton(currQuestion, index)}>
                    Delete
                  </button>
                </li>))}
          </ol>
          <button className="btn btn-outline-secondary"
                  onClick={() => handleAddBlanksAnswerButton(currQuestion)}>
            Add Another Blank
          </button>
        </div>
    );
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
            <option>True False Question</option>
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
        <button className="btn btn-outline-secondary">
          <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/editquestions`}
                style={{color: "black"}}>Cancel</Link>
        </button>
        <button className="btn btn-outline-success"
                onClick={() => handleSaveQuestionButton()}>
          Update Question
        </button>
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