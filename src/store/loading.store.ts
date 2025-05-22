import { create } from "zustand";

interface State {
  show: boolean;
  message: string;

  setMessage: (value: string) => void;
  setShow: (value: boolean, message?: string) => void;
}

export default create<State>((set) => ({
  show: false,
  message: "",
  setMessage: (message) => set(() => ({ message })),
  setShow: (show, message = "") => set(() => ({ show, message })),
}));
