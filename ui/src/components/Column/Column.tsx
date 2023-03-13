import { Status } from "../../types";
import { TaskType } from "../../types";
import { Task } from "../Task/Task";
import { Typography } from "../Typography/Typography";
import "./Column.scss";

interface ColumnProps {
  tasks: TaskType[];
  name: Status;
}

export const Column: React.FC<ColumnProps> = ({ name, tasks }) => {
  const amountOfTasks = tasks.length;

  const dotColor: { [key in Status]: string } = {
    TODO: "#49C4E5",
    DOING: "#8471F2",
    DONE: "#67E2AE",
  };

  return (
    <div className="column-wrapper">
      <Typography variant="S" className="column-name">
        <div
          className="column-dot"
          style={{ background: dotColor[name] }}
        ></div>
        {name} {amountOfTasks > 0 && `(${amountOfTasks})`}
      </Typography>
      <div className="column-tasks">
        {tasks.map((task: TaskType) => {
          return (
            <Task
              {...task}
              setTask={() => console.log("this is a test")}
              key={task.id}
            />
          );
        })}
      </div>
    </div>
  );
};
