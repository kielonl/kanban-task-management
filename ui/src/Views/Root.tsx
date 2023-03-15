import { useState } from "react";
import { Menu } from "../components/Menu/Menu";
import { Board } from "./Board";
import "./Main.scss";

export const Root = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

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
