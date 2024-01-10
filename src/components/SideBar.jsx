import { useState, useEffect } from "react";
import { FaRegTrashAlt, FaMapSigns, FaRegFlag } from "react-icons/fa";
import { HiQueueList, HiTicket } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import { BiCodeCurly, BiSearchAlt } from "react-icons/bi";
import { AiOutlineHome, AiOutlineFolderOpen } from "react-icons/ai";
import { IoMdDocument } from "react-icons/io";
import { Link } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
import { useUser } from "../contexts/UserContext";
import DataArrayIcon from "@mui/icons-material/DataArray";
import DocsSidebar from "./ui/DocsSidebar";
import { useLocation } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";
const SideBar = () => {
  const location = useLocation();
  const [isDev, setIsDev] = useState(true);
  const { role, isSignedIn } = useUser();
  useEffect(() => {
    setIsDev(role === "developer");
  }, [role]);

  //function that listens for path changes detects if we're in the /docs* path and returns a boolean
  const isDocs = () => {
    const path = location.pathname;
    return path.includes("/docs");
  };

  let logOff = async () => {
    console.log("signing out");
    try {
      await signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <div className="flex flex-start sticky top-0 left-0 min-h-screen h-full z-50">
      <div className=" min-w-[64px]  w-16 m-0 flex flex-col bg-gray-900 text-white shadow-md gap-16 z-50">
        <div className="mt-5">
          <SideBarIcon icon={<AiOutlineHome size="28" />} text="Home" route="/" />
          <SideBarIcon icon={<IoMdDocument size="28" />} text="Docs" route="/docs" />
          {isSignedIn && (
            <>
              <SideBarIcon icon={<FaRegTrashAlt size="28" />} text="Bulk Closer" route="/bulk-closer" />
              <SideBarIcon icon={<HiQueueList size="28" />} text="Queue Reader" route="/queue-reader" />
              <SideBarIcon icon={<FaMapSigns size="28" />} text="Group Mappings" route="/group-mapping" />
              {isDev && (
                <>
                  <SideBarIcon icon={<HiTicket size="28" />} text="Ticket Generator" route="/ticket-generator" />
                  <SideBarIcon icon={<BiCodeCurly size="28" />} text="Mapping Object" route="/mapping-generator" />
                  <SideBarIcon icon={<DataArrayIcon size="25" />} text="Group Mapper" route="/group-mapper" />
                  <SideBarIcon icon={<BiSearchAlt size="28" />} text="Group Finder" route="/group-finder" />
                  <SideBarIcon icon={<FaRegFlag size="25" />} text="Flags" route="/flags" />
                </>
              )}
              <SideBarIcon icon={<AiOutlineFolderOpen size="28" />} text="Files" route="/files" />
            </>
          )}
        </div>
        <div onClick={isSignedIn ? logOff : null}>
          <SideBarIcon
            route={!isSignedIn ? "sign-in" : null}
            icon={isSignedIn ? <FiLogOut size="28" /> : <PiSignInBold size="28" />}
            text={isSignedIn ? "Sign Out" : "Sign In"}
            signOut={isSignedIn}
          />
        </div>
      </div>
      {
        //if we're in the /docs* path, render the docs sidebar
        isDocs() && <DocsSidebar />
      }
    </div>
  );
};

const SideBarIcon = ({ icon, text, route }) => {
  return (
    <Link to={route}>
      <div className="sidebar-icon group">
        {icon} <span className="sidebar-tooltip group-hover:scale-100 ">{text}</span>
      </div>
    </Link>
  );
};
export default SideBar;
