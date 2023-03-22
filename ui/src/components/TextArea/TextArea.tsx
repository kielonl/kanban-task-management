import { Typography } from "../Typography/Typography";
import "./TextArea.scss";

interface TextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => {
  return (
    <label className="textarea-wrapper">
      <div className="textarea-label">
        <Typography variant="BodyM">{label}</Typography>
      </div>
      <textarea {...props} className="textarea" />
    </label>
  );
};
