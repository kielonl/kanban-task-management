import { useState } from "react";
import { Button } from "../components/Button/Button";
import { Checkbox } from "../components/Checkbox/Checkbox";
import Dropdown from "../components/Dropdown/Dropdown";
import { Menu } from "../components/Menu/Menu";
import { Task } from "../components/Task/Task";
import { Typography } from "../components/Typography/Typography";
import { Tasks } from "../types";
import "./Main.scss";

const tasks: Tasks[] = [
  {
    id: "1",
    title:
      "Research pricing points of various competitors and trial different business models",
    description:
      "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
    status: "doing",
    subtasks: [
      {
        title: "Research competitor pricing and business models",
        isCompleted: true,
      },
      {
        title: "Outline a business model that works for our solution",
        isCompleted: true,
      },
      {
        title:
          "Talk to potential customers about our proposed solution and ask for fair price expectancy",
        isCompleted: false,
      },
    ],
  },
];

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
        {/* <Typography variant="L">
          This board is empty. Create a new column to get started.
        </Typography> */}
        <Button>+ Add New Column</Button>
        <Checkbox
          label="pozdro"
          id="pozdro"
          isChecked={true}
          setChecked={() => console.log("huj")}
        />
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => console.log("aa")} name="item1" />
          <Dropdown.Item onClick={() => console.log("a")} name="item2" />
        </Dropdown.Menu>
        <Task setTask={() => console.log("aa")} {...tasks[0]} />
      </div>
    </div>
  );
};
