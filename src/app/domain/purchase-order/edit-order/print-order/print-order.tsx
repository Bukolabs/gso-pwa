import { GetPurchaseOrderDto } from "@api/api";
import "./print-order.scss";

export interface PrintOrderProps {
  data: GetPurchaseOrderDto | undefined;
}

export function PrintOrder({ data }: PrintOrderProps) {
  const logo = "/tagbilaran-logo.png";

  return (
    <div className="print-order">
      <header className="flex w-full my-4">
        <div className="relative top-0 mx-4">
          <small className="block">City Government of Tagbilaran</small>
          <small className="block">Standard Form Number: xx-xxxx-xx</small>
          <small className="block">Revised on: xx/xx/xxxx</small>
          <small className="block">Standard Form Title: Purchase Order</small>
          <img
            src={logo}
            className="w-28"
            alt="city of tagbilaran official seal"
          />
        </div>
        <div className="flex flex-col items-center w-full">
          <h1 className="mb-5">Purchase Order</h1>
          <small className="underline">CITY GOVERNMENT OF TAGBILARAN</small>
          <small className="font-bold">Agency / Procuring Entity</small>
        </div>
        <div className="mx-4">
          <p className="w-20">Resolution No: xxx</p>
          <p className="w-20">Procurement of Goods</p>
        </div>
      </header>
    </div>
  );
}

export default PrintOrder;
