import { useEditMonitor } from "./edit-monitor.hook";
import "./edit-monitor.scss";

export function EditMonitor() {
  useEditMonitor();
  return (
    <div className="edit-monitor">
      <h1>Welcome to, EditMonitor</h1>
    </div>
  );
}

export default EditMonitor;
