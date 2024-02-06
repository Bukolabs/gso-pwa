import { Button } from "primereact/button";
import "./view-selection.scss";

export interface ViewSelectionProps {
  onTableView: () => void;
  onCardView: () => void;
}

export function ViewSelection({ onTableView, onCardView }: ViewSelectionProps) {
  return (
    <div className="view-selection">
      <div className="float-right">
        <span className="p-buttonset">
          <Button
            outlined={true}
            severity="secondary"
            size="small"
            icon="pi pi-table"
            onClick={onTableView}
          />
          <Button
            outlined={true}
            severity="secondary"
            size="small"
            icon="pi pi-id-card"
            onClick={onCardView}
          />
        </span>
      </div>
    </div>
  );
}

export default ViewSelection;
