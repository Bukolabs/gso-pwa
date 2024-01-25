import { ReactNode, createContext, useContext } from "react";
import { useOrderFilter } from "./order-filter.hook";

const OrderFilterContext = createContext(
  {} as ReturnType<typeof useOrderFilter>
);
export function useOrderFilterContext() {
  return useContext(OrderFilterContext);
}

interface OrderFilterProviderProps {
  children: ReactNode;
}
export function OrderFilterProvider({
  children,
}: OrderFilterProviderProps) {
  return (
    <OrderFilterContext.Provider value={useOrderFilter()}>
      {children}
    </OrderFilterContext.Provider>
  );
}
