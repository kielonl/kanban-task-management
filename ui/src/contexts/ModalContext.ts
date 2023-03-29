import { createContext } from "react";
import { ModalProps } from "../types";

export const ModalContext = createContext<
  [(modal: ModalProps) => void, () => unknown]
>([() => {}, () => {}]);
