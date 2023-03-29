import { Typography } from "../Typography/Typography";

interface TextFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

export const TextField: React.FC<TextFieldProps> = ({ label, ...props }) => {
  return (
    <label className="flex flex-col">
      <div className="capitalize mb-1">
        <Typography variant="BodyM">{label}</Typography>
      </div>
      <input
        {...props}
        className="w-full p-1 rounded bg-transparent border-[1px] border-thin-grey"
      />
    </label>
  );
};
