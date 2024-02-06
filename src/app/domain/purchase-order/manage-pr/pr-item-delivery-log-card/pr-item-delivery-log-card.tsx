import { Button } from "primereact/button";
import "./pr-item-delivery-log-card.scss";
import { GetPIDDto } from "@api/api";
import { SETTINGS } from "@core/utility/settings";
import { sumBy } from "lodash-es";
import { format } from "date-fns";
import { SplitButton } from "primereact/splitbutton";

export interface PrItemDeliveryLogCardProps {
  data: GetPIDDto;
  onPrint: (batch: GetPIDDto) => void;
  onDelete: (batch: GetPIDDto) => void;
}

export function PrItemDeliveryLogCard({
  data,
  onPrint,
  onDelete,
}: PrItemDeliveryLogCardProps) {
  const totalQuantity = sumBy(data.delivery || [], (x) => x.quantity);
  const date = data?.updated_at
    ? (format(new Date(data?.updated_at), SETTINGS.dateTimeFormat) as any)
    : "";
  const getSplitButtonItems = () => [
    {
      label: 'Delete',
      command: () => {
        onDelete(data);
      },
    },
  ];

  return (
    <div className="pr-item-delivery-log-card">
      <div className="flex flex-wrap items-center border border-gray-100 rounded">
        <section className="flex flex-col justify-between gap-3 w-full p-2">
          <section className="flex justify-between gap-3">
            <SplitButton
              label="Print"
              onClick={() => onPrint(data)}
              model={getSplitButtonItems()}
              outlined
            />
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-800 font-bold">{date}</p>
              <p className="hint">Date</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-800 font-bold">{totalQuantity}</p>
              <p className="hint">Quantity</p>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}

export default PrItemDeliveryLogCard;
