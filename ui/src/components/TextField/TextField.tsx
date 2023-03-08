import "./TextField.scss";

interface TextFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({ error, ...props }) => {
  const theme = "dark";
  return (
    <label className={`input-wrapper ${error && "input-error"}`}>
      <input {...props} className={`input input-${theme}`} />
    </label>
  );
};
