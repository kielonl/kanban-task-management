import classNames from "classnames";
import { Typography } from "../Typography/Typography";
import "./TextField.scss";

interface TextFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  error?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  ...props
}) => {
  return (
    <label className={classNames("input-wrapper", error && "input-error")}>
      <div className="input-label">
        <Typography variant="BodyM">{label}</Typography>
      </div>
      <input {...props} className="input" />
    </label>
  );
};
