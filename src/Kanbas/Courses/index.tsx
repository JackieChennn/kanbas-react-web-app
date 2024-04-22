import {useState, useEffect} from "react";
import axios from "axios";
import {courses} from "../../Kanbas/Database";
import {Navigate, Route, Routes, useLocation, useParams} from "react-router-dom";
import CourseNavigation from "./Navigation";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import CourseHeader from "./header";
import Modules from "./Modules";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/Editor";
import QuizDetail from "./Quizzes/Details";
import QuizQuestionsEditor from "./Quizzes/QuestionsEditor";
import QuestionEditor from "./Quizzes/QuestionsEditor/Question";
import QuizPreview from "./Quizzes/Preview";

function Courses() {
  const {courseId} = useParams();
  // const API_BASE = process.env.REACT_APP_API_BASE;
  const API_BASE = "http://localhost:4000";
  const {pathname} = useLocation();
  console.log(pathname);
  const COURSES_API = `${API_BASE}/api/courses`;
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
        <CourseHeader course_id={course?._id || ''} location={pathname}/>
        <div className="d-flex">
          <CourseNavigation course_id={course?._id || ''}/>
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Navigate to="Home"/>}/>
              <Route path="Home" element={<Home/>}/>
              <Route path="Modules" element={<Modules/>}/>
              <Route path="Piazza" element={<h1>Piazza</h1>}/>
              <Route path="Zoom Meetings" element={<h1>Zoom Meetings</h1>}/>
              <Route path="Assignments" element={<Assignments/>}/>
              <Route path="Assignments/:assignmentId" element={<AssignmentEditor/>}/>
              <Route path="Quizzes" element={<Quizzes/>}/>
              <Route path="Quizzes/:quizId" element={<QuizDetail/>}/>
              <Route path="Quizzes/:quizId/edit" element={<QuizEditor/>}/>
              <Route path="Quizzes/:quizId/editquestions"
                     element={<QuizQuestionsEditor/>}/>
              <Route path="Quizzes/:quizId/editquestions/:questionId"
                     element={<QuestionEditor/>}/>
              <Route path="Quizzes/:quizId/preview"
                     element={<QuizPreview/>}/>
              <Route path="Grades" element={<Grades/>}/>
              <Route path="People" element={<h1>People</h1>}/>
              <Route path="Panapto Video" element={<h1>Panapto Video</h1>}/>
              <Route path="Discussions" element={<h1>Discussions</h1>}/>
              <Route path="Announcements" element={<h1>Announcements</h1>}/>
              <Route path="Pages" element={<h1>Pages</h1>}/>
              <Route path="Files" element={<h1>Files</h1>}/>
            </Routes>
          </div>
        </div>
      </div>
  );
}

export default Courses