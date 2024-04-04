import { courses } from "../Database";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  FaBars,
  FaBook,
  FaBullhorn,
  FaBullseye,
  FaChartBar,
  FaChevronDown,
  FaCircle,
  FaClipboard,
  FaCog,
  FaComment,
  FaCrosshairs,
  FaDesktop,
  FaFile,
  FaGlasses,
  FaHistory,
  FaHome,
  FaInbox,
  FaPlug,
  FaQuestionCircle,
  FaRegArrowAltCircleRight,
  FaRegCalendarAlt,
  FaRegUserCircle,
  FaRocket,
  FaTachometerAlt,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
function toggleIcon() {
  const main_content = document.getElementById("wd-main-container");

  if (main_content?.style.display === "block") {
    console.log("main_content none");
    main_content.classList.remove("d-flex");
    main_content.style.display = "none";
    const elementsToRemove = document.querySelectorAll("icon");
    elementsToRemove.forEach((element) => {
      element.remove();
    });
    var icon_span = document.getElementById("icon");
    if (icon_span) {
      icon_span.innerHTML =
        '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 352 512" class="fa-solid fa-chevron-down wd-nav-bar-content " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>';
    }
  } else if (main_content?.style.display === "none") {
    console.log("main_content block");
    main_content.style.display = "block";
    main_content.classList.add("d-flex");
    const elementsToRemove = document.querySelectorAll("icon");
    elementsToRemove.forEach((element) => {
      element.remove();
    });
    icon_span = document.getElementById("icon");
    if (icon_span) {
      icon_span.innerHTML =
        '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" class="fa-solid fa-chevron-down wd-nav-bar-content " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>';
    }
  }
}

function QuickNav() {
  const links = [
    {
      name: "Home",
      icon: <FaHome className="fa-solid fa-house me-2" />,
      link_to: "/Kanbas",
    },
    {
      name: "Modules",
      icon: <FaCrosshairs className="fa fa-crosshairs me-2" />,
    },
    { name: "Piazza", icon: <FaPlug className="fa fa-plug me-2" /> },
    { name: "Zoom Meetings", icon: <FaPlug className="fa fa-plug me-2" /> },
    { name: "Assignments", icon: <FaFile className="fas fa-file me-2" /> },
    { name: "Quizzes", icon: <FaRocket className="fa-solid fa-rocket me-2" /> },
    { name: "Grades", icon: <FaBook className="fa fa-book me-2" /> },
    { name: "People", icon: <FaUser className="fa fa-user me-2" /> },
    { name: "Panopto Video", icon: <FaPlug className="fa fa-plug me-2" /> },
    {
      name: "Discussions",
      icon: <FaComment className="fa-regular fa-comments me-2" />,
    },
    {
      name: "Announcements",
      icon: <FaBullhorn className="fa fa-bullhorn me-2" />,
    },
    { name: "Pages", icon: <FaBook className="fa fa-book me-2" /> },
    { name: "Files", icon: <FaFile className="fa fa-file me-2" /> },
    {
      name: "Rubrics",
      icon: <FaClipboard className="fa-solid fa-clipboard me-2" />,
    },
    {
      name: "Outcomes",
      icon: <FaBullseye className="fa-solid fa-bullseye me-2" />,
    },
    {
      name: "Collaborations",
      icon: <FaCircle className="fa-regular fa-circle me-2" />,
    },
    { name: "Syllabus", icon: <FaBook className="fa fa-book me-2" /> },
    {
      name: "Progress Reports",
      icon: <FaChartBar className="fa-solid fa-chart-column me-2" />,
    },
    { name: "Settings", icon: <FaCog className="fa fa-cog me-2" /> },
  ];
  const linksk = [
    { label: "Account", icon: <FaUserCircle className="fs-2 wd-account" /> },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
    { label: "Courses", icon: <FaBook className="fs-2" /> },
    { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
    { label: "Inbox", icon: <FaInbox className="fs-2" /> },
    { label: "History", icon: <FaHistory className="fs-2" /> },
    { label: "Studio", icon: <FaDesktop className="fs-2" /> },
    { label: "Commons", icon: <FaRegArrowAltCircleRight className="fs-2" /> },
    { label: "Help", icon: <FaQuestionCircle className="fs-2" /> },
  ];
  const { pathname } = useLocation();
  const path = pathname.split("/");
  let course: any;
  let main_window = false;
  let display = "none";
  console.log(path);
  if (path.length === 3) {
    main_window = true;
    display = path[path.length - 1];
  } else if (path.length >= 4) {
    const course_id = path[3];
    course = courses.find((course: any) => course._id === course_id);
    display = path[path.length - 1];
  }
  console.log(display);
  console.log(course?.name);
  const [isCollapsedk, setIsCollapsedk] = useState(false);
  const toggleIconk = () => {
    setIsCollapsedk(!isCollapsedk);};
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleIcon = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      <div className="d-flex d-block d-md-none wd-kanbas-navigation-dropdown">
        <button
              className="btn wd-quick-nav-btn ms-auto"
              type="button"
              onClick={toggleIconk}
              data-bs-toggle="collapse"
              data-bs-target="#collapseWidthExample"
              aria-expanded="false"
              aria-controls="collapseWidthExample"
            >
              <FaBars className="fa-solid fa-chevron-down wd-nav-bar-content" />
            </button>

        <div className="text-center wd-nav-bar-content flex-grow-1 wd-nav-btns-grp">
          {main_window && (
            <Link to={`/Kanbas/${display}`} className="wd-quick-nav-header">
              {display}
            </Link>
          )}
          {!main_window && (
            <Link
              to={
                path.length === 6
                  ? `/Kanbas/Courses/${course?._id}/${path[path.length - 2]}/${display}`
                  : `/Kanbas/Courses/${course?._id}/${display}`
              }
              className="wd-quick-nav-header"
            >
              {course?.name}.{course?.semester}
              <br />
              {display}
            </Link>
          )}
        </div>

        {!pathname.includes("Dashboard") && (
          <div className="wd-nav-btns-grp float-end">
            <button className="btn wd-bg-black">
              <FaGlasses />
            </button>

            <button
              className="btn wd-quick-nav-btn ms-auto"
              type="button"
              onClick={toggleIcon}
              data-bs-toggle="collapse"
              data-bs-target="#collapseWidthExample1"
              aria-expanded="false"
              aria-controls="collapseWidthExample1"
            >
              <FaChevronDown className="fa-solid fa-chevron-down wd-nav-bar-content" />
            </button>
          </div>
        )}
      </div>
      <div className={`collapse ${isCollapsedk ? 'show' : ''} collapse-horizontal wd-quick-nav`} id="collapseWidthExample">
        <ul className="wd-course-quick-navigation-list">
          {linksk.map((link, index) => (
            <div key={index}>
              <Link
                to={""}
                className="wd-module-link"
                style={{color: 'red'}}
                onClick={() => {
                  setIsCollapsedk(false);
                }}
              > <div className="link-item">
              {link.icon}
              <span className="icon-label" style={{paddingLeft: 3}}>{link.label}</span>
            </div>
                
              </Link>
            </div>
          ))}
        </ul>
        </div>
      <div className={`collapse ${isCollapsed ? 'show' : ''} collapse-horizontal wd-quick-nav`} id="collapseWidthExample1">
        <ul className="wd-course-quick-navigation-list">
          {links.map((link, index) => (
            <div key={index}>
              <Link
                to={`/Kanbas/Courses/${course?._id}/${link.name}`}
                className="wd-module-link"
                style={{color: 'red'}}
                onClick={() => {
                  setIsCollapsed(false);
                }}
              >
                <div className="link-item">
              {link.icon}
              <span className="icon-label" style={{paddingLeft: 3}}>{link.name}</span>
            </div>
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default QuickNav;