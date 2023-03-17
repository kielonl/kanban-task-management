import React, { useCallback, useEffect } from "react";
import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";
import "./Modal.scss";

interface ModalProps {
  isShown: boolean;
  hide: () => void;

  title: string;
  content?: JSX.Element;
}

export const Modal: React.FC<ModalProps> = ({
  isShown,
  hide,
  title,
  content,
}) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") hide();
  }, []);

  useEffect(() => {
    if (isShown) {
      document.addEventListener("keydown", handleKeyPress);
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [handleKeyPress, isShown]);

  return (
    <>
      {isShown && (
        <>
          <div className="modal-backdrop"></div>
          <div className="modal-wrapper">
            <Typography variant="L" className="modal-title">
              {title}
            </Typography>
            {/* <form>
              <div className="modal-content"></div>
              <div className="modal-button-container">
                <Button>Save Changes</Button>
              </div>
            </form> */}
            <div className="modal-content">{content}</div>
          </div>
        </>
      )}
    </>
  );
};
