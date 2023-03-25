import { useEffect, useRef, useState } from "react";
import { Menu } from "../components/Menu/Menu";
import { Board } from "./Board";
import "./Root.scss";

export const Root = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  //move this to external file later
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const marginLeft = windowSize[0] < 600 ? "0" : showSidebar ? "250px" : "0";

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
function setWindowSize(arg0: number[]) {
  throw new Error("Function not implemented.");
}
