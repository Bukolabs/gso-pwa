import { Button } from "primereact/button";
import "./header-content";
import { ReactNode } from "react";

export interface HeaderContentProps {
  title: string;
  children?: ReactNode;
  onBack?: () => void;
}

export function HeaderContent({ title, children, onBack }: HeaderContentProps) {
  return (
    <header className="header-content bg-white p-7 flex flex-row justify-between items-center md:items-start">
      <div className="flex gap-2 items-center">
        {onBack && (
          <Button
            icon="pi pi-angle-left"
            severity="secondary"
            text
            onClick={() => onBack()}
          />
        )}
        <h1>{title}</h1>
      </div>
      <div>{children}</div>
    </header>
  );
}

export default HeaderContent;
