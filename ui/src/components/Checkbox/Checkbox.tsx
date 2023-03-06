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
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  isChecked,
  ...props
}) => {
  const theme = "light";
  return (
    <label className={`checkbox-container checkbox-${theme}`} htmlFor={id}>
      <input type="checkbox" id={id} {...props} checked={isChecked} />
      <div>{label}</div>
    </label>
  );
};
