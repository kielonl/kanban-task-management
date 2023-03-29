import React, { useContext } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ModalContext } from "../../contexts/ModalContext";

interface ModalProps {
  title?: string;
  children: JSX.Element;
}

const Modal: React.FC<ModalProps> = ({ title, children }) => {
  const [openModal, closeModal] = useContext(ModalContext);

  return (
    <Dialog.Root open={children !== undefined}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="bg-black-opacity data-[state=open]:animate-overlayShow fixed inset-0 "
          onClick={() => closeModal()}
        />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white dark:bg-dark-grey dark:text-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none ">
          <Dialog.Title>{title || ""}</Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
