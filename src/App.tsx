import React, { useState } from "react";
import logo from "./logo.svg";
import "./app.css";
import Sidebar from "./core/ui/sidebar/sidebar";
import SidebarItem from "./core/ui/sidebar/sidebar-item/sidebar-item";
import { BarChart3, Boxes, LayoutDashboard } from "lucide-react";

function App() {
  const [source, setSource] = useState("");

  const handleCapture = (target: any) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    }
  };

  return (
    <div className="App">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          alert
        />
        <SidebarItem icon={<BarChart3 size={20} />} text="Statistics" active />
        <SidebarItem icon={<Boxes size={20} />} text="Inventory" />
      </Sidebar>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to GSO Super App</p>

        {source && (
          <div>
            <img src={source} alt={"snap"}></img>
          </div>
        )}

        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          capture="environment"
          onChange={(e) => handleCapture(e.target)}
        />
        <label htmlFor="icon-button-file">
          <button color="primary" aria-label="upload picture">
            Snap
          </button>
        </label>
      </header> */}
    </div>
  );
}

export default App;
