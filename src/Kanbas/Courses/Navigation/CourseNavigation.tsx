import {Link, useLocation, useParams} from "react-router-dom";
import db from "../../../Kanbas/Database";
import '../../../index.css';
import "./CourseNavigation.css";

function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Assignments", "Quizzes", "Grades", "People", "Discussions", "Announcements", "Pages", "Files", "Rubrics", "Outcomes", "Collaborations", "Syllabus", "Settings"]

  const {cid} = useParams();
  const {pathname} = useLocation();
  const course = db.courses.find((course) => course._id === cid);

  return (
      <div className="wd-course-navigation">
        <div className="wd-ellipsis mb-3">
          {course?.number} {course?.name} {course?.startDate}
        </div>
        <div className="list-group">
          {links.map((link, index) => (
              <Link
                  key={index}
                  to={`/Kanbas/Courses/${cid}/${link}`}
                  className={`list-group-item bg-transparent wd-course-navigation-item ${pathname.includes(link) && "active wd-active"}`}>
                {link}
              </Link>
          ))}
        </div>
      </div>
  )
}

export default CourseNavigation;