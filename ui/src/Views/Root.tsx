import { useEffect, useState } from "react";
import { Menu } from "../components/Menu/Menu";
import { useWindowSize } from "../hooks/useWindowSize";
import { load, save } from "../services/storageManager";
import { Board } from "./Board";

export const Root = () => {
  const showSidebarStorage = load("showSidebar") || true;
  const [showSidebar, setShowSidebar] = useState<boolean>(
    showSidebarStorage.showSidebar
  );

  const { width } = useWindowSize();

  useEffect(() => {
    save("showSidebar", { showSidebar });
  }, [showSidebar]);

  const marginLeft = width <= 640 ? "0" : showSidebar ? "250px" : "0";

  return (
    <div
      className="transition-[margin-left] duration-500 h-[90vh]"
      style={{ marginLeft }}
    >
      <div className="desktop-only">
        <Menu.Sidebar isShown={showSidebar} setIsShown={setShowSidebar} />
      </div>
      <Menu.Upperbar isSidebarShown={showSidebar || width <= 640} />
      <Board />
    </div>
  );
};
