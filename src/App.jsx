import "./index.css";
//import "./styles.css";
import { Routes, Route } from "react-router-dom";
import BulkCloser from "./pages/BulkCloser/BulkCloserPage.jsx";
//import { Amplify } from "aws-amplify";
//import awsconfig from "./aws-exports";
//import { Authenticator } from "@aws-amplify/ui-react";
//import "@aws-amplify/ui-react/styles.css";
import SideBar from "./components/SideBar";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import QueueReader from "./pages/QueueReaderPage.jsx";
import Home from "./pages/HomePage.jsx";
import GroupMappings from "./pages/GroupMappingsPage.jsx";
import { useEffect, useState } from "react";
import { UserProvider } from "./contexts/UserContext.jsx";
import EchoCreator from "./pages/EchoCreatorPage.jsx";
import MappingGenerator from "./pages/MappingGeneratorPage.jsx";
import GroupFinderPage from "./pages/GroupFinderPage.jsx";
import Files from "./components/Files";
import FlagFinder from "./pages/FlagFinderPage.jsx";
import GroupMapper from "./pages/GroupMapperPage.jsx";
import StackSetPage from "./pages/StackSetPage.jsx";
import Documentation from "./pages/docs/Documentation.jsx";
import Overview from "./pages/docs/Overview.jsx";
import Create from "./pages/docs/Create.jsx";
import Update from "./pages/docs/Update.jsx";
import ReadQueue from "./pages/docs/ReadQueue.jsx";
import { Outlet } from "react-router-dom";
import CommentsPage from "./pages/docs/CommentsPage.jsx";
import ReturnPtnPage from "./pages/docs/ReturnPtnPage.jsx";
import DocsHomePage from "./pages/docs/DocsHomePage.jsx";
import ApproveRejectPage from "./pages/docs/ApproveRejectPage.jsx";
import DeletePage from "./pages/docs/DeletePage.jsx";
import GetTicketDetailsPage from "./pages/docs/GetTicketDetailsPage.jsx";
import EchoPage from "./pages/docs/EchoPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import SignIn from "./pages/SignIn.jsx";
import { Amplify } from "aws-amplify";

import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const [companyData, setCompanyData] = useState({});
  const [companyDataList, setCompanyDataList] = useState([]);
  const [, setError] = useState("");
  const [usefulLinks, setUsefulLinks] = useState([]);
  const process = {};
  process.env = import.meta.env;
  useEffect(() => {
    //get companies for mapping tables
    fetch(`${process.env.VITE_REACT_APP_API_ENDPOINT}/mappings`, {
      headers: {
        "x-api-key": process.env.VITE_REACT_APP_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCompanyData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`${process.env.VITE_REACT_APP_API_ENDPOINT}/queues`, {
      headers: {
        "x-api-key": process.env.VITE_REACT_APP_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCompanyDataList([...data]);
      })
      .catch((err) => {
        console.log(err);
        setError("Error connecting to API");
      });

    fetch(`${process.env.VITE_REACT_APP_API_ENDPOINT}/getLinks`, {
      headers: {
        "x-api-key": process.env.VITE_REACT_APP_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsefulLinks(data);
      })
      .catch((err) => {
        console.log(err);
        setError("Error connecting to API");
      });
  }, []);

  const formFields = {
    signIn: {
      username: {
        labelHidden: false,
        placeholder: "Enter your email",
      },
      password: {
        labelHidden: false,
        label: "Password",
        placeholder: "Enter your Password",
      },
    },
  };

  //const AuthenticatedRoutes = withAuthenticator(ProtectedRoutes);
  return (
    <>
      <UserProvider>
        <div className="flex">
          <SideBar />

          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<Home data={usefulLinks} />}></Route>
            <Route path="/docs" element={<Documentation />}>
              <Route path="" element={<DocsHomePage />} />
              <Route path="overview" element={<Overview />} />
              <Route path="incident-request" element={<Outlet />}>
                <Route path="create" element={<Create />} />
                <Route path="update" element={<Update />} />
                <Route path="comments" element={<CommentsPage ticketType="Case" />} />
                <Route path="return-ptn" element={<ReturnPtnPage ticketType="Case" />} />
                <Route path="queue" element={<ReadQueue key="/incident-request/queue" isCase={true} />} />
              </Route>
              <Route path="change" element={<Outlet />}>
                <Route path="approve-reject" element={<ApproveRejectPage />} />
                <Route path="comments" element={<CommentsPage ticketType="Change" />} />
                <Route path="return-ptn" element={<ReturnPtnPage ticketType="Change" />} />
                <Route path="queue" element={<ReadQueue key="/change/queue" isCase={false} />} />
              </Route>
              <Route path="delete-from-queue" element={<DeletePage />} />
              <Route path="get-ticket-details" element={<GetTicketDetailsPage />} />
              <Route path="echo" element={<EchoPage />} />
            </Route>
            <Route path="/sign-in" element={<SignIn />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/bulk-closer" element={<BulkCloser />} />
              <Route path="/queue-reader" element={<QueueReader data={companyDataList} />} />
              <Route path="/group-mapping" element={<GroupMappings data={companyData} />} />
              <Route path="/ticket-generator" element={<EchoCreator data={companyData} />} />
              <Route path="/mapping-generator" element={<MappingGenerator />} />
              <Route path="/group-finder" element={<GroupFinderPage data={companyData} />} />
              <Route path="/files" element={<Files />} />
              <Route path="/flags" element={<FlagFinder data={companyData} />} />
              <Route path="/group-mapper" element={<GroupMapper />} />
              <Route path="/stacksets" element={<StackSetPage />}></Route>
            </Route>
          </Routes>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
