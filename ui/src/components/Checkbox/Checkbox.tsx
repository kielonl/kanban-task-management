import { Typography } from "../Typography/Typography";
import "./Checkbox.scss";

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
  ...props
}) => {
  return (
    <label className="checkbox-container" htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={() => setChecked()}
        {...props}
      />
      <Typography variant="BodyM" className="checkbox-label">
        {label}
      </Typography>
    </label>
  );
};
