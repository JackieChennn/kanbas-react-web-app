import React, { useState } from 'react';
import { FaArrowDown, FaCog, FaEllipsisV, FaFileExport, FaFileImport, FaFilter, FaKeyboard, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { assignments, enrollments, grades, users } from "../../Database";
import { useParams } from "react-router-dom";
function Grades() {
  const { courseId } = useParams();
  const as = assignments.filter((assignment) => assignment.course === courseId);
  const es = enrollments.filter((enrollment) => enrollment.course === courseId);
  const [showIcon, setShowIcon] = useState(false);
  const handleIconClick = () => {setShowIcon(true);};
  return (
    <div className='d-flex'>
      <div className="flex-fill table-responsive">
      <table width="100%">
            <tbody>
                <tr>
                    <td> 
                    <select id="select-gradebook" style={{border: 0, color:'red'}}>
                            <option value="Gradebook">Gradebook</option>
                            <option value="Change">Change Gradebook View</option>
                            <option value="Traditional">Traditional Gradebook</option>
                            <option value="Individual">Individual Gradebook</option>
                        </select>
                        <FaKeyboard style={{color:'red'}}/>
                    </td>
                    <td>
                        <div className = "float-end">
                            <button className="btn btn-outline-secondary"><FaFileImport/>Import</button>
                            <button className="btn btn-outline-secondary" id="select-export"><FaFileExport/>
                                <select style={{border:0}}>
                                <option value="Export">Export</option>
                                </select>
                            </button>
                            <button className="btn btn-outline-secondary"><FaCog/></button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="text-fields-name"><h3>Student Names</h3></label>
                        <div className="input-group">
                            <span className="input-group-text"><FaSearch/></span>
                            <input className="form-control" placeholder="Search Student" />
                            <span className="input-group-text" style={{marginRight: 20}}><FaArrowDown/></span>
                        </div>
                    </td>
                    <td>
                        <label htmlFor="text-fields-assignment"><h3>Assignment Names</h3></label>
                        <div className="input-group">
                            <span className="input-group-text"><FaSearch/></span>
                            <input className="form-control" placeholder="Search Assignments" />
                            <span className="input-group-text" style={{marginRight: 20}}><FaArrowDown/></span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <br/>
        <button className="btn btn-outline-secondary"><FaFilter/>Apply Filters</button><br/><br/>
        <table className="table table-striped">
        <tbody>
          <tr>
            <td>Student Name</td>
            {as.map((assignment) => (<td>{assignment.title}</td>))}
          </tr>
          
            {es.map((enrollment) => {
              const user = users.find((user) => user._id === enrollment.user);
              return (
                <tr>
                   <td style={{color:'red'}}>{user?.firstName} {user?.lastName}</td>
                   {as.map((assignment) => {
                     const grade = grades.find(
                       (grade) => grade.student === enrollment.user && grade.assignment === assignment._id);
                       return (
                       <td>
                            <div className="input-group"  style={{width:90}}>
                                <input onClick={handleIconClick} type="number" className="form-control" style={{fontSize: '0.7em'}} value={grade?.grade || ""} />
                                <button className='btn btn-outline-primary input-group-text'>
                                  {showIcon && <FaSignOutAlt style={{ fontSize: '0.7em' }} />}
                                </button>
                            </div>
                        </td>);})}
                </tr>);
            })}
        </tbody>
        </table> 
      </div>
    </div>
    );
}
export default Grades