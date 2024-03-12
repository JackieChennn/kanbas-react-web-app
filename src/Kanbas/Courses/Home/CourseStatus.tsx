import './index.css';
import {FaFileImport} from "react-icons/fa";
import {BiImport} from "react-icons/bi";
import {ImTarget} from "react-icons/im";
import {IoBarChart} from "react-icons/io5";
import {GrAnnounce} from "react-icons/gr";
import {FaRegBell} from "react-icons/fa";
import {PiNumberCircleFiveFill} from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";

function CourseStatus() {
  return (
      <div className="flex-grow-0 me-2 d-none d-lg-block wd-course-status" style={{width: "250px"}}>
        <div className="d-block">
          <button className="btn btn-secondary"><FaFileImport/>Import Existing
            Content
          </button>
          <button className="btn btn-secondary"><BiImport/>Import From Commons
          </button>
          <button className="btn btn-secondary"><ImTarget/>Choose Home Page
          </button>
          <button className="btn btn-secondary"><IoBarChart/>View Course
            Stream
          </button>
          <button className="btn btn-secondary"><GrAnnounce/>New Announcement
          </button>
          <button className="btn btn-secondary"><IoBarChart/>New Analytics
          </button>
          <button className="btn btn-secondary"><FaRegBell/>View Course
            Notifications
          </button>
          <h5>To Do</h5>
          <hr/>
          <div className="wd-todo d-block">
            <div className="wd-red">
              <PiNumberCircleFiveFill/>
              <span className="wd-todo-red-text">Grade A1 - ENV + HTML</span>
            </div>
            <div className="wd-todo-grey">100 points - Sep 18 at 11:59pm</div>
            <div><RxCross2 className="wd-cross"/></div>
          </div>
          <div className="wd-todo d-block">
            <div className="wd-red">
              <PiNumberCircleFiveFill/>
              <span className="wd-todo-red-text">Grade A2 - CSS + BOOTSTRAP</span>
            </div>
            <div className="wd-todo-grey">100 points - Oct 2 at 11:59pm</div>
            <div><RxCross2 className="wd-cross"/></div>
          </div>
        </div>
      </div>
  );
}

export default CourseStatus