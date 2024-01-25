import { Outlet, useNavigate } from "react-router-dom";
import "./auth-shell";
import {
  accountNav,
  homeNav,
  itemNav,
  logoutNav,
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
import { useGetStatusQy } from "@core/query/status.query";
import { useGetAccountQy } from "@core/query/account.query";

export function AuthShell() {
  const navigate = useNavigate();
  const { isRequestor, isAdmin, currentUser } = useUserIdentity();

  const getDesktopNavigation = () => {
    if (isRequestor) {
      return [requestNav];
    } else if (isAdmin) {
      return [homeNav, requestNav, orderNav, itemNav, accountNav];
    } else {
      return [homeNav, requestNav, orderNav, itemNav];
    }
  };
  const getMobileNavigation = () => {
    if (isRequestor) {
      return [requestNav, logoutNav];
    } else {
      return [homeNav, requestNav, orderNav, moreNav] as NavigationProps[];
    }
  };
  const getMobileMoreNavigation = () => {
    if (isAdmin) {
      return [
        {
          label: "Item",
          command: () => {
            navigate("/item");
          },
        },
        {
          label: "Account",
          command: () => {
            navigate("/account");
          },
        },
        {
          label: "Logout",
          command: () => {
            navigate("/login");
          },
        },
      ];
    } else {
      return [
        {
          label: "Account",
          command: () => {
            navigate("/account");
          },
        },
        {
          label: "Logout",
          command: () => {
            navigate("/login");
          },
        },
      ];
    }
  };

  useGetStatusQy();
  useGetAccountQy("", 9999999, 0);

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
          {getDesktopNavigation().map((item, id) => (
            <SidebarItem key={id} {...item} />
          ))}
        </Sidebar>
        <MobileMenu
          className="flex md:hidden"
          menus={getMobileNavigation()}
          more={getMobileMoreNavigation()}
        />
        <div className="h-screen flex-1">
          <Outlet />
        </div>
      </section>
    </div>
  );
}

export default AuthShell;
