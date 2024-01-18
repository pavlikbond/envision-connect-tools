import { useState, useEffect } from "react";
import ChatComponent from "../../components/ChatComponent";
import PDFViewer from "./PDFViewer";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ResizeHandle from "../../components/ui/ResizeHandle";
const DocsHomePage = () => {
  //add a listener that will listen to screen width and determine if it is mobile or not and set a boolean state
  //if mobile, then set the panel to be horizontal
  //if not mobile, then set the panel to be vertical
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex h-screen">
      <div className="flex w-full max-h-screen">
        {/* <div className="max-h-screen flex-[4]">
          <PDFViewer />
        </div>
        <div className="flex-[2] border-l-4 border-1 max-w-xl border-slate-200 max-h-screen">
          <ChatComponent />
        </div> */}
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
