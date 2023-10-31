import React from "react";

import Sidebar from "./core/ui/sidebar/sidebar";
import SidebarItem from "./core/ui/sidebar/sidebar-item/sidebar-item";
import { BarChart3, Boxes, LayoutDashboard } from "lucide-react";
import { Button } from "primereact/button";
import { PrimeReactProvider } from "primereact/api";

function App() {
  return (
    <PrimeReactProvider>
      <div className="flex">
        <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            alert
          />
          <SidebarItem
            icon={<BarChart3 size={20} />}
            text="Statistics"
            active
          />
          <SidebarItem icon={<Boxes size={20} />} text="Inventory" />
        </Sidebar>
        <div className="h-screen flex-1 p-7">
          <h1 className="text-2xl font-semibold ">Home Page</h1>

          <Button icon="pi pi-check" />
          <Button label="Submit" icon="pi pi-check" />
          <Button label="Submit" icon="pi pi-check" iconPos="right" />
        </div>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
