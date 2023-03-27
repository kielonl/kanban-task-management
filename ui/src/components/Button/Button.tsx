import classNames from "classnames";
import { twMerge } from "tailwind-merge";
interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: "large" | "small";
  variant?: "primary" | "secondary" | "destructive";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  size,
  variant,
  children,
  className = "",
  ...props
}) => {
  const sizeClass = {
    large: "text-lg",
    small: "text-xs",
  };

  const variantClass = {
    primary: "bg-main-purple hover:bg-main-purple-hover text-white",
    secondary: "bg-light-grey hover:bg-main-purple-light text-main-purple",
    destructive: "bg-red hover:bg-red-hover text-white",
  };

  return (
    <button
      {...props}
      className={twMerge(
        classNames(
          "w-full no-underline font-bol text-xs leading-6 text-center cursor-pointer rounded-[20px] py-4 focus:outline-none focus:shadow-outline"
        ),
        className,
        sizeClass[size || "small"],
        variantClass[variant || "primary"]
      )}
    >
      {children}
    </button>
  );
};
