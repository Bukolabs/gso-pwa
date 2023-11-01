import { ReactNode, createContext, useState } from "react";
import "./sidebar";
import classNames from "classnames";

export const SidebarContext = createContext({ expanded: false });

export interface SidebarProps {
  children: ReactNode;
  icon?: string;
  className?: string;
}

export function Sidebar({ children, className }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav
        className={classNames(
          "h-full flex flex-col bg-white border-r shadow-sm",
          expanded ? "w-[300px]" : "w-[68px]",
          className
        )}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={classNames(
              `overflow-hidden transition-all`,
              expanded ? "w-32" : "w-0"
            )}
            alt=""
          />
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
          <ul className="flex-1 px-3 mt-5">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4 text-left">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            {/* <i className="pi pi-ellipsis-v"></i> */}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
