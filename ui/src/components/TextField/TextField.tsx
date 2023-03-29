import classNames from "classnames";
import { Typography } from "../Typography/Typography";

interface TextFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: string;
  label: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  ...props
}) => {
  const isError = error?.length;
  return (
    <label className="flex flex-col">
      <div className="capitalize mb-1">
        <Typography variant="BodyM" className={isError ? "text-red" : ""}>
          {label}
        </Typography>
      </div>
      <input
        {...props}
        className={classNames(
          "w-full  p-1 rounded bg-transparent border-[1px]",
          isError ? "border-rose-500 border-[2px]" : "border-thin-grey"
        )}
      />
    </label>
  );
};
