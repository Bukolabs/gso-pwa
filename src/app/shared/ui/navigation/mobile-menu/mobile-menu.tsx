import { useState } from "react";
import "./mobile-menu";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { NavigationProps } from "../navigation.interface";
import { Sidebar } from "primereact/sidebar";
import NavItem from "./nav-item/nav-item";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";

export interface MobileMenuProps {
  className?: string;
  menus: NavigationProps[];
  more: MenuItem[];
}

export function MobileMenu({ className, menus, more }: MobileMenuProps) {
  const itemCount = menus.length;
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={classNames(
        "fixed bottom-0 bg-white px-6 rounded-t-xl w-full z-[999]",
        className
      )}
    >
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <h2 className="mb-4">More Menu</h2>
        <Menu model={more} className="w-full" />
      </Sidebar>
      <div className="flex w-full justify-center">
        <ul className="flex relative">
          {menus.map((menu, i) => {
            if (menu.isMore) {
              return (
                <li
                  key={i}
                  className={classNames(
                    "w-16 mx-1",
                    itemCount <= 4 ? "w-20" : "w-16"
                  )}
                >
                  <span
                    className="flex flex-col text-center pt-4"
                    onClick={() => setVisible(true)}
                  >
                    <span
                      className={`text-xl cursor-pointer duration-500 text-black z-50`}
                    >
                      <i
                        className={classNames("pi", menu.icon, "text-gray-800")}
                      ></i>
                    </span>
                    <span
                      className={classNames(
                        `duration-700 opacity-100 mb-4`,
                        "text-gray-800"
                      )}
                    >
                      {menu.title}
                    </span>
                  </span>
                </li>
              );
            } else {
              return (
                <li
                  key={i}
                  className={classNames(
                    "w-16 mx-1",
                    itemCount <= 4 ? "w-20" : "w-16"
                  )}
                >
                  <NavItem {...menu} />
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default MobileMenu;
