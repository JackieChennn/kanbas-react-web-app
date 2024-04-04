import {Routes, Route, Navigate, useParams} from "react-router-dom";
import CourseNavigation from "./Navigation/CourseNavigation";
import CourseTopNavigation from "./Navigation/CourseTopNavigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import Grades from "./Grades";
import {useState, useEffect} from "react";
import axios from "axios";

function Courses() {
  const {courseId} = useParams();
  const COURSES_API = "http://localhost:4000/api/courses";
  const [course, setCourse] = useState<any>({_id: ""});
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(
        `${COURSES_API}/${courseId}`
    );
    setCourse(response.data);
  };
  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);
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
              <Route path="Grades" element={<Grades/>}/>
            </Routes>
          </div>
        </div>

      </div>
  );
}

export default Courses;
