import { useAppDispatch } from "../../hooks/hooks";
import { createColumnApi } from "../../store/board/boardSlice";
import { Status } from "../../types";
import { Typography } from "../Typography/Typography";

const AddColumn: React.FC<{ name: Status }> = ({ name }) => {
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => dispatch(createColumnApi({ name }))}
      className="bg-gradient-to-tl from-[#E9EFFA] to-[#e9effa] rounded-[8px] cursor-pointer flex items-center justify-center gap-4 min-w-[20em] text-grey dark:from-[#2B2C37] dark:to-[#2b2c3780]"
    >
      <Typography variant="XL"> + New Column</Typography>
    </div>
  );
};

export default AddColumn;
