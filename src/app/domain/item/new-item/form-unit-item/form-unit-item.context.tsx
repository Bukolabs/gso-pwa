import { ReactNode, createContext, useContext } from "react";
import { useFormUnitItem } from "./form-unit-item.hook";

const FormUnitItemContext = createContext(
  {} as ReturnType<typeof useFormUnitItem>
);
export function useFormUnitItemContext() {
  return useContext(FormUnitItemContext);
}

interface FormUnitItemProviderProps {
  children: ReactNode;
}
export function FormUnitItemProvider({ children }: FormUnitItemProviderProps) {
  return (
    <FormUnitItemContext.Provider value={useFormUnitItem()}>
      {children}
    </FormUnitItemContext.Provider>
  );
}
