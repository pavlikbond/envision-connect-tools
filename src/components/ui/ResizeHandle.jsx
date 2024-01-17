import { PanelResizeHandle } from "react-resizable-panels";
import { FaArrowsLeftRightToLine } from "react-icons/fa6";

export default function ResizeHandle({ className = "", id }) {
  return (
    <PanelResizeHandle className="bg-slate-200 hover:bg-slate-300 transition-all duration-200">
      <FaArrowsLeftRightToLine className="relative top-1/2" />
    </PanelResizeHandle>
  );
}
