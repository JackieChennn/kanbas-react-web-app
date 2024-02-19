import React from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import db from "../../../Database";


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
      <div className="me-5">
        <h2>Assignment Name</h2>
        <input value={assignment?.title}
               className="form-control mb-2"/>
        <hr/>
        <div className="float-end me-1">
          <Link to={`/Kanbas/Courses/${cid}/Assignments`}
                className="btn btn-danger me-2">
            Cancel
          </Link>
          <button onClick={handleSave} className="btn btn-success me-2">
            Save
          </button>
        </div>
      </div>
  );
}

export default AssignmentEditor;