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

  useEffect(() => {
    dispatch(getBoardsNames());
  }, []);

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

            {loading.boards ? (
              <Loader />
            ) : (
              boards.map((board, index: number) => (
                <Link to={`/board/${board.id}`} key={index}>
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
                </Link>
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
  //fix browser error related to this state later
  const [showModal, setShowModal] = useState<boolean>(false);
  const { loading, currentBoard } = useAppSelector((state) => state.board);

  const dispatch = useAppDispatch();

  return (
    <>
      <Modal.Window
        title={"Add task"}
        content={
          <Modal.View.Add
            board_id={currentBoard.id}
            submit={(obj: TaskCreate) => dispatch(createTaskApi(obj))}
          />
        }
        isShown={showModal}
        hide={() => setShowModal(false)}
      />
      <div className="upperbar-wrapper">
        <div className="upperbar-container">
          <Typography variant="XL" className="upperbar-name">
            {loading.boards ? <Loader /> : currentBoard.name}
          </Typography>
          <div className="spacer"></div>
          <Button onClick={() => setShowModal(true)}>+ Add New Task</Button>
          <Icon.Ellipsis />
        </div>
      </div>
    </>
  );
};

export const Menu = {
  Sidebar,
  Upperbar,
};
