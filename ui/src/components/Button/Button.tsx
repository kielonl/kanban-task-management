import "./Button.scss";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  size?: "large" | "small";
  type?: "primary" | "secondary" | "destructive";
}

export const Button: React.FC<ButtonProps> = ({
  size,
  type,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`button button-${size || "small"} button-${type || "primary"}`}
    >
      {children}
    </button>
  );
};
