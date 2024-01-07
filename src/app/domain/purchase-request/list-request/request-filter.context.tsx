import { ReactNode, createContext, useContext } from "react";
import { useRequestFilter } from "./request-filter.hook";

const RequestFilterContext = createContext(
  {} as ReturnType<typeof useRequestFilter>
);
export function useRequestFilterContext() {
  return useContext(RequestFilterContext);
}

interface RequestFilterProviderProps {
  children: ReactNode;
}
export function RequestFilterProvider({
  children,
}: RequestFilterProviderProps) {
  return (
    <RequestFilterContext.Provider value={useRequestFilter()}>
      {children}
    </RequestFilterContext.Provider>
  );
}
