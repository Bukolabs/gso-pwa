import SidebarItem from "@shared/ui/navigation/sidebar/sidebar-item/sidebar-item";
import "./shell";
import Sidebar from "@shared/ui/navigation/sidebar/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import MobileMenu from "@shared/ui/navigation/mobile-menu/mobile-menu";
import { NavigationProps } from "@shared/ui/navigation/navigation.interface";
import { ProgressBar } from "primereact/progressbar";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { Toast } from "primereact/toast";

export function Shell() {
  const navigate = useNavigate();
  const { progress, toastRef } = useNotificationContext();
  const activeClass =
    "bg-gradient-to-tr from-caribbean-green-200 to-caribbean-green-100 text-gray-800";
  const hoverClass = "hover:bg-caribbean-green-100";
  const homeNav = {
    title: "Home",
    icon: "pi pi-home",
    path: "",
    activeClass,
    hoverClass,
  };
  const requestNav = {
    title: "Request",
    icon: "pi pi-book",
    path: "request",
    activeClass,
    hoverClass,
  };
  const orderNav = {
    title: "Order",
    icon: "pi pi-shopping-cart",
    path: "order",
    activeClass,
    hoverClass,
  };
  const itemNav = {
    title: "Item",
    icon: "pi pi-shopping-bag",
    path: "item",
    activeClass,
    hoverClass,
  };
  const bidderNav = {
    title: "Bidder",
    icon: "pi pi-briefcase",
    path: "bidder",
    activeClass,
    hoverClass,
  };
  const accountNav = {
    title: "Account",
    icon: "pi pi-users",
    path: "account",
    activeClass,
    hoverClass,
  };
  const moreNav = {
    title: "More",
    icon: "pi pi-bars",
    path: "more",
    isMore: true,
    activeClass,
    hoverClass,
  };
  const desktopNavigation = [
    homeNav,
    requestNav,
    orderNav,
    itemNav,
    bidderNav,
    accountNav,
  ] as NavigationProps[];
  const mobileNavigation = [
    homeNav,
    requestNav,
    orderNav,
    bidderNav,
    moreNav,
  ] as NavigationProps[];
  const mobileMoreNavigation = [
    {
      label: "Account",
      command: () => {
        navigate("/account");
      },
    },
    {
      label: "Item",
      command: () => {
        navigate("/item");
      },
    },
  ];

  return (
    <div>
      <Toast ref={toastRef} position="bottom-left" />
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

      <div className="flex ">
        <Sidebar title="GSO Tracker" logo="/icon-152x152.png" logoWidth="w-12">
          {desktopNavigation.map((item, id) => (
            <SidebarItem key={id} {...item} />
          ))}
        </Sidebar>
        <MobileMenu
          className="flex md:hidden"
          menus={mobileNavigation}
          more={mobileMoreNavigation}
        />
        <div className="h-screen flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Shell;
