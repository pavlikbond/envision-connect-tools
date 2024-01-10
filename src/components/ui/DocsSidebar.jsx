import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { RiHome3Line } from "react-icons/ri";
import { IconContext } from "react-icons";
import { FaRegListAlt } from "react-icons/fa";
import { MdAddchart } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { BiCommentDetail } from "react-icons/bi";
import { PiKeyReturnBold } from "react-icons/pi";
import { HiQueueList } from "react-icons/hi2";
import { FaRegThumbsUp } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";
import { TbListDetails } from "react-icons/tb";
import { RiArrowTurnBackLine } from "react-icons/ri";

// import the specific icons you need here

const DocsSidebar = () => {
  return (
    <div className="w-56 bg-white flex flex-col ">
      <h2 className="text-center text-xl my-6 text-purple-600 font-semibold">Docs</h2>
      {sections.map((section, index) => (
        <div key={index} className="text-slate-500">
          <Divider variant="middle" className="py-1" />
          <p className="px-6 py-1">{section.name}</p>
          {section.links.map((link, index) => (
            <MyLink key={index} path={link.path} name={link.name} Icon={link.icon} />
          ))}
        </div>
      ))}
    </div>
  );
};

const MyLink = ({ path, name, Icon }) => {
  return (
    <div>
      <Link
        className="w-full flex items-center hover:bg-slate-200 duration-200 transition-all px-6 py-1  font-semibold text-slate-500"
        to={path}
      >
        <IconContext.Provider value={{ className: "react-icons" }}>
          {Icon && <Icon className="mr-2" />}
        </IconContext.Provider>
        {name}
      </Link>
    </div>
  );
};

const sections = [
  {
    name: "",
    links: [
      {
        name: "Home",
        path: "/docs",
        icon: RiHome3Line,
      },
      {
        name: "Overview",
        path: "/docs/overview",
        icon: FaRegListAlt,
      },
    ],
  },
  {
    name: "Incident/Request",
    links: [
      {
        name: "Create",
        path: "/docs/incident-request/create",
        icon: MdAddchart,
      },
      {
        name: "Update",
        path: "/docs/incident-request/update",
        icon: RxUpdate,
      },
      {
        name: "Comments",
        path: "/docs/incident-request/comments",
        icon: BiCommentDetail,
      },
      {
        name: "Return PTN",
        path: "/docs/incident-request/return-ptn",
        icon: PiKeyReturnBold,
      },
      {
        name: "Queue Responses",
        path: "/docs/incident-request/queue",
        icon: HiQueueList,
      },
    ],
  },
  {
    name: "Change",
    links: [
      {
        name: "Approve/Reject",
        path: "/docs/change/approve-reject",
        icon: FaRegThumbsUp,
      },
      {
        name: "Comments",
        path: "/docs/change/comments",
        icon: BiCommentDetail,
      },
      {
        name: "Return PTN",
        path: "/docs/change/return-ptn",
        icon: PiKeyReturnBold,
      },
      {
        name: "Queue Responses",
        path: "/docs/change/queue",
        icon: HiQueueList,
      },
    ],
  },
  {
    name: "",
    links: [
      {
        name: "Delete from Queue",
        path: "/docs/delete-from-queue",
        icon: TiDeleteOutline,
      },
      {
        name: "Get Ticket Details",
        path: "/docs/get-ticket-details",
        icon: TbListDetails,
      },
      {
        name: "Echo",
        path: "/docs/echo",
        icon: RiArrowTurnBackLine,
      },
    ],
  },
];

export default DocsSidebar;
