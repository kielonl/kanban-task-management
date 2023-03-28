import classNames from "classnames";
import { useColumnDrop } from "../../hooks/useColumnDrop";
import { useColumnTasks } from "../../hooks/useColumnTasks";
import { Status } from "../../types";
import { TaskType } from "../../types";
import { Task } from "../Task/Task";
import { Typography } from "../Typography/Typography";

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
      className={classNames(
        "flex flex-col gap-4 min-w-[20em]",
        isOver ? "opacity-85" : "opacity-100"
      )}
      ref={dropRef}
    >
      <Typography
        variant="S"
        className="uppercase flex flex-row gap-2 text-black dark:text-white"
      >
        <div
          className="h-4 w-4 rounded-full"
          style={{ background: dotColor[name] }}
        ></div>
        {name} {amountOfTasks > 0 && `(${amountOfTasks})`}
      </Typography>
      <div className="flex flex-col gap-4 max-h-screen overflow-y-scroll">
        {renderTasks()}
      </div>
    </div>
  );
};
