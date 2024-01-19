import ChatComponent from "../../components/ChatComponent";
import PDFViewer from "./PDFViewer";
import { Panel, PanelGroup } from "react-resizable-panels";
import ResizeHandle from "../../components/ui/ResizeHandle";
import { useMobile } from "../../contexts/MobileContext";
const DocsHomePage = () => {
  const isMobile = useMobile();

  return (
    <div className="flex h-screen w-full">
      <div className="flex w-full max-h-screen">
        {!isMobile ? (
          <PanelGroup direction="horizontal">
            <Panel minSize={25} order={1} defaultSize={65}>
              <PDFViewer />
            </Panel>
            <ResizeHandle />
            <Panel minSize={25} order={2}>
              <ChatComponent />
            </Panel>
          </PanelGroup>
        ) : (
          <ChatComponent />
        )}
      </div>
    </div>
  );
};

export default DocsHomePage;
