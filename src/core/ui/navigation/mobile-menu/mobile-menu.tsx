import { useState } from "react";
import "./mobile-menu";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { NavigationProps } from "../navigation.interface";

export interface MobileMenuProps {
  className?: string;
  menus: NavigationProps[];
}

export function MobileMenu({ className, menus }: MobileMenuProps) {
  const [active, setActive] = useState(0);
  const itemCount = menus.length;
  return (
    <div
      className={classNames(
        "absolute bottom-0 bg-white px-6 rounded-t-xl w-full",
        className
      )}
    >

      <div className="flex w-full justify-center">
        <ul className="flex relative">
          {menus.map((menu, i) => (
            <li key={i} className={classNames('w-16 mx-1', itemCount <= 4 ? 'w-20' : 'w-16' )}>
              <NavLink
                className="flex flex-col text-center pt-4"
                onClick={() => setActive(i)}
                to={""}
              >
                <span
                  className={`text-xl cursor-pointer duration-500 text-black z-50`}
                >
                  <i
                    className={classNames(
                      "pi",
                      menu.icon,
                      active === i ? " text-green-600" : "text-gray-500"
                    )}
                  ></i>
                </span>
                <span
                  className={classNames(
                    `duration-700 opacity-100 mb-4`,
                    active === i ? " text-green-600" : "text-gray-500"
                  )}
                >
                  {menu.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MobileMenu;
