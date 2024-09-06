import { atom } from "recoil";

export const tasksState = atom({
  key: "tasksState",
  default: [],
});

export const paginationState = atom({
  key: "paginationState",
  default: {
    page: 1,
    limit: 10,
  },
});

export const authState = atom({
  key: "authState",
  default: {
    email: null,
    name: null,
    isAuthenticated: false,
  },
});
