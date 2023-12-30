import { NavLink } from "react-router-dom";
import "./nav-item";
import { NavigationProps } from "../../navigation.interface";
import classNames from "classnames";

export function NavItem({
  activeClass,
  hoverClass,
  path,
  icon,
  title,
}: NavigationProps) {
  return (
    <NavLink
      className={({ isActive }) => {
        const activeRouteClass = isActive
          ? `${activeClass} active` || "bg-green-200"
          : hoverClass || "hover:bg-green-100";

        return classNames(`flex flex-col text-center pt-4`, activeRouteClass);
      }}
      to={path}
    >
      <span className={`text-xl cursor-pointer duration-500 text-black z-50`}>
        <i className={classNames("pi", icon, "text-gray-800")}></i>
      </span>
      <span
        className={classNames(`duration-700 opacity-100 mb-4`, "text-gray-800")}
      >
        {title}
      </span>
    </NavLink>
  );
}

export default NavItem;
