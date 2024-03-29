import React from "react";
import {FaCheckCircle, FaEllipsisV, FaPlusCircle} from "react-icons/fa";
import {Link, useParams, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {KanbasState} from "../../store";
import {
  deleteAssignment,
  selectAssignment,
  resetAssignment,
} from "./assignmentsReducer";
import "./index.css";

function Assignments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {cid} = useParams();
  const assignments = useSelector(
      (state: KanbasState) => state.assignmentsReducer.assignments
  );
  const assignmentList = assignments.filter(
      (assignment) => assignment.course === cid
  );
  const handleAddAssignment = () => {
    dispatch(resetAssignment());
    navigate(`/Kanbas/Courses/${cid}/Assignments/A`);
  };

  return (
      <>
        {/* Add buttons and other fields here  */}
        <div className="d-flex">
          <div className="flex-fill">
            <input
                className="form-control w-25 wd-input-group-search"
                placeholder="Search for Assignments"
            />
          </div>
          <span className="float-end">
          <button className="btn btn-light me-2">+ Group</button>
          <button onClick={handleAddAssignment} className="btn btn-danger">
            + Assignment
          </button>
        </span>
        </div>
        <hr/>
        {/* Assignments  */}
        <ul className="list-group wd-modules">
          <li className="list-group-item wd-assignments-section-title">
            <div>
              <FaEllipsisV className="me-2"/> ASSIGNMENTS
              <span className="float-end">
              <FaCheckCircle className="text-success"/>
              <FaPlusCircle className="ms-2"/>
              <FaEllipsisV className="ms-2"/>
            </span>
            </div>
            <ul className="list-group">
              {assignmentList.map((assignment) => (
                  <li className="list-group-item wd-assignment-list-item">
                    <FaEllipsisV className="me-2"/>
                    <Link
                        onClick={() => dispatch(selectAssignment(assignment._id))}
                        to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                    >
                      {assignment.title}
                    </Link>
                    <span className="float-end">
                  <FaCheckCircle className="text-success"/>
                  <FaEllipsisV className="ms-2"/>
                  <button
                      className="btn btn-danger"
                      onClick={() => {
                        // pop-up dialog with Yes/No Options
                        const isConfirmed = window.confirm(
                            "Are you sure you want to remove the assignment?"
                        );
                        if (isConfirmed) {
                          dispatch(deleteAssignment(assignment._id));
                        }
                      }}
                  >
                    Delete
                  </button>
                </span>
                  </li>
              ))}
            </ul>
          </li>
        </ul>
      </>
  );
}

export default Assignments;