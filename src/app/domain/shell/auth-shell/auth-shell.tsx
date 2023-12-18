import { Outlet, useNavigate } from "react-router-dom";
import "./auth-shell";
import {
  accountNav,
  bidderNav,
  homeNav,
  itemNav,
  moreNav,
  orderNav,
  requestNav,
} from "../shell-menu";
import { NavigationProps } from "@shared/ui/navigation/navigation.interface";

import SidebarItem from "@shared/ui/navigation/sidebar/sidebar-item/sidebar-item";
import Sidebar from "@shared/ui/navigation/sidebar/sidebar";
import MobileMenu from "@shared/ui/navigation/mobile-menu/mobile-menu";
import StorageService from "@shared/services/storage.service";
import { AUTH } from "@core/utility/settings";
import { LocalAuth } from "@core/model/local-auth";

export function AuthShell() {
  const navigate = useNavigate();
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
  const currentUser = StorageService.load(AUTH) as LocalAuth;
  const handleLogout = () => {
    StorageService.clear(AUTH);
    navigate("/login");
  };

  return (
    <div className="auth-shell">
      <section className="flex ">
        <Sidebar
          title="GSO Tracker"
          logo="/icon-152x152.png"
          logoWidth="w-12"
          username={
            currentUser.person_first_name + " " + currentUser.person_last_name
          }
          email={currentUser.person_email}
          onLogout={handleLogout}
        >
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
      </section>
    </div>
  );
}

export default AuthShell;
