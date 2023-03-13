import "./CheckboxSlider.scss";

interface CheckboxProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "type"
  > {
  id: string;
  isChecked: boolean;
  setChecked: () => void;
}

export const CheckboxSlider: React.FC<CheckboxProps> = ({
  id,
  isChecked,
  setChecked,
}) => {
  return (
    <label className="switch" htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={() => setChecked()}
      />
      <div className="slider round"></div>
    </label>
  );
};
