import SidebarItem, {
  SidebarItemProps,
} from "../../core/ui/sidebar/sidebar-item/sidebar-item";
import "./shell";
import Sidebar from "../../core/ui/sidebar/sidebar";
import { Outlet } from "react-router-dom";

/* eslint-disable-next-line */
export interface ShellProps {}

export function Shell() {
  const activeClass =
    "bg-gradient-to-tr from-gray-300 to-gray-200 text-gray-800 text-white";
  const hoverClass = "hover:bg-gray-100";
  const navigationItems = [
    {
      text: "Home",
      icon: <i className="pi pi-home"></i>,
      path: "",
      activeClass,
      hoverClass,
    },
    {
      text: "Requests",
      icon: <i className="pi pi-book"></i>,
      path: "requests",
      activeClass,
      hoverClass,
    },
    {
      text: "Orders",
      icon: <i className="pi pi-bars"></i>,
      path: "orders",
      activeClass,
      hoverClass,
    },
  ] as SidebarItemProps[];

  return (
    <div className="flex">
      <Sidebar>
        {navigationItems.map((item, id) => (
          <SidebarItem key={id} {...item} />
        ))}
      </Sidebar>

      <div className="h-screen flex-1 p-7">
        <Outlet />
      </div>
    </div>
  );
}

export default Shell;
