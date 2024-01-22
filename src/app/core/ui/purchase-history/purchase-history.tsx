import { Timeline } from "primereact/timeline";
import "./purchase-history.scss";
import { Card } from "primereact/card";
import { tagTemplate } from "@core/utility/data-table-template";
import { LabelValue } from "@shared/models/label-value.interface";
import { Avatar } from "primereact/avatar";

export interface PurchaseHistoryModel {
  date: string;
  actor: string;
  actorRole: string;
  actorDepartment: string;
  status: string;
  reviewer: LabelValue[];
  remarks: string;
}
export interface PurchaseHistoryProps {
  data: PurchaseHistoryModel[];
}

export function PurchaseHistory({ data }: PurchaseHistoryProps) {
  const customizedContent = (item: PurchaseHistoryModel) => {
    return (
      <Card className="block my-4">
        {tagTemplate(item.status)}

        <div className="flex gap-2 mt-2">
          {item.reviewer.map((item, id) => (
            <section key={id} className="flex flex-col items-center">
              <Avatar shape="circle" icon={item.value} />
              <label className="text-gray-500">{item.label}</label>
            </section>
          ))}
        </div>

        <span className="flex flex-col my-2">
          <span className="font-bold text-sm">{item.remarks || '-'}</span>
          <label className="hint">Remarks</label>
        </span>
        <span className="flex flex-col my-2">
          <span className="font-bold text-sm">{item.date}</span>
          <label className="hint">Date Updated</label>
        </span>
        <span className="flex flex-col my-2">
          <span className="font-bold text-sm">{item.actor}</span>
          <label className="hint">Performed By</label>
        </span>
        <span className="flex flex-col my-2">
          <span className="font-bold text-sm">{item.actorDepartment}</span>
          <label className="hint">Department</label>
        </span>
        <span className="flex flex-col my-2">
          <span className="font-bold text-sm">{item.actorRole}</span>
          <label className="hint">Role</label>
        </span>
      </Card>
    );
  };

  return (
    <div className="purchase-history">
      <h1 className="text-center mb-4">Historical Timeline</h1>

      <Timeline
        value={data}
        align="left"
        className="customized-timeline"
        content={customizedContent}
      />
    </div>
  );
}

export default PurchaseHistory;
