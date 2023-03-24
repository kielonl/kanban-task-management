import { useState } from "react";
import { Menu } from "../components/Menu/Menu";
import { Board } from "./Board";
import "./Root.scss";

export const Root = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <div
      className="main-wrapper"
      style={{ marginLeft: showSidebar ? "250px" : "0" }}
    >
      <Menu.Sidebar isShown={showSidebar} setIsShown={setShowSidebar} />
      <Menu.Upperbar />
      <Board />
    </div>
  );
};
