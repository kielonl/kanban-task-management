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
    <>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setChecked()}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-main-purple peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
      </label>
    </>
  );
};
