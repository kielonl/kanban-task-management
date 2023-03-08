import { Status } from "../../types";
import { Typography } from "../Typography/Typography";
import "./Column.scss";

interface ColumnProps {
  children: JSX.Element[];
  name: Status;
}

export const Column: React.FC<ColumnProps> = ({ name, children }) => {
  const amountOfTasks = children.length;

  const dotColor: { [key in Status]: string } = {
    todo: "#49C4E5",
    doing: "#8471F2",
    done: "#67E2AE",
  };

  return (
    <div className="column-wrapper">
      <Typography variant="S" className="column-name">
        <div
          className="column-dot"
          style={{ background: dotColor[name] }}
        ></div>
        {name} ({amountOfTasks})
      </Typography>
      <div className="column-tasks">{children}</div>
    </div>
  );
};
