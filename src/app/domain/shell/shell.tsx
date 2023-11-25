import SidebarItem from "@shared/ui/navigation/sidebar/sidebar-item/sidebar-item";
import "./shell";
import Sidebar from "@shared/ui/navigation/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import MobileMenu from "@shared/ui/navigation/mobile-menu/mobile-menu";
import { NavigationProps } from "@shared/ui/navigation/navigation.interface";
import { ProgressBar } from "primereact/progressbar";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { Toast } from "primereact/toast";

export function Shell() {
  const { progress, toastRef } = useNotificationContext();
  const activeClass =
    "bg-gradient-to-tr from-caribbean-green-200 to-caribbean-green-100 text-gray-800";
  const hoverClass = "hover:bg-caribbean-green-100";
  const navigationItems = [
    {
      title: "Home",
      icon: "pi pi-home",
      path: "",
      activeClass,
      hoverClass,
    },
    {
      title: "Request",
      icon: "pi pi-book",
      path: "request",
      activeClass,
      hoverClass,
    },
    {
      title: "Order",
      icon: "pi pi-shopping-cart",
      path: "order",
      activeClass,
      hoverClass,
    },
    {
      title: "Item",
      icon: "pi pi-shopping-bag",
      path: "item",
      activeClass,
      hoverClass,
    },
    {
      title: "Bidder",
      icon: "pi pi-briefcase",
      path: "bidder",
      activeClass,
      hoverClass,
    },
  ] as NavigationProps[];

  return (
    <div>
      <Toast ref={toastRef} position="bottom-left"/>
      {progress?.show && (
        <ProgressBar
          mode="indeterminate"
          style={{
            height: "6px",
            zIndex: 999999,
            position: "fixed",
            width: "100%",
          }}
        ></ProgressBar>
      )}

      <div className="flex">
        <Sidebar>
          {navigationItems.map((item, id) => (
            <SidebarItem key={id} {...item} />
          ))}
        </Sidebar>
        <MobileMenu className="flex md:hidden" menus={navigationItems} />
        <div className="h-screen flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Shell;
