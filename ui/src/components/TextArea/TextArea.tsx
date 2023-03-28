import { Typography } from "../Typography/Typography";

interface TextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => {
  return (
    <label className="flex flex-col">
      <div className="capitalize mb-1">
        <Typography variant="BodyM">{label}</Typography>
      </div>
      <textarea
        {...props}
        className="w-full h-12 p-1 resize-none rounded bg-transparent border-[1px] border-thin-grey text-black dark:text-white"
      />
    </label>
  );
};
