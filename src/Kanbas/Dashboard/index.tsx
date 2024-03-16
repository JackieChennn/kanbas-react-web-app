import CourseCard from "./CourseCard";
import db from "../Database";
import "./index.css";
import {useState} from "react";
import {Link} from "react-router-dom";

function Dashboard(
) {
  const [courses, setCourses] = useState(db.courses);
  const [course, setCourse] = useState({
    _id: "0",
    name: "New course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
  });

  const addNewCourse = () => {
    setCourses([...courses, {...course, _id: new Date().getTime().toString()}]);
  }

   const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };


  const updateCourse = () => {
    setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c
          }
        })
    )
  }

  return (
      <div className="mx-xs-1 mx-md-2 mx-lg-3 flex-grow-1">
        <h1>Dashboard</h1>
        <hr/>
        <div className="ms-md-3">
          <h2>Published Courses ({courses.length})</h2>
          <hr/>
          <input value={course.name} className="form-control"
                 onChange={(e) => setCourse({...course, name: e.target.value})}/>
          <input value={course.number} className="form-control"
                 onChange={(e) => setCourse({...course, number: e.target.value})}/>
          <input value={course.startDate} className="form-control" type="date"
                 onChange={(e) => setCourse({...course, startDate: e.target.value})}/>
          <input value={course.endDate} className="form-control" type="date"
                 onChange={(e) => setCourse({...course, endDate: e.target.value})}/>
          <button onClick={addNewCourse} className="btn btn-success m-2 ms-0">
            Add
          </button>
          <button onClick={updateCourse} className="btn btn-warning">
            Update
          </button>
          <div className="d-flex flex-row flex-wrap row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-start"
              id="wd-course-cards-container">
            {courses.map((course) => (
                <Link key={course._id} to={`/Kanbas/Courses/${course._id}`}
                      className="list-group-item">
                  <CourseCard course={course}/>
                  {course.name}
                  <button onClick={(e) => {
                    e.preventDefault();
                    deleteCourse(course._id)
                  }} className="btn btn-danger float-end">
                    Delete
                  </button>
                  <button onClick={(e) => {
                    e.preventDefault();
                    setCourse(course)
                  }} className="btn btn-warning float-end me-2">
                    Edit
                  </button>
                </Link>

            ))}
          </div>

        </div>

      </div>
  );
}

export default Dashboard;