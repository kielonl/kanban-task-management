import { useEffect, useState } from "react";
import { Loader } from "../components/Loader/Loader";
import { Menu } from "../components/Menu/Menu";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getBoards } from "../store/board/boardSlice";
import "./Main.scss";

export const Main = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const { boards, loading } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  return (
    <div
      className="main-wrapper"
      style={{ marginLeft: showSidebar ? "250px" : "0" }}
    >
      <Menu.Sidebar isShown={showSidebar} setIsShown={setShowSidebar} />
      <Menu.Upperbar />
      <div className="main-board">{loading ? <Loader /> : boards[0].name}</div>
    </div>
  );
};
