import React from 'react';
import { FaBullhorn, FaBullseye, FaChartBar, FaChevronCircleRight, FaCross, FaFileImport, FaRegBell, FaRemoveFormat } from 'react-icons/fa';
import { redirect } from 'react-router';

const CourseStatus: React.FC = () => {
  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'column', width: 240}}>
        <a href="#" className="btn btn-outline-secondary" style={{textAlign: 'left', margin: 5}}><FaFileImport/> Import Existing Content</a>
        <a href="#" className="btn btn-outline-secondary" style={{textAlign: 'left', margin: 5}}><FaChevronCircleRight/> Import From Commons</a>
        <a href="#" className="btn btn-outline-secondary" style={{textAlign: 'left', margin: 5}}><FaBullseye/> Choose Home Page</a>
        <a href="#" className="btn btn-outline-secondary" style={{textAlign: 'left', margin: 5}}><FaChartBar/> View Course Stream</a>
        <a href="#" className="btn btn-outline-secondary" style={{textAlign: 'left', margin: 5}}><FaBullhorn/> New Announcement</a>
        <a href="#" className="btn btn-outline-secondary" style={{textAlign: 'left', margin: 5}}><FaChartBar/> New Analytics</a>
        <a href="#" className="btn btn-outline-secondary" style={{textAlign: 'left', margin: 5}}><FaRegBell/> View Course Notificatons</a>
    </div>

                    
      <h3>To Do</h3>
      <hr/>
      <ul>
        <li><a style={{color: 'red'}} href="#">Lecture CS4550.12631.202410 Sep 7 at 11:45am</a></li>
        <li><a style={{color: 'red'}} href="#">Lecture CS4550.12631.202410 Sep 11 at 11:45am</a></li>
        <li><a style={{color: 'red'}} href="#">CS 5610 06 SP23 Lecture Sep 11 at 6pm</a></li>
      </ul>
    </div>
  );
};

export default CourseStatus;
