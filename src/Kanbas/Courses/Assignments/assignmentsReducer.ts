import { createSlice } from "@reduxjs/toolkit";
import {useState, useEffect } from "react";
import axios from "axios";

const initialState = {
  assignments: db.assignments,
  assignment: {
    _id: "A",
    title: "New Assignment",
    course: "",
    description: "Assignment Desscription",
  },
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      state.assignments = [
        { ...action.payload, _id: "A" + new Date().getTime().toString() },
        ...state.assignments,
      ];
      console.log("payload: ", action.payload);
      console.log("all assignments: ", state.assignments);
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((a) => {
        if (a._id === action.payload._id) {
          return action.payload;
        } else {
          return a;
        }
      });
    },
    setAssignment: (state, action) => {
      state.assignment = action.payload;
    },
    selectAssignment: (state, action) => {
      state.assignment =
        state.assignments.find((a) => a._id === action.payload) ||
        state.assignment;
    },
    resetAssignment: (state) => {
      state.assignment = initialState.assignment;
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
  selectAssignment,
  resetAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;