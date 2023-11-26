import { ReactNode, createContext, useContext } from "react";
import { useFormBrandItem } from "./form-brand-item.hook";

const FormBrandItemContext = createContext(
  {} as ReturnType<typeof useFormBrandItem>
);
export function useFormBrandItemContext() {
  return useContext(FormBrandItemContext);
}

interface FormBrandItemProviderProps {
  children: ReactNode;
}
export function FormBrandItemProvider({ children }: FormBrandItemProviderProps) {
  return (
    <FormBrandItemContext.Provider value={useFormBrandItem()}>
      {children}
    </FormBrandItemContext.Provider>
  );
}
