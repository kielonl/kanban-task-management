import React from "react";
import { Icon } from "../../assets/icons/Icon";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setCurrentBoard } from "../../store/board/boardSlice";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";
import { Logo } from "../Logo/Logo";
import { ThemeToggler } from "../ThemeToggler/ThemeToggler";
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

const Sidebar: React.FC<SidebarProps> = ({ isShown, setIsShown }) => {
  const { loading, boards, currentBoard } = useAppSelector(
    (state) => state.board
  );
  const dispatch = useAppDispatch();

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

            {loading ? (
              <Loader />
            ) : (
              boards.map((board) => (
                <Typography
                  variant="M"
                  onClick={() => dispatch(setCurrentBoard({ ...board }))}
                  className={`sidebar-board ${
                    board.id === currentBoard.id && "sidebar-board-selected"
                  }`}
                  key={board.id}
                >
                  <Icon.Board />
                  {board.name}
                </Typography>
              ))
            )}

            <Typography variant="M" className="sidebar-create-board">
              + Create New Board
            </Typography>
          </div>
          <div className="spacer"></div>
          <div>
            <ThemeToggler />
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
  const { loading, currentBoard } = useAppSelector((state) => state.board);

  return (
    <div className="upperbar-wrapper">
      <div className="upperbar-container">
        <Typography variant="XL" className="upperbar-name">
          {loading ? <Loader /> : currentBoard.name}
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
