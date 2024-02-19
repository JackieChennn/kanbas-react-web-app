import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import CourseNavigation from "./Navigation/CourseNavigation";
import CourseTopNavigation from "./Navigation/CourseTopNavigation";
import Modules from "./Modules";

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
              <Route path="Home" element={<h1>Home</h1>}/>
              <Route path="Modules" element={<Modules/>}/>
              <Route path="Assignments" element={<h1>Assignments</h1>}/>
              <Route
                  path="Assignments/:assignmentId"
                  element={<h1>Assignments -id</h1>}
              />
              <Route path="Grades" element={<h1>Grades</h1>}/>
            </Routes>
          </div>
        </div>

      </div>
  );
}

export default Courses;
