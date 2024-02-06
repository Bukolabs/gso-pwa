import { ReactNode, createContext, useContext } from "react";
import { useEditOrder } from "./edit-order.hook";

const EditOrderContext = createContext({} as ReturnType<typeof useEditOrder>);
export function useEditOrderContext() {
  return useContext(EditOrderContext);
}

interface EditOrderProviderProps {
  children: ReactNode;
}
export function EditOrderProvider({ children }: EditOrderProviderProps) {
  return (
    <EditOrderContext.Provider value={useEditOrder()}>
      {children}
    </EditOrderContext.Provider>
  );
}
