import { useState } from "react";
import Modal from "../components/Modal/Modal";
import { ModalProps } from "../types";
import { ModalContext } from "./ModalContext";

const ModalContextProvider = ({ children }: any) => {
  const [modal, setModal] = useState<ModalProps | undefined>();

  const openModal = (modal: ModalProps) => setModal(modal);
  const closeModal = () => setModal(undefined);

  return (
    <ModalContext.Provider value={[openModal, closeModal]}>
      {children}
      {modal && (
        <Modal {...modal}>
          <div>{modal.content}</div>
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
