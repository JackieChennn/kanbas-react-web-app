import './index.css';
import {CiCircleCheck} from "react-icons/ci";
import {IoMdArrowDropdown} from "react-icons/io";
import {AiOutlinePlus} from "react-icons/ai";
import {FaEllipsisV} from "react-icons/fa";

function TopButtons() {
  return (
      <div className="d-block">
        <div className="d-flex">
          <button className="btn btn-secondary">Collapse All</button>
          <button className="btn btn-secondary">View Progress</button>
          <button className="btn btn-secondary"><CiCircleCheck className="text-success"/>Publish All<IoMdArrowDropdown/>
          </button>
          <button className="btn btn-secondary btn-red"><AiOutlinePlus/>Module</button>
          <button className="btn btn-secondary"><FaEllipsisV/></button>
        </div>
      </div>
  );
}

export default TopButtons