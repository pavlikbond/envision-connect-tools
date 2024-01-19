import { Outlet } from "react-router-dom";
import DocsSidebar from "../../components/ui/DocsSidebar";
import { useMobile } from "../../contexts/MobileContext";
import { cn } from "../../lib/utils";
const Documentation = () => {
  const isMobile = useMobile();
  return (
    <div
      className={cn("w-full mx-auto flex", {
        "flex-col": isMobile,
        "flex-row": !isMobile,
      })}
    >
      <DocsSidebar />
      <Outlet />
    </div>
  );
};

export default Documentation;
