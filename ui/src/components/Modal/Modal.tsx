import { useCallback, useEffect } from "react";
import "./Modal.scss";

interface ModalProps {
  show: boolean;
  hide: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ show, hide, children }) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") hide();
  }, []);

  useEffect(() => {
    if (show) {
      document.addEventListener("keydown", handleKeyPress);
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [handleKeyPress, show]);

  return (
    <>
      {show && (
        <>
          <div className="modal-backdrop"></div>
          <div className="modal-wrapper">{children}</div>
        </>
      )}
    </>
  );
};
