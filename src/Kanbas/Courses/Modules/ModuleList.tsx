import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {FaEllipsisV, FaCheckCircle, FaPlusCircle} from "react-icons/fa";
import {MdPlayArrow} from "react-icons/md";
import {TiArrowSortedDown} from "react-icons/ti";
import db from "../../Database";
import './ModuleList.css';


function ModuleList() {
  const {cid} = useParams();
  const modulesList = db.modules.filter((module) => module.course === cid);
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);
  return (
      <>
        <ul className="list-group wd-modules">
          {modulesList.map((module, index) => (
              <li key={index}
                  className="list-group-item"
                  onClick={() => setSelectedModule(module)}>
                <div>
                  <FaEllipsisV className="me-2"/>
                  <MdPlayArrow/>
                  {module.name}
                  <span className="float-end">
            <FaCheckCircle className="text-success"/>
                    <TiArrowSortedDown/>
            <FaPlusCircle className="ms-2"/>
            <FaEllipsisV className="ms-2"/>
          </span>
                </div>
                {selectedModule._id === module._id && (
                    <ul className="list-group">
                      {module.lessons?.map((lesson, index) => (
                          <li className="list-group-item" key={index}>
                            <FaEllipsisV className="me-2"/>
                            {lesson.name}
                            <span className="float-end">
                  <FaCheckCircle className="text-success"/>
                  <FaEllipsisV className="ms-2"/>
                </span>
                          </li>
                      ))}
                    </ul>
                )}
              </li>
          ))}
        </ul>
      </>
  );
}

export default ModuleList;