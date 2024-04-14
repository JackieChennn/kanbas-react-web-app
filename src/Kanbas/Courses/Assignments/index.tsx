import React, {useEffect, useState} from "react";
import {
  FaCaretDown,
  FaCheckCircle,
  FaEdit,
  FaEllipsisV,
  FaPlus,
  FaPlusCircle,
} from "react-icons/fa";
import {useNavigate, useParams, Link} from "react-router-dom";
import {KanbasState} from "../../store";
import {
  deleteAssignment,
  setAssignments
} from "./reducer";

import * as client from "./client";
import {useSelector, useDispatch} from "react-redux";

function Assignments() {
  const assignmentList = useSelector((state: KanbasState) =>
      state.assignmentReducer.assignments);
  const assignment = useSelector((state: KanbasState) =>
      state.assignmentReducer.assignment);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewAssignments = () => {
    navigate(`/Kanbas/Courses/${courseId}/Assignments/new`);
  };
  const {courseId} = useParams();

  useEffect(() => {
    client
    .findAssignmentForCourse(courseId)
    .then((assignment) => dispatch(setAssignments(assignment)));
  }, [courseId, dispatch]);

  const handleDeleteButton = (assignment: { _id: any; }) => {
    const isConfirmed = window.confirm('Are you sure you want to delete?');
    if (isConfirmed) {
      client.deleteAssignment(assignment._id).then(() => {
        dispatch(deleteAssignment(assignment._id));
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
          <button className="btn btn-danger" onClick={() => handleNewAssignments()}><FaPlus/> Assignment</button>
          <button className="btn btn-outline-secondary"><FaEllipsisV/></button>
        </span>
        <input type="text" className="form-control w-50" id="assignmentSearch"
               placeholder="Search for Assignment"/>
      </span>
            <hr/>
            <ul className="list-group wd-modules">
              <li className="list-group-item">
                <div>
                  <FaEllipsisV className="me-2"/> <FaCaretDown className="me-2"/> ASSIGNMENTS
                  <span className="float-end">
              <span className="border me-3"
                    style={{borderRadius: 40, width: 120, textAlign: "center"}}>40% of Total</span>
              <FaPlusCircle className="ms-2"/><FaEllipsisV className="ms-2"/>
            </span>
                </div>
                <ul className="list-group">
                  {assignmentList.filter((assignment) => assignment.course === courseId).map((assignment, index) => (
                      <li key={index} className="list-group-item">
                        <FaEllipsisV className="me-2"/>
                        <FaEdit className="me-2"/>
                        <Link
                            to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>{assignment.title}</Link>
                        <span className="float-end">
                  <FaCheckCircle className="text-success"/><FaEllipsisV
                            className="ms-2"/></span><br/>
                        <span style={{fontSize: 10}}><a
                            style={{color: "red"}}>{assignment.module}</a> | {assignment.dueDate} at 11:59pm | {assignment.points}</span>
                        <button className="float-end btn btn-outline-danger"
                                onClick={() => handleDeleteButton(assignment)}>
                          Delete
                        </button>
                      </li>))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </>
  );
}

export default Assignments;