import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentReducer from "../Courses/Assignments/reducer";
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
}
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentReducer,
  }
});
 
export default store;