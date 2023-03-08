import { useCallback, useEffect } from "react";
import "./Modal.scss";

interface ModalProps {
  isShown: boolean;
  hide: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isShown, hide, children }) => {
  const theme = "dark";
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
          <div className={`modal-wrapper modal-${theme}`}>{children}</div>
        </>
      )}
    </>
  );
};
