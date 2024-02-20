import React from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import {FaEllipsisV} from "react-icons/fa";
import {FaCheckCircle} from "react-icons/fa";
import {FaCalendarAlt } from "react-icons/fa";
import db from "../../../Database";
import './index.css';


function AssignmentEditor() {
  const {assignmentId} = useParams();
  const assignment = db.assignments.find(
      (assignment) => assignment._id === assignmentId);


  const {cid} = useParams();
  const navigate = useNavigate();
  const handleSave = () => {
    console.log("Actually saving assignment TBD in later assignments");
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };
  return (
      <div className="container-fluid d-flex flex-column mx-4" id="courses-content-container">
        <div className="d-flex flex-row align-items-center ms-auto" id="assignments-top-buttons">
          <div className="me-4">
            <FaCheckCircle className="text-success"/>
            Published
          </div>
          <button className="btn btn-secondary me-1" type="button">
            <FaEllipsisV/>
          </button>
        </div>
        <hr/>
        <form action="/Kanbas/Courses/Assignments/screen.html" className="mb-3">
          <div className="mb-3  align-items-center" id="assignment-name-container">
            <label htmlFor="assignment-name" className="form-label">
              Assignment Name
            </label>
            <input type="text" className="form-control" id="assignment-name"
                   aria-describedby="assignment name" value={assignment?.title}/>
          </div>
          <div className="mb-3 align-items-center" id="assignment-description-container">
                            <textarea name="assignment-description" id="assignment-description"
                                      className="form-control">{assignment?.description}
                            </textarea>
          </div>
          <div className="row mb-0 align-items-center p-100" id="assignment-points-container">
            <label htmlFor="assignment-points"
                   className="col-4 col-form-label text-end py-2">Points</label>
            <div className="col-6">
              <input type="text" className="form-control" id="assignment-points"/>
            </div>
            <div className="col"></div>
          </div>
          <div className="row mb-0 align-items-center" id="assignment-group-container">
            <label htmlFor="assignment-group" className="col-4 col-form-label text-end">Assignment
              Group</label>
            <div className="col-6">
              <select className="form-select" aria-label="Assignment Group Select"
                      id="assignment-group">
                <option selected>ASSIGNMENT</option>
                <option value="1">other option</option>
              </select>
            </div>
            <div className="col"></div>
          </div>
          <div className="row mb-3 align-items-center" id="assignment-display-grade-container">
            <label htmlFor="assignment-display-grade" className="col-4 col-form-label text-end">Display
              Grade
              As</label>
            <div className="col-6">
              <select className="form-select" aria-label="Assignment Group Select"
                      id="assignment-display-grade">
                <option selected>Percentage</option>
                <option value="1">other option</option>
              </select>
            </div>
            <div className="col"></div>
          </div>
          <div className="row mb-3" id="assignment-count-toward-final-container">
            <div className="col-4"></div>
            <div className="col-6">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value=""
                       id="assignment-count-toward-final"/>
                <label className="form-check-label" htmlFor="assignment-count-toward-final">
                  Do not count this assignment towards the final grade
                </label>
              </div>
            </div>
          </div>
          <div className="row mb-3" id="assignment-assign-container">
            <div className="col-4 col-form-label text-end">
              Assign
            </div>
            <div className="col-6">
              <div className="border rounded-top p-4" id="assignment-assign-box">
                <div className="row mb-3">
                  <div>
                    <label htmlFor="assign-to" className="form-label ellipsis">
                      <h6>Assign to</h6>
                    </label>
                    <input type="text" className="form-control" name="assign-to" id="assign-to"
                           value="Everyone"/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="due" className="form-label ellipsis">
                    <h6>Due</h6>
                  </label>
                  <div className="input-group">
                    <input type="text" className="form-control" name="due" id="due"
                           value="Feb 5, 2024, 11:59 PM"/>
                    <span className="input-group-text" id="due-icon">
                                                <FaCalendarAlt/>
                                            </span>
                  </div>
                </div>
                <div className="row" id="available-from-until-container">
                  <div className="col">
                    <label htmlFor="available-from" className="form-label ellipsis">
                      <h6>Available From</h6>
                    </label>
                    <div className="input-group">
                      <input type="text" className="form-control" name="available-from"
                             id="available-from" value="Sep 6, 2023, 12:00 AM"/>
                      <span className="input-group-text" id="from-icon">
                                                    <FaCalendarAlt/>
                                                </span>
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="available-until" className="form-label ellipsis">
                      <h6>Until</h6>
                    </label>
                    <div className="input-group">
                      <input type="text" className="form-control" id="available-until"
                             name="available-until" value=""/>
                      <span className="input-group-text" id="until-icon">
                                                    <FaCalendarAlt/>
                                                </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                  className="border rounded-bottom border-top-0 border-dotted d-flex justify-content-center align-items-center p-1 bg-light">
                <a href="#" className="link-no-decoration">
                  <i className="fa-solid fa-plus me-1"></i>
                  Add</a>
              </div>
            </div>
          </div>
          <hr/>
          <div className="d-flex flex-row" id="assignment-form-buttons-container">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value=""
                     id="notify-user-content-change"/>
              <label className="form-check-label" htmlFor="notify-user-content-change">
                Notify users that this content has changed
              </label>
            </div>
            <div className="ms-auto">
              <Link to={`/Kanbas/Courses/${cid}/Assignments`}
                    className="btn btn-secondary me-2">
                Cancel
              </Link>
              <Link to={`/Kanbas/Courses/${cid}/Assignments`}
                    className="btn btn-danger me-2">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
  );
}

export default AssignmentEditor;