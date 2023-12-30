import { Outlet } from "react-router-dom";
import "./main-shell";
import { Toast } from "primereact/toast";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { ProgressBar } from "primereact/progressbar";

export function MainShell() {
  const { progress, toastRef } = useNotificationContext();

  return (
    <div className="main-shell">
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

      <Outlet />
    </div>
  );
}

export default MainShell;
