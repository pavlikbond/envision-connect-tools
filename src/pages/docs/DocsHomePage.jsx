import React from "react";
import ChatComponent from "../../components/ChatComponent";
import PDFViewer from "./PDFViewer";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ResizeHandle from "../../components/ui/ResizeHandle";
const DocsHomePage = () => {
  return (
    <div className="flex h-screen">
      <div className="flex w-full max-h-screen">
        {/* <div className="max-h-screen flex-[4]">
          <PDFViewer />
        </div>
        <div className="flex-[2] border-l-4 border-1 max-w-xl border-slate-200 max-h-screen">
          <ChatComponent />
        </div> */}
        <PanelGroup direction="horizontal">
          <Panel minSize={25} order={1} defaultSize={65}>
            <PDFViewer />
          </Panel>
          <ResizeHandle />
          <Panel minSize={25} order={2}>
            <ChatComponent />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default DocsHomePage;
