import ChatComponent from "../../components/ChatComponent";
import PDFViewer from "./PDFViewer";
import { Panel, PanelGroup } from "react-resizable-panels";
import ResizeHandle from "../../components/ui/ResizeHandle";
import { useMobile } from "../../contexts/MobileContext";
import { useUser } from "../../contexts/UserContext";

const DocsHomePage = () => {
  const isMobile = useMobile();
  const { role, isSignedIn } = useUser();

  return (
    <div className="flex h-screen w-full">
      <div className="flex w-full max-h-screen">
        {!isMobile && isSignedIn && (
          <PanelGroup direction="horizontal">
            <Panel minSize={25} order={1} defaultSize={65}>
              <PDFViewer />
            </Panel>
            <ResizeHandle />
            <Panel minSize={25} order={2}>
              <ChatComponent />
            </Panel>
          </PanelGroup>
        )}
        {!isMobile && !isSignedIn && (
          <div className="flex w-full h-full">
            <PDFViewer />
          </div>
        )}
        {isMobile && (
          <div className="flex w-full h-full">
            <PDFViewer />
          </div>
        )}
      </div>
    </div>
  );
};

export default DocsHomePage;
