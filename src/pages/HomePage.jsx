import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaMapSigns, FaRegFlag } from "react-icons/fa";
import { HiQueueList, HiTicket } from "react-icons/hi2";
import { BiCodeCurly, BiSearchAlt } from "react-icons/bi";
import Skeleton from "@mui/material/Skeleton";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { useUser } from "../contexts/UserContext";
import DataArrayIcon from "@mui/icons-material/DataArray";
import UsefulLink from "../components/ui/UsefulLink";
import { IoMdDocument } from "react-icons/io";
import Laptop from "../assets/laptop.jpg";
import Button from "@mui/material/Button";
const buttonStyle =
  "w-48 h-12 bg-purple-500 duration-200 text-white font-semibold flex items-center px-2 py-2 rounded shadow";

const HomePage = ({ data }) => {
  const [usefulLinks, setUsefulLinks] = useState([]);
  const [fact, setFact] = useState("");
  const { role, isSignedIn } = useUser();
  const [isDev, setIsDev] = useState(false);
  useEffect(() => {
    setIsDev(role === "developer");
  }, [role]);

  useEffect(() => {
    if (data.length) {
      setUsefulLinks(data);
    }
  }, [data]);

  // useEffect(() => {
  //   fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en")
  //     .then((result) => result.json())
  //     .then((result) => {
  //       setFact(result.text);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  const links = [
    { to: "/docs", icon: IoMdDocument, label: "Docs" },
    ...(isSignedIn
      ? [
          { to: "/bulk-closer", icon: FaRegTrashAlt, label: "Ticket Closer" },
          { to: "/queue-reader", icon: HiQueueList, label: "Queue Reader" },
          { to: "/group-mapping", icon: FaMapSigns, label: "Group Mapping" },
          { to: "/files", icon: AiOutlineFolderOpen, label: "Files" },
        ]
      : []),
    ...(isDev
      ? [
          { to: "/ticket-generator", icon: HiTicket, label: "Ticket Generator" },
          { to: "/mapping-generator", icon: BiCodeCurly, label: "Mapping Object" },
          { to: "/group-mapper", icon: DataArrayIcon, label: "Group Mapper" },
          { to: "/group-finder", icon: BiSearchAlt, label: "Group Finder" },
          { to: "/flags", icon: FaRegFlag, label: "Flags" },
        ]
      : []),
  ];

  if (isSignedIn) {
    return (
      <div className="w-full p-10 bg-slate-50 bg-svg">
        <h1 className="text-center text-slate-600 text-3xl md:text-7xl my-12 ">Envision Connect</h1>

        <div className="grid grid-cols-5 gap-3 w-fit mx-auto mb-12">
          {links.map(({ to, icon: Icon, label }, index) => (
            <Link key={index} to={to}>
              <button className={buttonStyle}>
                <Icon size="18" className="mr-3" />
                {label}
              </button>
            </Link>
          ))}
        </div>

        {usefulLinks.length > 0 && (
          <GlassCard>
            <div className="container max-w-3xl mx-auto my-10 text-slate-600">
              <p className="text-3xl font-bold text-center mb-4">Useful Links</p>
              <div className="grid grid-cols-1 divide-y-4">
                {usefulLinks.map((link, index) => (
                  <UsefulLink key={index} link={link.url} name={link.name} />
                ))}
              </div>
            </div>
          </GlassCard>
        )}
      </div>
    );
  } else {
    return <UnauthedHomePage />;
  }
};

const UnauthedHomePage = () => {
  return (
    <div className="w-full p-4 md:p-10 bg-slate-50 bg-svg  flex justify-center items-center">
      <div className="mx-auto">
        <h1 className="text-center text-slate-600 text-3xl md:text-7xl mb-6 ">Envision Connect</h1>
        <h2 className="text-center text-purple-400 text-2xl md:text-4xl mb-8">Ensono Integration API</h2>
        <p className="text-center text-slate-500 w-8/12 md:w-1/2 mx-auto mb-8 font-semibold text-sm md:text-lg">
          Envision Connect is an ITSM tool developed by Ensono that allows for seamless integration and communication
          between clients and Ensono for incident and request management.
        </p>
        <div className="flex mb-12 mx-auto gap-4 justify-center items-center flex-col md:flex-row">
          <Link to="/docs/overview">
            <Button variant="contained">Get Started</Button>
          </Link>{" "}
          <Link to="/docs">
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "white",
                ":hover": {
                  backgroundColor: "white",
                },
              }}
            >
              <div className="flex items-center gap-2">
                <IoMdDocument />
                <p className="font-semibold tracking-tight">Documentation</p>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const GlassCard = ({ children }) => {
  return (
    <div className="px-8 w-1/2 mx-auto rounded-md backdrop-filter backdrop-blur-sm bg-opacity-70 border border-slate-200 hover:border-slate-400 transition-all duration-200 hover:bg-opacity-20 hover:bg-white">
      {children}
    </div>
  );
};
export default HomePage;
