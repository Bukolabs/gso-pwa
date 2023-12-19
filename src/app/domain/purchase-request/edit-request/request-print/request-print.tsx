import { GetPurchaseRequestDto } from "@api/api";
import "./request-print";

export interface RequestPrintProps {
  data: GetPurchaseRequestDto | undefined;
}

export function RequestPrint({ data }: RequestPrintProps) {
  const logo = "/icon-152x152.png";
  return (
    <div className="request-print">
      <section className="flex flex-col items-center gap-2">
        <section className="flex items-center gap-3">
          <img
            src={logo}
            className="w-16 h-16"
            alt="city of tagbilaran official seal"
          />
          <h1>Purchase Request</h1>
        </section>
        <section className="flex flex-col items-center mt-4">
          <h3 className="underline">CITY GOVERNMENT OF TAGBILARAN</h3>
          <h3 className="font-bold">{data?.department_name}</h3>
        </section>
      </section>
      <section></section>
    </div>
  );
}

export default RequestPrint;
