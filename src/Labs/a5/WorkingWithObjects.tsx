import React, {useEffect, useState} from "react";
import axios from "axios";

function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const [module, setModule] = useState({
    id: 1,
    name: "NodeJS Module",
    description: "Learn NodeJS",
    course: "CS5610",
  });
  const ASSIGNMENT_URL = "https://kanbas-node-server-app-cnzn.onrender.com/a5/assignment"
  const MODULE_URL = "https://kanbas-node-server-app-cnzn.onrender.com/a5/module"
  const fetchAssignment = async () => {
    const response = await axios.get(`${ASSIGNMENT_URL}`);
    setAssignment(response.data);
  };
  const updateTitle = async () => {
    const response = await axios
    .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
    setAssignment(response.data);
  };
  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
      <div>
        <h3>Working With Objects</h3>
        <h3>Modifying Properties</h3>
        <input onChange={(e) => setAssignment({
          ...assignment, title: e.target.value
        })}
               value={assignment.title} type="text"/>
        <button onClick={updateTitle}>
          Update Title to: {assignment.title}
        </button>
        <button onClick={fetchAssignment}>
          Fetch Assignment
        </button>
        <h4>Modifying Properties</h4>
        <a className="btn btn-primary" href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
          Update Title
        </a>
        <input type="text"
               onChange={(e) => setAssignment({
                 ...assignment,
                 title: e.target.value
               })}
               value={assignment.title}/>
        <h4>Retrieving Objects</h4>
        <a className="btn btn-primary" href={`${ASSIGNMENT_URL}`}>
          Get Assignment
        </a>
        <h4>Retrieving Properties</h4>
        <a className="btn btn-primary" href={`${ASSIGNMENT_URL}/title`}>
          Get Title
        </a>
        <h3>On your own</h3>
        <h4>Retrieving Objects</h4>
        <a className="btn btn-primary" href={`${MODULE_URL}`}>
          Get Module
        </a>
        <h4>Retrieving Properties</h4>
        <a className="btn btn-primary" href={`${MODULE_URL}/name`}>
          Get Module Name
        </a>
        <h4>Modifying Properties</h4>
        <a className="btn btn-primary" href={`${MODULE_URL}/name/${module.name}`}>
          Update Module Name
        </a>
        <input type="text"
               onChange={(e) => setModule({
                 ...module,
                 name: e.target.value
               })}
               value={module.name}/>
        <br/>
        <a className="btn btn-primary" href={`${MODULE_URL}/description/${module.description}`}>
          Update Module Description
        </a>
        <input type="text"
               onChange={(e) => setModule({
                 ...module,
                 description: e.target.value
               })}
               value={module.description}/>
        <br/>
        <a className="btn btn-primary" href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
          Update Assignment Score
        </a>
        <input type="number"
               onChange={(e) => setAssignment({
                 ...assignment,
                 score: parseInt(e.target.value)
               })}
               value={assignment.score}/>
        <br/>
        <a className="btn btn-primary"
           href={`${ASSIGNMENT_URL}/completed/${assignment.completed ?? ""}`}>
          Update Assignment Completed
        </a>
        <input type="checkbox"
               onChange={(e) => setAssignment({
                 ...assignment,
                 completed: e.target.checked
               })}
               checked={assignment.completed}/>
      </div>
  );
}

export default WorkingWithObjects;