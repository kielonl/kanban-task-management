import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { Typography } from "../Typography/Typography";

interface CheckboxProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "type"
  > {
  label: string;
  id: string;
  isChecked: boolean;
  setChecked: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  isChecked,
  setChecked,
  className,
  ...props
}) => {
  return (
    <label
      className={twMerge(
        "flex items-center rounded text-xs font-bold w-full cursor-pointer ",
        className
      )}
      htmlFor={id}
    >
      <div className="w-full flex items-center pl-4 bg-light-grey hover:bg-main-purple-light dark:hover:bg-very-dark-grey dark:bg-main-purple-light rounded-md dark:bg-very-dark-grey ">
        <input
          id={id}
          type="checkbox"
          onChange={() => setChecked()}
          checked={isChecked}
          {...props}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 hue-rotate-[55deg]"
        />
        <Typography
          variant="BodyM"
          className={classNames(
            "w-full py-3 ml-2 text-sm font-medium text-gray-900",
            isChecked ? "line-through text-grey" : ""
          )}
        >
          {label}
        </Typography>
      </div>
    </label>
  );
};
