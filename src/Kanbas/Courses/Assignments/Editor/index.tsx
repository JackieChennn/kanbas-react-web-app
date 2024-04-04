import React, {useEffect} from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { assignments } from "../../../Database";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { KanbasState } from "../../../store";
import * as client from "../client";
import {
    addAssignment,
    updateAssignment,
    selectAssignment,
  } from "../reducer";

import { useSelector, useDispatch } from "react-redux";
function AssignmentEditor() {
  const { courseId, assignmentId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const assignments = useSelector(
    (state: KanbasState) => state.assignmentReducer.assignments
  );
  const tempAssignment = useSelector(
    (state: KanbasState) => state.assignmentReducer.tempAssignment
  );
  const assignment = useSelector(
    (state: KanbasState) => state.assignmentReducer.assignment
  );
  const handleSave = () => {
    if (pathname.includes("new")) {
      client.createAssignment(courseId, assignment).then(() => {
        dispatch(addAssignment({ ...assignment, course: courseId }));
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
      });
    } else {
      client.updateAssignment(assignment).then(() => {
        dispatch(updateAssignment(assignment));
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
      });
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (assignmentId !== "new") {
      const currentAssignment = assignments.find(
        (assignment) => assignment._id === assignmentId
      );
      if (currentAssignment) {
        dispatch(selectAssignment(currentAssignment));
      }
    } else {
      dispatch(selectAssignment(tempAssignment));
    }
  }, [assignmentId, assignments, tempAssignment, dispatch]);

  return (
        <div className="flex-fill">
        <span className="float-end">
            <FaCheckCircle className="text-success"/> Published
            <button className="btn btn-outline-secondary"><FaEllipsisV/></button>
        </span><br/>
        <hr/>  
        <div className="mb-3">
            <h2>Assignment Name</h2>
            <input value={assignment?.title} onChange={(e) =>
            dispatch(selectAssignment({ ...assignment, title: e.target.value }))
          } className="form-control mb-2" />
        </div>
        <div className="mb-3 row">
            <div className="col-md-6">
                <textarea className="form-control" id="assignmentDescription"  value={assignment?.description} onChange={(e) =>
            dispatch(selectAssignment({ ...assignment, description: e.target.value }))
          }  ></textarea>
            </div>
        </div>
            
        <div className="mb-3 row">
            <label htmlFor="points" className="form-label col-sm-2">Points</label>
            <div className="col-md-4">
                <input type="number" value = {assignment?.points} className="form-control" id="points" onChange={(e) =>
            dispatch(selectAssignment({ ...assignment, points: e.target.value }))
          } />
            </div>
        </div>
            
        <div className="mb-3 row">
            <label htmlFor="assignmentGroup" className="form-label col-sm-2">Assignment Group</label>
            <div className="col-md-4">
            <select className="form-control" id="assignmentGroup">
                <option>ASSIGNMENT</option>
                <option>QUIZ</option>
                <option>EXAM</option>
                <option>PROJECT</option>
            </select>
            </div>
        </div>
            
        <div className="mb-3 row align-items-center">
            <label htmlFor="displayGradeAs" className="form-label col-sm-2">Display Grade as</label>
            <div className="col-md-4">
            <select className="form-control" id="displayGradeAs">
                <option>Percentage</option>
            </select>
            </div>
        </div>
            
        <div className="mb-3">
            <input type="checkbox" className="form-check-input" id="checkbox" name="online-entry-options"/>
            <label className="form-check-label" htmlFor="checkboc">Do not count this assignment towards the final grade</label><br />      
        </div>

        <div className="col-lg-6">
            <div className="row">
                <div className="col-md-4">
                    <label htmlFor="displayGradeAs" className="form-label">Assign</label>
                </div> 
            <div className="col-lg-7">
                <div className="list-group">
                    <div className="list-group-item">
                        <label htmlFor="assignTo" className="form-label">Assign to</label>
                        <input type="text" className="form-control" value="Everyone" />
                    </div>
                    <div className="list-group-item">
                        <label htmlFor="dueDate" className="form-label">Due Date</label>
                        <input type="date" className="form-control"  value = {assignment?.dueDate}
   onChange={(e) =>
            dispatch(selectAssignment({ ...assignment, dueDate: e.target.value }))
          } />
                    </div>
                    <div className="list-group-item">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="availableFrom" className="form-label">Available from</label>
                                <input type="date" className="form-control" value={assignment?.availableFromDate}
   onChange={(e) =>
            dispatch(selectAssignment({ ...assignment, availableFromDate: e.target.value }))
          } />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="until" className="form-label">Until</label>
                                <input type="date" className="form-control" value={assignment?.availableUntilDate}
  onChange={(e) =>
            dispatch(selectAssignment({ ...assignment, availableUntilDate: e.target.value }))
          } />
                            </div>
                        </div>
                    </div>
                    <div className="list-group-item text-center">
                        <p className="m-0">+ Add</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
      <hr/>
      <div className="mb-3 row">
        <div className="col-sm-8">
          <input type="checkbox" className="form-check-input" id="checkbox" name="online-entry-options"/>
          <label className="form-check-label" htmlFor="checkbox">Notify users that this content has changed</label>
        </div>
        <div className="col-sm-4 text-end">
      <button className="btn btn-success ms-2 float-end"
        onClick={() => handleSave()}>
        Save
      </button>
      <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
            className="btn btn-danger float-end">
        Cancel
      </Link>
        </div>
      </div>
      <hr/>
    </div>
    );
}

export default AssignmentEditor;