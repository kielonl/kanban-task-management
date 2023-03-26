import { useState } from "react";
import { Menu } from "../components/Menu/Menu";
import { useWindowSize } from "../hooks/useWindowSize";
import { Board } from "./Board";
import "./Root.scss";

export const Root = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const { width } = useWindowSize();

  const marginLeft = width < 600 ? "0" : showSidebar ? "250px" : "0";

  return (
    <div className="main-wrapper" style={{ marginLeft }}>
      <div className="desktop-only">
        <Menu.Sidebar isShown={showSidebar} setIsShown={setShowSidebar} />
      </div>
      <Menu.Upperbar />
      <Board />
    </div>
  );
};
