import ModuleList from "../Modules/List";
import CourseStatus from "./Status";

function Home() {
  return (
    <div className="d-flex">
      <div className="flex-fill">
        <ModuleList />
      </div>
      <div className="course-status flex-grow-0 me-2 d-none d-lg-block" style={{ width: '250px' }}>
        <CourseStatus />
      </div>
    </div>
  );
}

export default Home;
