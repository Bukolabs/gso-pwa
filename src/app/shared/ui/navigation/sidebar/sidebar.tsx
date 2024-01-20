import { ReactNode, createContext, useState } from "react";
import "./sidebar";
import classNames from "classnames";

export const SidebarContext = createContext({ expanded: false });

export interface SidebarProps {
  children: ReactNode;
  title: string;
  logo: string;
  logoClass?: string;
  logoWidth?: string;
  icon?: string;
  className?: string;
  username?: string;
  userSubname?: string;
  userInfo?: string;
  onLogout?: () => void;
}

export function Sidebar({
  children,
  className,
  title,
  logo = "https://img.logoipsum.com/243.svg",
  logoWidth = "w-36",
  logoClass,
  username,
  userSubname,
  userInfo,
  onLogout,
}: SidebarProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={classNames(
        "h-screen hidden md:flex",
        expanded ? "w-[300px]" : "w-[68px]",
        className
      )}
    >
      <nav
        className={classNames(
          "fixed h-full flex flex-col bg-white border-r shadow-sm"
        )}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className={classNames("flex items-center gap-2")}>
            <img
              src={logo}
              className={classNames(
                `overflow-hidden transition-all`,
                expanded ? logoWidth : "w-0",
                logoClass
              )}
              alt={title}
            />
            <span className={classNames(expanded ? "visible" : "hidden")}>
              {title}
            </span>
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? (
              <i className="pi pi-angle-left"></i>
            ) : (
              <i className="pi pi-angle-right"></i>
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-5 mt-5">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 items-center">
          <span
            className="p-3 cursor-pointer hover:bg-gray-200 rounded"
            onClick={() => {
              if (onLogout) {
                onLogout();
              }
            }}
          >
            <i className="pi pi-power-off"></i>
          </span>
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4 text-left">
              {username && <h4 className="font-semibold">{username}</h4>}
              {userSubname && (
                <span className="text-sm text-gray-800">{userSubname}</span>
              )}
              {userInfo && (
                <span className="text-xs text-gray-400 block">{userInfo}</span>
              )}
            </div>
            {/* <i className="pi pi-ellipsis-v"></i> */}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
