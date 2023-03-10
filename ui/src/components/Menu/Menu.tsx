import React from "react";
import { Icon } from "../../assets/icons/Icon";
import { Button } from "../Button/Button";
import { Logo } from "../Logo/Logo";
import { Typography } from "../Typography/Typography";

import "./Menu.scss";

interface SidebarProps {
  isShown: boolean;
  setIsShown: (isShown: boolean) => void;
}

interface ShowSidebarButtonProps {
  showSidebar: () => void;
}

const ShowSidebarButton: React.FC<ShowSidebarButtonProps> = ({
  showSidebar,
}) => {
  return (
    <div onClick={() => showSidebar()} className="show-sidebar-button-wrapper">
      <Icon.ShowSidebar />
    </div>
  );
};

const boards = [
  {
    id: 1,
    name: "Platform Launch",
  },
  {
    id: 2,
    name: "Marketing Plan",
  },
  {
    id: 3,
    name: "Roadmap",
  },
];

const currentBoard = boards[0];

const Sidebar: React.FC<SidebarProps> = ({ isShown, setIsShown }) => {
  return (
    <>
      {!isShown && <ShowSidebarButton showSidebar={() => setIsShown(true)} />}
      <div className={`sidebar-wrapper ${!isShown && "sidebar-hidden"}`}>
        <div className="sidebar-container">
          <div className="sidebar-logo">
            <Logo />
          </div>
          <div className="sidebar-boards">
            <Typography variant="S">ALL BOARDS ({boards.length})</Typography>

            {boards.map((board) => (
              <Typography
                variant="M"
                className={`sidebar-board ${
                  board.id === currentBoard.id && "sidebar-board-selected"
                }`}
                key={board.id}
              >
                <Icon.Board />
                {board.name}
              </Typography>
            ))}

            <Typography variant="M" className="sidebar-create-board">
              + Create New Board
            </Typography>
          </div>
          <div className="spacer"></div>
          <div>
            <div>dark or light mode toggler</div>
            <Typography
              variant="M"
              onClick={() => setIsShown(false)}
              className="sidebar-hide"
            >
              <Icon.HideSidebar /> Hide Sidebar
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

const Upperbar = () => {
  return (
    <div className="upperbar-wrapper">
      <div className="upperbar-container">
        <Typography variant="XL" className="upperbar-name">
          {currentBoard.name}
        </Typography>
        <div className="spacer"></div>
        <Button>+ Add New Task</Button>
        <Icon.Ellipsis />
      </div>
    </div>
  );
};

export const Menu = {
  Sidebar,
  Upperbar,
};
