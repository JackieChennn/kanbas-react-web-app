import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  quizzes: Array<any>(),
  quiz: {
    "_id": "new",
    "quiz_name": "New Quiz",
    "quiz_type": "Graded Quiz",
    "points": 100,
    "assignment_group": "quizzes",
    "shuffle_answers": true,
    "time_limit": 20,
    "multiple_attempts": false,
    "show_correct_answers": false,
    "access_code": "",
    "one_question_at_a_time": true,
    "webcam_required": false,
    "lock_questions_after_answering": false,
    "due_date": "2024-04-19T00:00:00.000Z",
    "available_date": "2024-04-10T00:00:00.000Z",
    "until_date": "2024-04-22T00:00:00.000Z",
    "published": false,
    "quiz_instructions": "Instructions",
    "questions": [
      {
        "_id": "66232cab3689ecd8236703e8",
        "question_id": "001",
        "type": "Multiple Choice Question",
        "text": "Multiple Choice Question Title",
        "points": 10,
        "question": "How much is 2 + 2?",
        "choices_correct_answer": "4",
        "choices_possible_answers": [
          "3",
          "5"
        ],
        "answer": false,
        "blanks_answer": [
          {
            "_id": "66232cab3689ecd8236703e9",
            "answer_id": "001",
            "answer": "2"
          },
          {
            "_id": "66232cab3689ecd8236703ea",
            "answer_id": "002",
            "answer": "-2"
          }
        ]
      },
      {
        "_id": "66232cab3689ecd8236703eb",
        "question_id": "002",
        "type": "True False Question",
        "text": "True False Question Title",
        "points": 10,
        "question": "2 + 2 = 4",
        "choices_correct_answer": "4",
        "choices_possible_answers": [
          "3",
          "5"
        ],
        "answer": true,
        "blanks_answer": [
          {
            "_id": "66232cab3689ecd8236703ec",
            "answer_id": "001",
            "answer": "2"
          },
          {
            "_id": "66232cab3689ecd8236703ed",
            "answer_id": "002",
            "answer": "-2"
          }
        ]
      },
      {
        "_id": "66232cab3689ecd8236703ee",
        "question_id": "003",
        "type": "Multiple Blanks Question",
        "text": "Multiple Blanks Question Title",
        "points": 10,
        "question": "x * x = 4",
        "choices_correct_answer": "4",
        "choices_possible_answers": [
          "3",
          "5"
        ],
        "answer": false,
        "blanks_answer": [
          {
            "_id": "66232cab3689ecd8236703ef",
            "answer_id": "001",
            "answer": "2"
          },
          {
            "_id": "66232cab3689ecd8236703f0",
            "answer_id": "002",
            "answer": "-2"
          }
        ]
      }
    ]
  },
  tempQuiz: {
    "_id": "new",
    "quiz_name": "New Quiz",
    "quiz_type": "Graded Quiz",
    "points": 100,
    "assignment_group": "quizzes",
    "shuffle_answers": true,
    "time_limit": 20,
    "multiple_attempts": false,
    "show_correct_answers": false,
    "access_code": "",
    "one_question_at_a_time": true,
    "webcam_required": false,
    "lock_questions_after_answering": false,
    "due_date": "2024-04-19T00:00:00.000Z",
    "available_date": "2024-04-10T00:00:00.000Z",
    "until_date": "2024-04-22T00:00:00.000Z",
    "published": false,
    "quiz_instructions": "Instructions",
    "questions": [
      {
        "_id": "66232cab3689ecd8236703e8",
        "question_id": "001",
        "type": "Multiple Choice Question",
        "text": "Multiple Choice Question Title",
        "points": 10,
        "question": "How much is 2 + 2?",
        "choices_correct_answer": "4",
        "choices_possible_answers": [
          "3",
          "5"
        ],
        "answer": false,
        "blanks_answer": [
          {
            "_id": "66232cab3689ecd8236703e9",
            "answer_id": "001",
            "answer": "2"
          },
          {
            "_id": "66232cab3689ecd8236703ea",
            "answer_id": "002",
            "answer": "-2"
          }
        ]
      },
      {
        "_id": "66232cab3689ecd8236703eb",
        "question_id": "002",
        "type": "True False Question",
        "text": "True False Question Title",
        "points": 10,
        "question": "2 + 2 = 4",
        "choices_correct_answer": "4",
        "choices_possible_answers": [
          "3",
          "5"
        ],
        "answer": true,
        "blanks_answer": [
          {
            "_id": "66232cab3689ecd8236703ec",
            "answer_id": "001",
            "answer": "2"
          },
          {
            "_id": "66232cab3689ecd8236703ed",
            "answer_id": "002",
            "answer": "-2"
          }
        ]
      },
      {
        "_id": "66232cab3689ecd8236703ee",
        "question_id": "003",
        "type": "Multiple Blanks Question",
        "text": "Multiple Blanks Question Title",
        "points": 10,
        "question": "x * x = 4",
        "choices_correct_answer": "4",
        "choices_possible_answers": [
          "3",
          "5"
        ],
        "answer": false,
        "blanks_answer": [
          {
            "_id": "66232cab3689ecd8236703ef",
            "answer_id": "001",
            "answer": "2"
          },
          {
            "_id": "66232cab3689ecd8236703f0",
            "answer_id": "002",
            "answer": "-2"
          }
        ]
      }
    ]
  }
};

const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes = [
        ...state.quizzes,
        {...action.payload, _id: new Date().getTime().toString()},
      ];
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
          (quizzes) => quizzes._id !== action.payload
      );

    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quizzes) => {
        if (quizzes._id === action.payload._id) {
          return action.payload;
        } else {
          return quizzes;
        }
      });
    },
    selectQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    deleteQuestion: (state, action) => {
      state.quiz.questions = state.quiz.questions.filter(question => question._id !== action.payload.questionId);
    },
  },
});

export const {
  addQuiz, deleteQuiz,
  updateQuiz, selectQuiz, setQuizzes
} = quizSlice.actions;
export default quizSlice.reducer;