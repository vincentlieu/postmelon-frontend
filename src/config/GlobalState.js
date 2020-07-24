import { useContext, createContext } from "react";

export const StateContext = createContext();
export const useGlobalState = () => {
  return useContext(StateContext);
};
