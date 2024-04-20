import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentReducer from "../Courses/Assignments/reducer";
import quizReducer from "../Courses/Quizzes/reducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  assignmentReducer: {
    assignments: any[];
    assignment: any;
    tempAssignment: any;
  };
  quizReducer: {
    quizzes: any[];
    quiz: any;
    tempQuiz: any;
  };
}
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentReducer,
    quizReducer,
  }
});
 
export default store;