import db from "../../Database";
import {useParams} from "react-router-dom";
import {IoMdArrowDropdown} from "react-icons/io";
import {FaRegKeyboard} from "react-icons/fa6";
import {CiImport} from "react-icons/ci";
import {CgExport} from "react-icons/cg";
import {FaGear} from "react-icons/fa6";
import {CiFilter} from "react-icons/ci";
import "./index.css";
import React from "react";

function Grades() {
  const {cid} = useParams();
  const assignments = db.assignments.filter((assignment) => assignment.course === cid);
  const enrollments = db.enrollments.filter((enrollment) => enrollment.course === cid);
  return (
      <div className="d-block">
        <div className="d-flex justify-content-between">
          <div className="text-danger">Gradebook <IoMdArrowDropdown/></div>
          <div className="text-danger"><FaRegKeyboard/></div>
          <div>
            <button className="btn btn-secondary"><CiImport/>Import</button>
            <button className="btn btn-secondary"><CgExport/>Import</button>
            <button className="btn btn-secondary"><FaGear/></button>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-block">
            <div className="fw-bold">Student Names</div>
            <div><input type="text" className="form-control" name="due" id="due"
                        value="Search Students"/></div>
          </div>
          <div className="d-block">
            <div className="fw-bold">Assignment Names</div>
            <div><input type="text" className="form-control" name="due" id="due"
                        value="Search Assignments"/></div>
          </div>
        </div>
        <div>
          <button className="btn btn-secondary"><CiFilter/>Apply Filters</button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
            <th>Student Name</th>
            {assignments.map((assignment) => (<th>{assignment.title}</th>))}
            </thead>
            <tbody>
            {enrollments.map((enrollment) => {
              const user = db.users.find((user) => user._id === enrollment.user);
              return (
                  <tr>
                    <td className="text-danger">{user?.firstName} {user?.lastName}</td>
                    {assignments.map((assignment) => {
                      const grade = db.grades.find(
                          (grade: {
                            student: string;
                            assignment: string;
                          }) => grade.student === enrollment.user && grade.assignment === assignment._id);
                      return (<td>{grade?.grade || ""}</td>);
                    })}
                  </tr>);
            })}
            </tbody>
          </table>
        </div>
      </div>);
}

export default Grades;