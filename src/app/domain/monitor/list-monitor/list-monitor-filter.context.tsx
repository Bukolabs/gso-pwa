import { ReactNode, createContext, useContext } from "react";
import { useListMonitorFilter } from "./list-monitor-filter.hook";

const MonitorFilterContext = createContext(
  {} as ReturnType<typeof useListMonitorFilter>
);
export function useMonitorFilterContext() {
  return useContext(MonitorFilterContext);
}

interface MonitorFilterProviderProps {
  children: ReactNode;
}
export function MonitorFilterProvider({
  children,
}: MonitorFilterProviderProps) {
  return (
    <MonitorFilterContext.Provider value={useListMonitorFilter()}>
      {children}
    </MonitorFilterContext.Provider>
  );
}
