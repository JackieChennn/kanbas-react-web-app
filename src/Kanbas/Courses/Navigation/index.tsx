import { Link, useLocation } from "react-router-dom";
import { courses } from "../../Database";
import "./index.css"; // feel free to use the CSS from previous assignments
import { FaRegEyeSlash } from "react-icons/fa";
function CourseNavigation({ course_id }: { course_id: string }) {
  const links =[{label:"Home"}, {label:"Modules"}, {label:"Piazza"}, {label:"Zoom Meetings"},{label:"Assignments"}, 
  {label:"Quizzes"}, {label:"Grades"}, {label:"People"},
  {label: "Panapto Video", icon: <FaRegEyeSlash className="fs-1" />} ,
  {label: "Discussions", icon: <FaRegEyeSlash className="fs-1" />},
  {label: "Announcements", icon: <FaRegEyeSlash className="fs-1" />}, 
  {label: "Pages", icon: <FaRegEyeSlash className="fs-1" />}, 
  {label: "Files", icon: <FaRegEyeSlash className="fs-1" />}];
  const { pathname } = useLocation();
  const course = courses.find((course) => course._id === course_id);

  return (
    <div className="wd-course-nav-container d-none d-md-block ">
    <span className="wd-semester">{course?._id} Semes.....</span>
    <ul className="wd-navigation">
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
          <Link to={link.label}><div>{link.label}{link.icon}</div></Link>        </li>
      ))}
    </ul>
    </div>
  );
}
export default CourseNavigation;
