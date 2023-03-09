import { useState } from "react";
import { Menu } from "../components/Menu/Menu";
import "./Main.scss";

export const Main = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  return (
    <div
      className="main-wrapper"
      style={{ marginLeft: showSidebar ? "250px" : "0" }}
    >
      <Menu.Sidebar isShown={showSidebar} setIsShown={setShowSidebar} />
      <div className="main-container">
        <Menu.Upperbar />
      </div>
    </div>
  );
};
