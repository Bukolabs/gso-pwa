import { GetPurchaseOrderDto } from "@api/api";
import "./print-order.scss";
import classNames from "classnames";
import { dateFormat } from "@shared/formats/date-time-format";

export interface PrintOrderProps {
  data: GetPurchaseOrderDto | undefined;
}

export function PrintOrder({ data }: PrintOrderProps) {
  const logo = "/tagbilaran-logo.png";

  return (
    <div className="print-order">
      <header className="flex w-full my-4 justify-between">
        <div className="relative top-0 mx-4">
          <small className="block">City Government of Tagbilaran</small>
          <small className="block">Standard Form Number: xx-xxxx-xx</small>
          <small className="block">Revised on: xx/xx/xxxx</small>
          <small className="block">Standard Form Title: Purchase Order</small>
        </div>
        <div className="mx-4">
          <small className="w-20 whitespace-nowrap block">
            Resolution No: {data?.resolution_no}
          </small>
          <small className="w-20">Procurement of Goods</small>
        </div>
      </header>

      <header className="flex w-full my-4 justify-between">
        <div className="relative top-0 mx-4">
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
        <div className="mx-4"></div>
      </header>

      <section className="grid grid-cols-2 grid-rows-1 gap-4 mb-6">
        <div>
          <span className="flex items-center gap-2">
            <label>Supplier: </label>
            <h4
              className={classNames(
                "block relative top-[1px] font-bold border-b border-black w-full",
                !data?.supplier && "top-[10px]"
              )}
            >
              {data?.supplier}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label>Address: </label>
            <h4
              className={classNames(
                "block relative top-[1px] font-bold border-b border-black w-full",
                !data?.address && "top-[10px]"
              )}
            >
              {data?.address}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label className="whitespace-nowrap">E-mail Address: </label>
            <h4
              className={classNames(
                "block relative top-[1px] font-bold border-b border-black w-full",
                !data?.email && "top-[10px]"
              )}
            >
              {data?.email}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label className="whitespace-nowrap">Telephone No.: </label>
            <h4
              className={classNames(
                "block relative top-[1px] font-bold border-b border-black w-full",
                !data?.contact_no && "top-[10px]"
              )}
            >
              {data?.contact_no}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label>T.I.N: </label>
            <h4
              className={classNames(
                "block relative top-[1px] font-bold border-b border-black w-full",
                !data?.tin && "top-[10px]"
              )}
            >
              {data?.tin}
            </h4>
          </span>
        </div>
        <div className="ml-16">
          <span className="flex items-center gap-2">
            <label className="whitespace-nowrap">P.O. No.: </label>
            <h4
              className={classNames(
                "block relative top-[1px] font-bold border-b border-black w-full",
                !data?.po_no && "top-[10px]"
              )}
            >
              {data?.po_no}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label>Date: </label>
            <h4
              className={classNames(
                "block relative top-[1px] font-bold border-b border-black w-full",
                !data?.po_date && "top-[10px]"
              )}
            >
              {dateFormat(data?.po_date)}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label className="whitespace-nowrap">Mode of Procurement: </label>
            <span
              className={classNames(
                "block relative top-[1px] font-bold border-b border-black w-full",
                !data?.mode_of_procurement && "top-[10px]"
              )}
            >
              <p>{data?.mode_of_procurement}</p>
            </span>
          </span>
          <span className="flex items-center gap-2">
            <label className="whitespace-nowrap">P.R. No.: </label>
            <span
              className={classNames(
                "block relative top-[1px] font-bold border-b border-black w-full",
                (data?.purchase_requests || []).length <= 0 && "top-[10px]"
              )}
            >
              {data?.purchase_requests?.map((x) => (
                <p key={x.code}>{x.pr_no}</p>
              ))}
            </span>
          </span>
        </div>
      </section>

      <section className="mb-2 border-t border-b border-t-gray-600 border-b-gray-600">
        <p className="pl-10 pb-6">Gentlemen:</p>
      </section>

      <section className="grid grid-cols-2 grid-rows-1 gap-4 mb-6">
        <div>
          <span className="flex items-center gap-2">
            <label className="whitespace-nowrap">Place of Delivery: </label>
            <h4
              className={classNames(
                "block relative top-[1px] font-bold border-b border-black w-full",
                !data?.delivery_location && "top-[10px]"
              )}
            >
              {data?.delivery_location}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label className="whitespace-nowrap">Date of Delivery: </label>
            <h4
              className={classNames(
                "block relative top-[1px] font-bold border-b border-black w-full",
                !data?.delivery_date && "top-[10px]"
              )}
            >
              {dateFormat(data?.delivery_date)}
            </h4>
          </span>
        </div>
        <div className="ml-16">
          <span className="flex items-center gap-2">
            <label className="whitespace-nowrap">Delivery Term: </label>
            <h4
              className={classNames(
                "block relative top-[1px] font-bold border-b border-black w-full",
                !data?.delivery_term && "top-[10px]"
              )}
            >
              {data?.delivery_term}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label className="whitespace-nowrap">Payment Term: </label>
            <h4
              className={classNames(
                "block relative top-[1px] font-bold border-b border-black w-full",
                !data?.payment_term && "top-[10px]"
              )}
            >
              {data?.payment_term}
            </h4>
          </span>
        </div>
      </section>
    </div>
  );
}

export default PrintOrder;
