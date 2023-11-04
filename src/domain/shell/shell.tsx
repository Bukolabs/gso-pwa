import SidebarItem from "../../core/ui/navigation/sidebar/sidebar-item/sidebar-item";
import "./shell";
import Sidebar from "../../core/ui/navigation/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import MobileMenu from "../../core/ui/navigation/mobile-menu/mobile-menu";
import { NavigationProps } from "../../core/ui/navigation/navigation.interface";

export function Shell() {
  const activeClass =
    "bg-gradient-to-tr from-green-200 to-green-100 text-gray-800";
  const hoverClass = "hover:bg-green-100";
  const navigationItems = [
    {
      title: "Home",
      icon: "pi pi-home",
      path: "",
      activeClass,
      hoverClass,
    },
    {
      title: "Requests",
      icon: "pi pi-book",
      path: "requests",
      activeClass,
      hoverClass,
    },
    {
      title: "Orders",
      icon: "pi pi-bars",
      path: "orders",
      activeClass,
      hoverClass,
    },
  ] as NavigationProps[];

  return (
    <div className="flex">
      <Sidebar className="hidden md:flex">
        {navigationItems.map((item, id) => (
          <SidebarItem key={id} {...item} />
        ))}
      </Sidebar>
      <MobileMenu className="flex md:hidden" menus={navigationItems} />

      <div className="h-screen flex-1 p-7">
        <Outlet />
      </div>
    </div>
  );
}

export default Shell;
