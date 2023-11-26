import { ReactNode, createContext, useContext } from "react";
import { useFormCategoryItem } from "./form-category-item.hook";

const FormCategoryItemContext = createContext(
  {} as ReturnType<typeof useFormCategoryItem>
);
export function useFormCategoryItemContext() {
  return useContext(FormCategoryItemContext);
}

interface FormCategoryItemProviderProps {
  children: ReactNode;
}
export function FormCategoryItemProvider({
  children,
}: FormCategoryItemProviderProps) {
  return (
    <FormCategoryItemContext.Provider value={useFormCategoryItem()}>
      {children}
    </FormCategoryItemContext.Provider>
  );
}
