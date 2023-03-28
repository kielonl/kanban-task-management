import { useState } from "react";
import { Menu } from "../components/Menu/Menu";
import { useWindowSize } from "../hooks/useWindowSize";
import { Board } from "./Board";

export const Root = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const { width } = useWindowSize();

  const marginLeft = width <= 640 ? "0" : showSidebar ? "250px" : "0";

  return (
    <div
      className="transition-[margin-left] duration-500 h-[90vh]"
      style={{ marginLeft }}
    >
      <div className="desktop-only">
        <Menu.Sidebar isShown={showSidebar} setIsShown={setShowSidebar} />
      </div>
      <Menu.Upperbar />
      <Board />
    </div>
  );
};
