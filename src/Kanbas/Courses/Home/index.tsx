import ModuleList from "../Modules/ModuleList";
import CourseStatus from "./CourseStatus";
import TopButtons from "./TopButtons";

function Home() {
  return (
      <div className="d-flex">
        <div>
          <TopButtons/>
          <ModuleList/>
        </div>

        <CourseStatus/>
      </div>
  );
}

export default Home;