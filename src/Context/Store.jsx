import create from "zustand";
import { AuthSlice } from "./Slices/AuthSlice";
import { devtools, persist } from "zustand/middleware";
import produce from "immer";

const INITIAL_STATE = {
  model: {
    toggle: false,
  },
  alert: {
    message: "",
    toggled: false,
    type: "success",
    time: 3000,
  },
  auth: {
    user: undefined,
    status: "NOT_INITIALIZED",
    error: null,
  },
  form: { error: { global: undefined } },
  edit: { name: false, username: false, email: false },
};

const store = (set) => ({
  ...INITIAL_STATE,
  ...AuthSlice(set),
  set: (fn) => set(produce(fn)),
});

export const useStore = create(devtools(store));
