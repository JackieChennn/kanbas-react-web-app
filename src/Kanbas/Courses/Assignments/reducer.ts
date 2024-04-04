import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: Array<any>(),
  assignment: {
  _id: "new",
  title: "New Assignment",
  dueDate: "09/01/2020",
  availableUntilDate:"10/09/2020",
  availableFromDate:"10/09/2021",
  description:"This is a Assignment",
  course: "RS101",
  module: "Multiple Modules",
  due: "Due Jan 18 at 11:59pm",
  points: "100"
},
tempAssignment: {
  _id: "new",
  title: "New Assignment",
  dueDate: "09/01/2020",
  availableUntilDate:"10/09/2020",
  availableFromDate:"10/09/2021",
  description:"This is a Assignment",
  course: "RS101",
  module: "Multiple Modules",
  due: "Due Jan 18 at 11:59pm",
  points: "100"
}
};

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      state.assignments = [
        ...state.assignments,
        { ...action.payload, _id: new Date().getTime().toString() },
      ];
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
      
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment) => {
        if (assignment._id === action.payload._id) {
          return action.payload;
        } else {
          return assignment;
        }
      });
    },
    selectAssignment: (state, action) => {
      state.assignment = action.payload;
    },
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
  },
});

export const { addAssignment, deleteAssignment,
  updateAssignment, selectAssignment, setAssignments } = assignmentSlice.actions;
export default assignmentSlice.reducer;