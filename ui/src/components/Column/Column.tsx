import { useColumnDrop } from "../../hooks/useColumnDrop";
import { useColumnTasks } from "../../hooks/useColumnTasks";
import { Status } from "../../types";
import { TaskType } from "../../types";
import { Task } from "../Task/Task";
import { Typography } from "../Typography/Typography";
import "./Column.scss";

interface ColumnProps {
  name: Status;
}

export const Column: React.FC<ColumnProps> = ({ name }) => {
  const { tasks, dropTaskFrom } = useColumnTasks(name);
  const { dropRef, isOver } = useColumnDrop(name, dropTaskFrom);

  const amountOfTasks = tasks?.length || 0;

  const dotColor: { [key in Status]: string } = {
    TODO: "#49C4E5",
    DOING: "#8471F2",
    DONE: "#67E2AE",
  };

  const renderTasks = () => {
    if (tasks !== undefined) {
      return tasks.map((task: TaskType, index: number) => {
        return <Task {...task} index={index} key={task.id} />;
      });
    }
  };

  return (
    <div
      className="column-wrapper"
      style={{ opacity: isOver ? 0.85 : 1 }}
      ref={dropRef}
    >
      <Typography variant="S" className="column-name">
        <div
          className="column-dot"
          style={{ background: dotColor[name] }}
        ></div>
        {name} {amountOfTasks > 0 && `(${amountOfTasks})`}
      </Typography>
      <div className="column-tasks">{renderTasks()}</div>
    </div>
  );
};
