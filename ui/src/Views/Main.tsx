import { useEffect, useState } from "react";
import { Menu } from "../components/Menu/Menu";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getBoards } from "../store/board/boardSlice";
import "./Main.scss";

export const Main = () => {
  //delete this code in later commits
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  // const { response, loading, error } = UseApiRequest(METHOD.GET, "/board");
  // if (error) {
  //   return error;
  // }
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // const listBoards = response?.data.board.map((board: BoardType) => {
  //   return board.columns.map((column: ColumnType) => {
  //     return <Column name={column.name} tasks={column.tasks} key={column.id} />;
  //   });
  // });

  const { boards, loading } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, []);
  console.log({ boards, loading });
  return (
    <div
      className="main-wrapper"
      style={{ marginLeft: showSidebar ? "250px" : "0" }}
    >
      <Menu.Sidebar isShown={showSidebar} setIsShown={setShowSidebar} />
      <Menu.Upperbar />
      <div className="main-board">
        {loading ? <div>Loading...</div> : boards.board[0].name}
      </div>
    </div>
  );
};
