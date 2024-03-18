import QRCode from "react-qr-code";
import "./print-inventory-qr.scss";

export interface PrintInventoryQrProps {
  code: string;
}

export function PrintInventoryQr({ code }: PrintInventoryQrProps) {
  return (
    <div className="print-inventory-qr">
      <section className="flex flex-col items-center justify-center">
        <QRCode value={code} />
        <h3>Inventory Code</h3>
      </section>
    </div>
  );
}

export default PrintInventoryQr;
