import { Outlet, useNavigate } from "react-router-dom";
import "./auth-shell";
import {
  accountNav,
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
import { useUserIdentity } from "@core/utility/user-identity.hook";

export function AuthShell() {
  const navigate = useNavigate();
  const { isRequestor, currentUser } = useUserIdentity();
  const desktopNavigation = isRequestor
    ? [homeNav, requestNav]
    : ([
        homeNav,
        requestNav,
        orderNav,
        itemNav,
        accountNav,
      ] as NavigationProps[]);
  const mobileNavigation = isRequestor
    ? [homeNav, requestNav, moreNav]
    : ([homeNav, requestNav, orderNav, moreNav] as NavigationProps[]);

  const mobileAllItem = [
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
  const mobileLogoutItem = {
    label: "Logout",
    command: () => {
      navigate("/login");
    },
  };
  const mobileMoreNavigation = isRequestor
    ? [mobileLogoutItem]
    : [...mobileAllItem, mobileLogoutItem];
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
          userSubname={currentUser.role_description}
          userInfo={currentUser.department_name}
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
