import { ReactNode, createContext, useContext } from "react";
import { useBrandForm } from "./brand.hook";

const BrandFormContext = createContext(
  {} as ReturnType<typeof useBrandForm>
);
export function useBrandFormContext() {
  return useContext(BrandFormContext);
}

interface BrandProviderProps {
  children: ReactNode;
}
export function BrandProvider({ children }: BrandProviderProps) {
  return (
    <BrandFormContext.Provider value={useBrandForm()}>
      {children}
    </BrandFormContext.Provider>
  );
}
