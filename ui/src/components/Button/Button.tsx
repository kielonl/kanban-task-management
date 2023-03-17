import "./Button.scss";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: "large" | "small";
  variant?: "primary" | "secondary" | "destructive";
}

export const Button: React.FC<ButtonProps> = ({
  size,
  variant,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`button button-${size || "small"} button-${
        variant || "primary"
      }`}
    >
      {children}
    </button>
  );
};
