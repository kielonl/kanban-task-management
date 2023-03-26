import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../assets/icons/Icon";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createTaskApi, getBoardsNames } from "../../store/board/boardSlice";
import { TaskCreate } from "../../services";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";
import { Logo } from "../Logo/Logo";
import { Modal } from "../Modal/Modal";
import { ThemeToggler } from "../ThemeToggler/ThemeToggler";
import { Typography } from "../Typography/Typography";

import "./Menu.scss";
import classNames from "classnames";
import * as Popover from "@radix-ui/react-popover";

interface SidebarProps {
  isShown: boolean;
  setIsShown: (isShown: boolean) => void;
}

interface ShowSidebarButtonProps {
  showSidebar: () => void;
}

interface NavMenuProps {
  name: string | JSX.Element;
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
  return (
    <div>
      {!isShown && <ShowSidebarButton showSidebar={() => setIsShown(true)} />}
      <div
        className={classNames("sidebar-wrapper", !isShown && "sidebar-hidden")}
      >
        <div className="sidebar-container">
          <div className="sidebar-logo">
            <Logo />
          </div>
          <BoardNames />
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
    </div>
  );
};

const Upperbar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { currentBoard } = useAppSelector((state) => state.board);

  const dispatch = useAppDispatch();

  return (
    <>
      <div className="upperbar-wrapper">
        <div className="upperbar-container">
          <div className="upperbar-name">
            {/* maybe add loader here later.
            deleted now because it was causing problems */}
            <Typography variant="XL" className="desktop-only">
              {currentBoard.name}
            </Typography>
            <div className="mobile-only">
              <NavMenuMobile name={currentBoard.name} />
            </div>
          </div>
          <div className="spacer"></div>
          <Modal.Window
            title={"Add task"}
            isShown={showModal}
            hide={() => setShowModal(false)}
            content={
              <Modal.View.Add
                board_id={currentBoard.id}
                submit={(obj: TaskCreate) => dispatch(createTaskApi(obj))}
              />
            }
          >
            <Button onClick={() => setShowModal(true)}>
              + <span className="upperbar-add-text">Add New Task</span>
            </Button>
          </Modal.Window>
          <Icon.Ellipsis />
        </div>
      </div>
    </>
  );
};

const BoardNames = () => {
  const { loading, boards, currentBoard } = useAppSelector(
    (state) => state.board
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardsNames());
  }, []);

  if (loading.boards || !boards.length) return <Loader />;

  return (
    <div className="sidebar-boards">
      <Typography variant="S" className="sidebar-boards-header">
        ALL BOARDS ({boards.length})
      </Typography>
      {boards.map((board, index: number) => (
        <Link to={`/board/${board.id}`} key={index}>
          <Typography
            variant="M"
            className={classNames(
              "sidebar-board",
              board.id === currentBoard.id && "sidebar-board-selected"
            )}
            key={board.id}
          >
            <Icon.Board />
            {board.name}
          </Typography>
        </Link>
      ))}
      <Typography variant="M" className="sidebar-create-board">
        + Create New Board
      </Typography>
    </div>
  );
};

const NavMenuMobile: React.FC<NavMenuProps> = ({ name }) => {
  return (
    <Popover.Root modal>
      <Popover.Trigger className="navmenu-trigger--mobile">
        <Logo />
        <Typography variant="XL">{name}</Typography>
        <Icon.ArrowDown className="arrow-down" />
      </Popover.Trigger>
      <Popover.Content className="navmenu-content--mobile">
        <div className="navmenu-boards--mobile">
          <BoardNames />
        </div>
        <ThemeToggler />
      </Popover.Content>
    </Popover.Root>
  );
};

export const Menu = {
  Sidebar,
  Upperbar,
};
