import Account from "./Account";
import KanbasNavigation from "./Navigation";
import {Routes, Route, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import QuickNav from "./Navigation/topnavigation";
import {useState, useEffect} from "react";
import store from "./store";
import {Provider} from "react-redux";
import axios from "axios";

function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const API_BASE = process.env.REACT_APP_API_BASE;
  // const API_BASE = "http://localhost:4000";
  const COURSES_API = `${API_BASE}/api/courses`;
  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    setCourses(response.data);
  };
  useEffect(() => {
        findAllCourses();
      },
      []);
  const [course, setCourse] = useState({
    _id: "RS000", name: "Default Course Name", number: "Default Course Number",
    startDate: "2024-01-08", endDate: "2024-04-22",
  });
  const addNewCourse = async () => {
    const response = await axios.post(COURSES_API, course);
    setCourses([...courses, response.data]);
  };
  const deleteCourse = async (courseId: any) => {
    const response = await axios.delete(
        `${COURSES_API}/${courseId}`
    );
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = async () => {
    const response = await axios.put(
        `${COURSES_API}/${course._id}`,
        course
    );
    setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
    );
  };

  return (
      <Provider store={store}>
        <>
          <QuickNav/>
          <div className="d-flex" id="wd-main-container" style={{display: "block"}}>
            <div className="d-none d-md-block ">
              <KanbasNavigation/>
            </div>
            <div style={{flexGrow: 1}}>
              <Routes>
                <Route path="/" element={<Navigate to="Dashboard"/>}/>
                <Route path="/Account/*" element={<Account/>}/>
                <Route path="Dashboard" element={
                  <Dashboard
                      courses={courses}
                      course={course}
                      setCourse={setCourse}
                      addNewCourse={addNewCourse}
                      deleteCourse={deleteCourse}
                      updateCourse={updateCourse}/>
                }/>
                <Route path="Courses/:courseId/*" element={<Courses/>}/>
              </Routes>

            </div>
          </div>
        </>
      </Provider>
  );
}

export default Kanbas;