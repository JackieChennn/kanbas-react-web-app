import React from "react";
import {FaEllipsisV, FaCheckCircle} from "react-icons/fa";
import {
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {KanbasState} from "../../../store";
import {
  addAssignment,
  updateAssignment,
  setAssignment,
} from "../assignmentsReducer";

function AssignmentEditor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {cid} = useParams();
  // const { assignmentId } = useParams();
  const assignments = useSelector(
      (state: KanbasState) => state.assignmentsReducer.assignments
  );
  const assignment = useSelector(
      (state: KanbasState) => state.assignmentsReducer.assignment
  );
  const handleSave = () => {
    if (assignments.find((a) => a._id === assignment._id)) {
      dispatch(updateAssignment(assignment));
    } else {
      dispatch(addAssignment({...assignment, course: cid}));
    }
    // console.log("Actually saving assignment TBD in later assignments");
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
      <div>
        <div className="d-flex">
          <div className="flex-fill">
          <span className="float-end">
            <button className="btn btn-light me-2">
              <FaCheckCircle className="me-2"/>
              Published
            </button>
            <button className="btn btn-light">
              <FaEllipsisV/>
            </button>
          </span>
          </div>
        </div>

        <hr/>

        <h5>Assignment Name</h5>
        <input
            onChange={(e) => {
              dispatch(setAssignment({...assignment, title: e.target.value}));
            }}
            value={assignment?.title}
            className="form-control mb-2"
        />
        <br/>
        <textarea
            onChange={(e) => {
              dispatch(
                  setAssignment({...assignment, description: e.target.value})
              );
            }}
            className="form-control"
        >
        {assignment.description}
      </textarea>
        <br/>
        <div className="mt-4 container">
          <div className="row">
            <div className="col-3 wd-edit-label wd-edit-label">Points</div>
            <div className="col-9">
              <input
                  onChange={(e) => {
                    dispatch(
                        setAssignment({...assignment, points: e.target.value})
                    );
                  }}
                  className="form-control"
                  type="number"
                  value={assignment.points}
                  min="0"
                  max="100"
              />
              <br/>
            </div>
          </div>
          <div className="row">
            <div className="col-3 wd-edit-label">Assignment Group</div>
            <div className="col-9">
              <select className="form-select" id="assignment-group">
                <option value="Assignment">Assignment</option>
                <option value="Quiz">Quiz</option>
                <option value="Exam">Exam</option>
                <option value="Project">Project</option>
              </select>
              <br/>
            </div>
          </div>
          <div className="row">
            <div className="col-3 wd-edit-label">Display Grade as</div>
            <div className="col-9">
              <select className="form-select" id="grade-display-as">
                <option value="Percentage">Percentage</option>
              </select>
              <br/>
            </div>
          </div>
          <div className="row">
            <div className="col-3 wd-edit-label">Submission Type</div>
            <div className="col-9">
              <select className="form-select" id="assignment-submission-type">
                <option value="Online">Online</option>
                <option value="External Tool">External Tool</option>
              </select>
              <br/>
            </div>
          </div>
          <div className="row">
            <div className="col-3 wd-edit-label">Online Entry Options</div>
            <div className="col-9">
              <label>
                <input
                    type="checkbox"
                    name="wd-entry-options"
                    id="wd-text-entry"
                />
                Text Entry
              </label>
              <br/>
              <label>
                <input
                    type="checkbox"
                    name="wd-entry-options"
                    id="wd-website-url"
                />
                Website URL
              </label>
              <br/>
              <label>
                <input
                    type="checkbox"
                    name="wd-entry-options"
                    id="wd-media-recordings"
                />
                Media Recordings
              </label>
              <br/>
              <label>
                <input
                    type="checkbox"
                    name="wd-entry-options"
                    id="wd-student-annotations"
                />
                Student Annotations
              </label>
              <br/>
              <label>
                <input
                    type="checkbox"
                    name="wd-entry-options"
                    id="wd-file-uploads"
                />
                File Uploads
              </label>
              <br/>
              <br/>
            </div>
          </div>
          <div className="row">
            <div className="col-3 wd-edit-label">Assign</div>
            <div className="col-9">
              <div className="border rounded p-3">
                Due
                <br/>
                <input
                    onChange={(e) => {
                      dispatch(
                          setAssignment({...assignment, dueDate: e.target.value})
                      );
                    }}
                    className="form-control"
                    name="wd-due-date"
                    type="date"
                    value={assignment.dueDate}
                />
                <br/>
                Available From
                <br/>
                <input
                    onChange={(e) => {
                      dispatch(
                          setAssignment({
                            ...assignment,
                            availableFromDate: e.target.value,
                          })
                      );
                    }}
                    className="form-control"
                    name="wd-available-from"
                    type="date"
                    value={assignment.availableFromDate}
                />
                <br/>
                Until
                <br/>
                <input
                    onChange={(e) => {
                      dispatch(
                          setAssignment({
                            ...assignment,
                            availableUntilDate: e.target.value,
                          })
                      );
                    }}
                    className="form-control"
                    name="wd-available-until"
                    type="date"
                    value={assignment.availableUntilDate}
                />
                <br/>
              </div>
              <br/>
            </div>
          </div>
        </div>
        <button onClick={handleSave} className="btn btn-danger ms-2 float-end">
          Save
        </button>
        <Link
            to={`/Kanbas/Courses/${cid}/Assignments`}
            className="btn btn-light float-end"
        >
          Cancel
        </Link>
      </div>
  );
}

export default AssignmentEditor;