import { ReactNode } from "react";

export interface NavigationProps {
   title: string;
  path: string;
  icon?: string;
  active?: boolean;
  activeClass?: string;
  hoverClass?: string;
  alert?: boolean;
}
