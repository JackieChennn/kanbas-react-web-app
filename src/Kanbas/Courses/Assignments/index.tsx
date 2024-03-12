import React from "react";
import {Link, useParams} from "react-router-dom";
import {FaEllipsisV} from "react-icons/fa";
import {IoMdArrowDropdown} from "react-icons/io";
import {LuPlus} from "react-icons/lu";
import {PiNotePencilBold} from "react-icons/pi";
import {FaCheckCircle} from "react-icons/fa";
import db from "../../Database";
import './index.css';


function Assignments() {
  const {cid} = useParams();
  const assignments = db.assignments;
  const courseAssignments = assignments.filter(
      (assignment) => assignment.course === cid);
  return (
      <div>
        <h2 className="d-flex justify-content-between me-3 wd-assignments-section-title border border-1 border-bottom-0">
          <span><FaEllipsisV/><IoMdArrowDropdown/>ASSIGNMENTS</span>
          <span><span className="wd-round_corner">40% of Total</span><LuPlus/><FaEllipsisV/></span>
        </h2>
        <div className="list-group">
          {courseAssignments.map((assignment) => (
              <Link
                  key={assignment._id}
                  to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                  className="list-group-item wd-assignment-list-item me-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div>
                      <FaEllipsisV className="m-1"/>
                    </div>
                    <div>
                      <PiNotePencilBold className="text-success m-2"/>
                    </div>
                    <div className="d-block wd-assignment m-1">
                      <div className="fw-bold">
                        {assignment.title}
                      </div>
                      <div>
                        <span className="text-danger">Multiple Modules</span>
                        <span>| Due Sep 18 at 11:59pm | 100 pts</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div>
                      <FaCheckCircle className="text-success"/>
                    </div>
                    <div>
                      <FaEllipsisV/>
                    </div>
                  </div>
                </div>
              </Link>
          ))}
        </div>
      </div>
  );
}

export default Assignments;