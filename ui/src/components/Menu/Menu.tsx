import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../assets/icons/Icon";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  createTaskApi,
  deleteBoard,
  getBoardsNames,
  updateBoard,
} from "../../store/board/boardSlice";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";
import { Logo } from "../Logo/Logo";
import { ThemeToggler } from "../ThemeToggler/ThemeToggler";
import { Typography } from "../Typography/Typography";

import classNames from "classnames";
import * as Popover from "@radix-ui/react-popover";
import Modal from "../Modal/Modal";
import { SmallDropdown } from "../SmallDropdown/SmallDropdown";
import { CreateTask } from "../Modal/Views/Task/CreateTask";
import { TaskCreate } from "../../types";
import { BoardModal } from "../Modal/Views/Board/BoardModal";
import { Delete } from "../Modal/Views/Delete";

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
    <div
      onClick={() => showSidebar()}
      className="fixed delay-500 bottom-8 px-4 py-6 rounded-r-full bg-main-purple cursor-pointer hidden md:block"
    >
      <Icon.ShowSidebar />
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isShown, setIsShown }) => {
  return (
    <div>
      {!isShown && <ShowSidebarButton showSidebar={() => setIsShown(true)} />}
      <div
        className={classNames(
          "hidden sm:block h-full w-64 fixed top-0 left-0 overflow-x-hidden right-[25px] transition-[margin-left] duration-500 border-light-lines  dark:bg-dark-grey dark:border-dark-lines dark:text-white",
          !isShown && "-ml-64"
        )}
      >
        <div className="h-full flex flex-col justify-center">
          <div className="p-8">
            <Logo />
          </div>
          <BoardNames />
          <div className="flex-1"></div>
          <div>
            <ThemeToggler />
            <Typography
              variant="M"
              onClick={() => setIsShown(false)}
              className="flex flex-row cursor-pointer p-8 text-medium-grey [&>*]:mx-3"
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
      <div className="h-[10vh] dark:bg-dark-grey dark:text-white">
        <div className="flex flex-row justify-between items-center h-full">
          <div className="p-8">
            {/* maybe add loader here later.
            deleted now because it was causing problems */}
            <Typography variant="XL" className="hidden sm:block">
              {currentBoard.name}
            </Typography>
            <div className="sm:hidden block">
              <NavMenuMobile name={currentBoard.name} />
            </div>
          </div>
          <div className="flex-1"></div>
          <div className="flex flex-row items-center [&>*]:mx-4">
            <Modal
              title={"Add task"}
              trigger={
                <Button
                  onClick={() => setShowModal(true)}
                  className="md:w-40 md:p-3 p-3"
                >
                  +{" "}
                  <span className="hidden md:inline-block ">Add New Task</span>
                </Button>
              }
            >
              <CreateTask
                submit={(obj: Omit<TaskCreate, "board_id">) =>
                  dispatch(createTaskApi(obj))
                }
              />
            </Modal>
            <SmallDropdown>
              <Modal trigger={<Typography>Edit Board</Typography>}>
                <BoardModal
                  submit={(obj) => dispatch(updateBoard(obj))}
                  board={{
                    name: currentBoard.name,
                    columns: currentBoard.columns.map((column) => ({
                      name: column.name,
                    })),
                  }}
                />
              </Modal>

              <Modal
                trigger={
                  <Typography className="text-red">Delete Board</Typography>
                }
              >
                <Delete
                  item={{ name: currentBoard.name, type: "board" }}
                  submit={() => dispatch(deleteBoard(currentBoard.id))}
                  cancel={() => ""}
                />
              </Modal>
            </SmallDropdown>
          </div>
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
    <div className="flex flex-col h-full overflow-y-auto last:pl-4 last:pb-4">
      <Typography variant="S" className="p-4">
        ALL BOARDS ({boards.length})
      </Typography>
      {boards.map((board, index: number) => (
        <Link to={`/board/${board.id}`} key={index}>
          <Typography
            variant="M"
            className={classNames(
              "w-[80%] text-medium-grey flex gap-2 cursor-pointer py-3 px-4 rounded-r-full hover:text-main-purple hover:bg-main-purple-light",
              board.id === currentBoard.id &&
                "bg-main-purple text-white hover:bg-main-purple hover:text-white"
            )}
            key={board.id}
          >
            <Icon.Board />
            {board.name}
          </Typography>
        </Link>
      ))}
      <Typography variant="M" className="text-main-purple cursor-pointer m-4">
        + Create New Board
      </Typography>
    </div>
  );
};

const NavMenuMobile: React.FC<NavMenuProps> = ({ name }) => {
  return (
    <Popover.Root modal>
      <Popover.Trigger className="flex flex-row gap-4 items-center">
        <>
          <Logo />
          <Typography variant="XL">{name}</Typography>
          <Icon.ArrowDown className="relative duration-250 ease-linear " />
        </>
      </Popover.Trigger>
      <Popover.Portal>
        <>
          <div className="bg-black-opacity data-[state=open]:animate-overlayShow fixed inset-0"></div>
          <Popover.Content className="bg-white z-[1] dark:bg-dark-grey w-[60vw] rounded-lg absolute top-20">
            <div className="overflow-y-scroll max-h-60">
              <BoardNames />
            </div>
            <ThemeToggler className="p-3" />
          </Popover.Content>
        </>
      </Popover.Portal>
    </Popover.Root>
  );
};

export const Menu = {
  Sidebar,
  Upperbar,
};
