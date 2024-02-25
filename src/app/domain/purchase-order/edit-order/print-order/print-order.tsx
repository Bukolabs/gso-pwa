import { GetPurchaseOrderDto } from "@api/api";
import "./print-order.scss";
import classNames from "classnames";
import { dateFormat } from "@shared/formats/date-time-format";
import {
  currencyTemplate,
  numberTemplate,
} from "@core/utility/data-table-template";
import { twoDigit } from "@core/utility/number-helper";
import { getOverallAmount } from "@core/utility/order-helper";
import { numberToWords } from "@shared/formats/number-to-words";
import QRCode from "react-qr-code";

export interface PrintOrderProps {
  data: GetPurchaseOrderDto | undefined;
}

export function PrintOrder({ data }: PrintOrderProps) {
  const logo = "/tagbilaran-logo.png";
  const overallTotal = data !== undefined ? getOverallAmount(data) : 0;
  const prNumbers = data?.purchase_requests?.map((x) => x.pr_no).join(",");
  let rowCounter = 0;

  const itemDisplay = (title: string, description: string) => {
    return (
      <span>
        <label className="font-bold">{title}</label>{" "}
        <div>
          <pre className="w-full whitespace-pre-wrap">{description}</pre>
        </div>
      </span>
    );
  };
  const qrCode = `POCODE-${data?.code}`;

  return (
    <div className="print-order mx-8">
      <section className="h-screen flex flex-col justify-center items-center">
        <QRCode value={qrCode} />
        <label className="text-gray-500 mt-2">
          Scan to receive purchase order:
        </label>
        <label className="text-gray-500 mt-2 font-bold">
          PO#: {data?.po_no}
        </label>
      </section>

      <section className="mx-8">
        <header className="flex w-full my-4 justify-between">
          <div className="relative top-0 mx-4">
            <span className="print-normal block mb-4">
              City Government of Tagbilaran
            </span>
            <span className="print-normal block">
              Standard Form Number: SF-GOODS-58
            </span>
            <span className="print-normal block">Revised on: May 24, 2004</span>
            <span className="print-normal block">
              Standard Form Title: Purchase Order
            </span>
          </div>
          <div className="mx-4">
            <small className="w-20 print-normal whitespace-nowrap block">
              Resolution No: {data?.resolution_no}
            </small>
            <small className="w-20 print-normal">Procurement of Goods</small>
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
            <p className="mb-5 print-header">Purchase Order</p>
            <small className="underline print-normal">
              CITY GOVERNMENT OF TAGBILARAN
            </small>
            <small className="font-bold print-normal">
              Agency / Procuring Entity
            </small>
          </div>
          <div className="mx-4"></div>
        </header>

        <section className="grid grid-cols-2 grid-rows-1 gap-4 mb-4">
          <div>
            <span className="flex items-center gap-2">
              <label className="print-normal">Supplier: </label>
              <h4
                className={classNames(
                  "print-normal block relative font-bold border-b border-black w-full",
                  data?.supplier ? "top-[1px]" : "top-[10px]"
                )}
              >
                {data?.supplier}
              </h4>
            </span>
            <span className="flex items-center gap-2">
              <label className="print-normal">Address: </label>
              <h4
                className={classNames(
                  "print-normal block relative font-bold border-b border-black w-full",
                  data?.address ? "top-[1px]" : "top-[10px]"
                )}
              >
                {data?.address}
              </h4>
            </span>
            <span className="flex items-center gap-2">
              <label className="print-normal whitespace-nowrap">
                E-mail Address:{" "}
              </label>
              <h4
                className={classNames(
                  "print-normal block relative font-bold border-b border-black w-full",
                  data?.email ? "top-[1px]" : "top-[10px]"
                )}
              >
                {data?.email}
              </h4>
            </span>
            <span className="flex items-center gap-2">
              <label className="print-normal whitespace-nowrap">
                Telephone No.:{" "}
              </label>
              <h4
                className={classNames(
                  "print-normal block relative font-bold border-b border-black w-full",
                  data?.contact_no ? "top-[1px]" : "top-[10px]"
                )}
              >
                {data?.contact_no}
              </h4>
            </span>
            <span className="flex items-center gap-2">
              <label className="print-normal">T.I.N: </label>
              <h4
                className={classNames(
                  "print-normal block relative font-bold border-b border-black w-full",
                  data?.tin ? "top-[1px]" : "top-[10px]"
                )}
              >
                {data?.tin}
              </h4>
            </span>
          </div>
          <div className="ml-16">
            <span className="flex items-center gap-2">
              <label className="whitespace-nowrap print-normal">
                P.O. No.:{" "}
              </label>
              <h4
                className={classNames(
                  "print-normal block relative font-bold border-b border-black w-full",
                  data?.po_no ? "top-[1px]" : "top-[10px]"
                )}
              >
                {data?.po_no}
              </h4>
            </span>
            <span className="flex items-center gap-2">
              <label className="print-normal">Date: </label>
              <h4
                className={classNames(
                  "print-normal block relative font-bold border-b border-black w-full",
                  data?.po_date ? "top-[1px]" : "top-[10px]"
                )}
              >
                {dateFormat(data?.po_date)}
              </h4>
            </span>
            <span className="flex items-center gap-2">
              <label className="print-normal whitespace-nowrap">
                Mode of Procurement:{" "}
              </label>
              <span
                className={classNames(
                  "print-normal block relative font-bold border-b border-black w-full",
                  data?.mode_of_procurement ? "top-[1px]" : "top-[10px]"
                )}
              >
                {data?.mode_of_procurement}
              </span>
            </span>
            <span className="flex items-center gap-2">
              <label className="print-normal whitespace-nowrap">
                P.R. No.:{" "}
              </label>
              <span
                className={classNames(
                  "print-normal block relative font-bold border-b border-black w-full",
                  (data?.purchase_requests || []).length > 0
                    ? "top-[1px]"
                    : "top-[12px]"
                )}
              >
                {prNumbers}
              </span>
            </span>
          </div>
        </section>

        <section className="border-t border-b border-t-gray-600 border-b-gray-600">
          <p className="print-normal pl-10 py-3">Gentlemen:</p>
        </section>

        <section className="grid grid-cols-2 grid-rows-1 gap-4 mb-6">
          <div>
            <span className="flex items-center gap-2">
              <label className="print-normal whitespace-nowrap">
                Place of Delivery:{" "}
              </label>
              <h4
                className={classNames(
                  "print-normal block relative font-bold border-b border-black w-full",
                  data?.delivery_location ? "top-[1px]" : "top-[10px]"
                )}
              >
                {data?.delivery_location}
              </h4>
            </span>
            <span className="flex items-center gap-2">
              <label className="print-normal whitespace-nowrap">
                Date of Delivery:{" "}
              </label>
              <h4
                className={classNames(
                  "print-normal block relative font-bold border-b border-black w-full",
                  data?.delivery_date ? "top-[1px]" : "top-[10px]"
                )}
              >
                {dateFormat(data?.delivery_date)}
              </h4>
            </span>
          </div>
          <div className="ml-16">
            <span className="flex items-center gap-2">
              <label className="print-normal whitespace-nowrap">
                Delivery Term:{" "}
              </label>
              <h4
                className={classNames(
                  "print-normal block relative font-bold border-b border-black w-full",
                  data?.delivery_term ? "top-[1px]" : "top-[10px]"
                )}
              >
                {data?.delivery_term}
              </h4>
            </span>
            <span className="flex items-center gap-2">
              <label className="print-normal whitespace-nowrap">
                Payment Term:{" "}
              </label>
              <h4
                className={classNames(
                  "print-normal block relative font-bold border-b border-black w-full",
                  data?.payment_term ? "top-[1px]" : "top-[10px]"
                )}
              >
                {data?.payment_term}
              </h4>
            </span>
          </div>
        </section>

        <section>
          <table className="print-table w-full text-sm text-left rtl:text-right text-gray-500 border-t-2 border-b-2 border-l-2 border-r-2">
            <tbody className="border-t border-b border-l-0 border-r-0">
              <tr>
                <th className="print-normal px-2 py-1 border bg-gray-50 w-20">
                  Item No.
                </th>
                <th className="print-normal px-2 py-1 border bg-gray-50">
                  Unit
                </th>
                <th className="print-normal px-2 py-1 border bg-gray-50">
                  Description
                </th>
                <th className="print-normal px-2 py-1 border bg-gray-50">
                  Quantity
                </th>
                <th className="print-normal px-2 py-1 border bg-gray-50">
                  Unit Cost
                </th>
                <th className="print-normal px-2 py-1 border bg-gray-50">
                  Total Cost
                </th>
              </tr>
              {(data?.purchase_requests || [])?.map((request, idx) =>
                request.items?.map((item, id) => {
                  rowCounter++;
                  return (
                    <tr
                      key={id}
                      className="border-t border-b border-l-0 border-r-0"
                    >
                      <td className="print-normal px-2 py-1 border bg-gray-50">
                        {twoDigit(rowCounter)}
                      </td>
                      <td className="print-normal px-2 py-1 border bg-gray-50">
                        {item.unit_name}
                      </td>
                      <td className="print-normal px-2 py-1 border bg-gray-50">
                        {itemDisplay(item.item_name, item.description || "")}
                      </td>
                      <td className="print-normal px-2 py-1 border bg-gray-50">
                        {numberTemplate(item.quantity)}
                      </td>
                      <td className="print-normal px-2 py-1 border bg-gray-50">
                        {currencyTemplate(item.price)}
                      </td>
                      <td className="print-normal px-2 py-1 border bg-gray-50">
                        {currencyTemplate(item.price * item.quantity)}
                      </td>
                    </tr>
                  );
                })
              )}
              <tr>
                <td className="border bg-gray-50" colSpan={2}>
                  <small className="print-normal w-full flex justify-center">
                    Total amount in words:
                  </small>
                </td>
                <td className="print-normal border bg-gray-50" colSpan={2}>
                  **{numberToWords(overallTotal)}**
                </td>
                <td className="print-normal px-2 py-1 border bg-gray-50">
                  Total:
                </td>
                <td className="print-normal px-2 py-1 border bg-gray-50">
                  {currencyTemplate(overallTotal)}
                </td>
              </tr>
              <tr>
                <td className="border px-2 pt-4 pb-1 bg-gray-50" colSpan={6}>
                  <span className="print-normal">
                    In case of failure to make the full delivery within the time
                    specified above, a penalty of one-tenth (/10) of one (1)
                    percent for every day of delay shall be imposed.
                  </span>
                  <section className="grid grid-cols-2 grid-rows-1 gap-4 py-1">
                    <div>
                      <small className="print-normal block mb-5">
                        Conforme:
                      </small>
                      <div className="flex flex-col items-center justify-center">
                        <div className="font-bold text-sm">
                          {data?.supplier}
                        </div>
                        <small
                          className={classNames(
                            "print-normal block relative top-[1px] border-t border-black w-3/4 text-center"
                          )}
                        >
                          Signature over printed name of Supplier
                        </small>
                        <small
                          className={classNames(
                            "print-normal mt-6 block relative top-[1px] border-t border-black w-2/4 text-center"
                          )}
                        >
                          Date
                        </small>
                      </div>
                    </div>
                    <div>
                      <small className="print-normal block mb-5">
                        Very truly yours:
                      </small>
                      <div className="flex flex-col items-center justify-center">
                        <div className="print-normal font-bold text-sm">
                          JANE CENSORIA C. YAP
                        </div>
                        <small
                          className={classNames(
                            "print-normal block relative top-[1px] border-t border-black w-3/4 text-center"
                          )}
                        >
                          CITY MAYOR
                        </small>
                      </div>
                    </div>
                  </section>
                </td>
              </tr>
              <tr>
                <td className="border px-2 py-1 bg-gray-50" colSpan={6}>
                  <section className="grid grid-cols-2 grid-rows-1 gap-4 py-1">
                    <div>
                      <small className="print-normal block mb-14">
                        Funds Available:
                      </small>
                      <div className="flex flex-col items-center justify-center">
                        <div className="print-normal font-bold text-sm">
                          HUBERT M. INAS
                        </div>
                        <small
                          className={classNames(
                            "print-normal block relative top-[1px] border-t border-black w-3/4 text-center"
                          )}
                        >
                          CITY TREASURER
                        </small>
                      </div>
                    </div>
                    <div>
                      <section>
                        <span className="mb-4 float-left">OR:</span>
                        <span
                          className={classNames(
                            "print-normal ml-8 block relative border-b border-black w-3/4 top-[20px]"
                          )}
                        ></span>
                      </section>
                      <div className="clear-both"></div>
                      <section>
                        <span className="print-normal mb-4 float-left">
                          AMOUNT:
                        </span>
                        <span className="print-normal ml-4 text-gray-600">
                          P
                        </span>
                      </section>
                    </div>
                  </section>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    </div>
  );
}

export default PrintOrder;
