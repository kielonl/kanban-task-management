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
  const theme = "light";
  return (
    <label className={`checkbox-container checkbox-${theme}`} htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={() => setChecked()}
        {...props}
      />
      <div>{label}</div>
    </label>
  );
};
