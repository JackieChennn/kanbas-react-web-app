import {Link, useLocation} from "react-router-dom";
import {MdAccountCircle} from "react-icons/md";
import {RiBook2Line} from "react-icons/ri";
import {IoCalendarOutline} from "react-icons/io5";
import {TfiDashboard} from "react-icons/tfi";
import {BsInbox} from "react-icons/bs";
import {SlClock} from "react-icons/sl";
import {TbPresentationAnalytics} from "react-icons/tb";
import {IoArrowForwardCircleOutline} from "react-icons/io5";
import {AiOutlineQuestionCircle} from "react-icons/ai";
import "./index.css";

function KanbasNavigation() {

  const links = ["Account", "Dashboard", "Courses", "Calendar", "Inbox", "History", "Studio", "Commons", "Help"];
  const linkToIconMap: { [key: string]: JSX.Element } = {
    "Account": <MdAccountCircle className="wd-icon"/>,
    "Dashboard": <TfiDashboard className="wd-icon"/>,
    "Courses": <RiBook2Line className="wd-icon"/>,
    "Calendar": <IoCalendarOutline className="wd-icon"/>,
    "Inbox": <BsInbox className="wd-icon"/>,
    "History": <SlClock className="wd-icon"/>,
    "Studio": <TbPresentationAnalytics className="wd-icon"/>,
    "Commons": <IoArrowForwardCircleOutline className="wd-icon"/>,
    "Help": <AiOutlineQuestionCircle className="wd-icon"/>,
  }

  const {pathname} = useLocation();

  return (
      <div className="wd-kanbas-navbar">
        <div className="list-group wd-kanbas-navigation" style={{width: 150}}>
          <Link key={9} to='/Kanbas/Dashboard'
                className='list-group-item d-flex flex-column neu-icon'>
            <img className="img-fluid" src={require("./NEU_logo.png")}
                 alt="NEU Logo"/>
          </Link>
          {links.map((link, index) => (
              <Link
                  key={index}
                  to={`/Kanbas/${link}`}
                  className={`list-group-item ${pathname.includes(link) && "active"} d-flex flex-column`}>
                {linkToIconMap[link]}
                {link}
              </Link>
          ))}
        </div>
      </div>
  );
}

export default KanbasNavigation;