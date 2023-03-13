import { useState } from "react";
import { UseApiRequest } from "../api/useApiRequest";
import { Column } from "../components/Column/Column";
import { Menu } from "../components/Menu/Menu";

import { BoardType, ColumnType } from "../types";
import { METHOD } from "../utils/constants";
import "./Main.scss";

export const Main = () => {
  //delete this code in later commits
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const { response, loading, error } = UseApiRequest(METHOD.GET, "/board");
  if (error) {
    return error;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  const listBoards = response?.data.board.map((board: BoardType) => {
    return board.columns.map((column: ColumnType) => {
      return <Column name={column.name} tasks={column.tasks} key={column.id} />;
    });
  });

  return (
    <div
      className="main-wrapper"
      style={{ marginLeft: showSidebar ? "250px" : "0" }}
    >
      <Menu.Sidebar isShown={showSidebar} setIsShown={setShowSidebar} />
      <Menu.Upperbar />
      <div className="main-board">{listBoards}</div>
    </div>
  );
};
