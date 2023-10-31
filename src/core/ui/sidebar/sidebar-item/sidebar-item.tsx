import "./sidebar-item";
import { ReactNode, useContext } from "react";
import { SidebarContext } from "../sidebar";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

export interface SidebarItemProps {
  text: string;
  path: string;
  icon?: ReactNode;
  active?: boolean;
  activeClass?: string;
  hoverClass?: string;
  alert?: boolean;
}

export function SidebarItem({
  icon,
  path,
  text,
  alert,
  activeClass,
  hoverClass,
}: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);

  return (
    <NavLink
      to={path}
      className={({ isActive }) => {
        const activeRouteClass = isActive
          ? activeClass ||
            "bg-gradient-to-tr from-indigo-400 to-indigo-300 text-indigo-800 text-white"
          : hoverClass || "hover:bg-indigo-100";

        return classNames(
          `relative flex py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group items-center`,
          activeRouteClass
        );
      }}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3 text-left" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50
      `}
        >
          {text}
        </div>
      )}
    </NavLink>
  );
}

export default SidebarItem;
