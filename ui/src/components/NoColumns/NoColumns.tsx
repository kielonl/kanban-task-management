import { useAppDispatch } from "../../hooks/hooks";
import { createColumnApi } from "../../store/board/boardSlice";
import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";

const NoColumns = () => {
  const dispatch = useAppDispatch();

  return (
    <Typography
      variant="L"
      className="h-full flex items-center justify-center flex-col bg-light-grey dark:bg-very-dark-grey dark:text-white"
    >
      This board is empty. Create a new column to get started.
      <Button
        className="w-40"
        onClick={() => dispatch(createColumnApi({ name: "TODO" }))}
      >
        <Typography variant="M"> + Add New Column</Typography>
      </Button>
    </Typography>
  );
};
export default NoColumns;
