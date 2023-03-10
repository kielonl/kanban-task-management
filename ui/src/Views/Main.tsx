import { useState } from "react";
import { Button } from "../components/Button/Button";
import { Menu } from "../components/Menu/Menu";
import { Typography } from "../components/Typography/Typography";
import "./Main.scss";

export const Main = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  return (
    <div
      className="main-wrapper"
      style={{ marginLeft: showSidebar ? "250px" : "0" }}
    >
      <Menu.Sidebar isShown={showSidebar} setIsShown={setShowSidebar} />
      <Menu.Upperbar />
      <div className="main-board">
        <Typography variant="L">
          This board is empty. Create a new column to get started.
        </Typography>
        <Button>+ Add New Column</Button>
      </div>
    </div>
  );
};
