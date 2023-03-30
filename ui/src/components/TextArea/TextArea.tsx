import classNames from "classnames";
import { Typography } from "../Typography/Typography";

interface TextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  error?: string;
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
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
      <textarea
        {...props}
        className={classNames(
          "w-full h-12 p-1 resize-none rounded bg-transparent border-[1px] text-black dark:text-white",
          isError ? "border-rose-500 border-[2px]" : "border-thin-grey"
        )}
      />
      <p className="mt-2 text-sm text-red dark:text-red-500">{error}</p>
    </label>
  );
};
