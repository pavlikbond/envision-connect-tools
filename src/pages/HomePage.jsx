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
const buttonStyle =
  "w-64 bg-cyan-500 duration-200 text-white font-semibold text-xl flex items-center px-4 py-4 rounded shadow";

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
  return (
    <div className="w-full p-10">
      <h1 className="text-center text-slate-600 mb-8">Envision Connect Tools</h1>
      {fact && (
        <Card sx={{ minWidth: 275, maxWidth: "50%", margin: "25px auto" }}>
          <CardContent>
            <div className="container">
              <h2 className="font-bold text-2xl my-2">Random Fact</h2>
              {fact ? <p className="font-semibold">{fact}</p> : <Skeleton variant="rounded" width={350} height={50} />}
            </div>
          </CardContent>
        </Card>
      )}
      <div className="grid grid-cols-5 gap-3 w-fit mx-auto">
        {links.map(({ to, icon: Icon, label }, index) => (
          <Link key={index} to={to}>
            <button className={buttonStyle}>
              <Icon size="28" className="mr-3" />
              {label}
            </button>
          </Link>
        ))}
      </div>

      {isSignedIn && usefulLinks.length > 0 && (
        <div className="container max-w-3xl mx-auto my-10 text-slate-600">
          <p className="text-3xl font-bold text-center mb-4">Useful Links</p>
          <div className="grid grid-cols-1 divide-y-4">
            {usefulLinks.map((link, index) => (
              <UsefulLink key={index} link={link.url} name={link.name} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
