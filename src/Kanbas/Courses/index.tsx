import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import CourseNavigation from "./Navigation/CourseNavigation";
import CourseTopNavigation from "./Navigation/CourseTopNavigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";

function Courses() {
  return (
      <div>
        <CourseTopNavigation/>
        <hr className="mb-3 mx-3"/>
        <div>
          <CourseNavigation/>
          <div
              className="overflow-y-scroll position-fixed bottom-0 end-0"
              style={{
                left: "320px",
                top: "70px",
              }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="Home"/>}/>
              <Route path="Home" element={<Home/>}/>
              <Route path="Modules" element={<Modules/>}/>
              <Route path="Assignments" element={<Assignments/>}/>
              <Route
                  path="Assignments/:assignmentId"
                  element={<AssignmentEditor/>}
              />
              <Route path="Grades" element={<h1>Grades</h1>}/>
            </Routes>
          </div>
        </div>

      </div>
  );
}

export default Courses;
