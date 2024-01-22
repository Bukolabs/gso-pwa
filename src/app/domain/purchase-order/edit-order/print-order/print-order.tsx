import { GetPurchaseOrderDto } from "@api/api";
import "./print-order.scss";
import classNames from "classnames";
import { dateFormat } from "@shared/formats/date-time-format";
import {
  currencyTemplate,
  numberTemplate,
} from "@core/utility/data-table-template";
import { twoDigit } from "@core/utility/number-helper";
import { getOverallTotalAmount } from "@core/utility/order-helper";
import { numberToWords } from "@shared/formats/number-to-words";

export interface PrintOrderProps {
  data: GetPurchaseOrderDto | undefined;
}

export function PrintOrder({ data }: PrintOrderProps) {
  const logo = "/tagbilaran-logo.png";
  const overallTotal = data !== undefined ? getOverallTotalAmount(data) : 0;
  const prNumbers = data?.purchase_requests?.map((x) => x.pr_no).join(",");

  const itemDisplay = (title: string, description: string) => {
    return (
      <span>
        <label className="font-bold">{title}</label>
        <small className="block">{description}</small>
      </span>
    );
  };

  return (
    <div className="print-order mx-8">
      <header className="flex w-full my-4 justify-between">
        <div className="relative top-0 mx-4">
          <span className="text-sm block mb-4">
            City Government of Tagbilaran
          </span>
          <span className="text-sm block">
            Standard Form Number: SF-GOODS-58
          </span>
          <span className="text-sm block">Revised on: May 24, 2004</span>
          <span className="text-sm block">
            Standard Form Title: Purchase Order
          </span>
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
                "block relative font-bold border-b border-black w-full",
                data?.supplier ? "top-[1px]" : "top-[10px]"
              )}
            >
              {data?.supplier}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label>Address: </label>
            <h4
              className={classNames(
                "block relative font-bold border-b border-black w-full",
                data?.address ? "top-[1px]" : "top-[10px]"
              )}
            >
              {data?.address}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label className="whitespace-nowrap">E-mail Address: </label>
            <h4
              className={classNames(
                "block relative font-bold border-b border-black w-full",
                data?.email ? "top-[1px]" : "top-[10px]"
              )}
            >
              {data?.email}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label className="whitespace-nowrap">Telephone No.: </label>
            <h4
              className={classNames(
                "block relative font-bold border-b border-black w-full",
                data?.contact_no ? "top-[1px]" : "top-[10px]"
              )}
            >
              {data?.contact_no}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label>T.I.N: </label>
            <h4
              className={classNames(
                "block relative font-bold border-b border-black w-full",
                data?.tin ? "top-[1px]" : "top-[10px]"
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
                "block relative font-bold border-b border-black w-full",
                data?.po_no ? "top-[1px]" : "top-[10px]"
              )}
            >
              {data?.po_no}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label>Date: </label>
            <h4
              className={classNames(
                "block relative font-bold border-b border-black w-full",
                data?.po_date ? "top-[1px]" : "top-[10px]"
              )}
            >
              {dateFormat(data?.po_date)}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label className="whitespace-nowrap">Mode of Procurement: </label>
            <span
              className={classNames(
                "block relative font-bold border-b border-black w-full",
                data?.mode_of_procurement ? "top-[1px]" : "top-[10px]"
              )}
            >
              <p>{data?.mode_of_procurement}</p>
            </span>
          </span>
          <span className="flex items-center gap-2">
            <label className="whitespace-nowrap">P.R. No.: </label>
            <span
              className={classNames(
                "block relative font-bold border-b border-black w-full",
                (data?.purchase_requests || []).length > 0
                  ? "top-[1px]"
                  : "top-[12px]"
              )}
            >
              <p>{prNumbers}</p>
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
                "block relative font-bold border-b border-black w-full",
                data?.delivery_location ? "top-[1px]" : "top-[10px]"
              )}
            >
              {data?.delivery_location}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label className="whitespace-nowrap">Date of Delivery: </label>
            <h4
              className={classNames(
                "block relative font-bold border-b border-black w-full",
                data?.delivery_date ? "top-[1px]" : "top-[10px]"
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
                "block relative font-bold border-b border-black w-full",
                data?.delivery_term ? "top-[1px]" : "top-[10px]"
              )}
            >
              {data?.delivery_term}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label className="whitespace-nowrap">Payment Term: </label>
            <h4
              className={classNames(
                "block relative font-bold border-b border-black w-full",
                data?.payment_term ? "top-[1px]" : "top-[10px]"
              )}
            >
              {data?.payment_term}
            </h4>
          </span>
        </div>
      </section>

      <section>
        <table className="print-table w-full text-sm text-left rtl:text-right text-gray-500 border-t border-b border-l-0 border-r-0">
          <tbody className="border-t border-b border-l-0 border-r-0">
            <tr>
              <th className="px-6 py-3 border bg-gray-50">Item No.</th>
              <th className="px-6 py-3 border bg-gray-50">Unit</th>
              <th className="px-6 py-3 border bg-gray-50">Description</th>
              <th className="px-6 py-3 border bg-gray-50">Quantity</th>
              <th className="px-6 py-3 border bg-gray-50">Unit Cost</th>
              <th className="px-6 py-3 border bg-gray-50">Total Cost</th>
            </tr>
            {(data?.purchase_requests || [])?.map((request) =>
              request.items?.map((item, id) => (
                <tr
                  key={id}
                  className="border-t border-b border-l-0 border-r-0"
                >
                  <td className="px-6 py-4 border bg-gray-50">
                    {twoDigit(id + 1)}
                  </td>
                  <td className="px-6 py-4 border bg-gray-50">
                    {item.unit_name}
                  </td>
                  <td className="px-6 py-4 border bg-gray-50">
                    {itemDisplay(item.item_name, item.description || "")}
                  </td>
                  <td className="px-6 py-4 border bg-gray-50">
                    {numberTemplate(item.quantity)}
                  </td>
                  <td className="px-6 py-4 border bg-gray-50">
                    {currencyTemplate(item.price)}
                  </td>
                  <td className="px-6 py-4 border bg-gray-50">
                    {currencyTemplate(item.price * item.quantity)}
                  </td>
                </tr>
              ))
            )}
            <tr>
              <td className="border bg-gray-50" colSpan={2}>
                <small className="w-full flex justify-center">
                  Total amount in words:
                </small>
              </td>
              <td className="border bg-gray-50" colSpan={2}>
                **{numberToWords(overallTotal)}**
              </td>
              <td className="px-6 py-4 border bg-gray-50">Total:</td>
              <td className="px-6 py-4 border bg-gray-50">
                {currencyTemplate(overallTotal)}
              </td>
            </tr>
            <tr>
              <td className="border px-6 py-4 bg-gray-50" colSpan={6}>
                <span>
                  In case of failure to make the full delivery within the time
                  specified above, a penalty of one-tenth (/10) of one (1)
                  percent for every day of delay shall be imposed.
                </span>
                <section className="grid grid-cols-2 grid-rows-1 gap-4 py-4">
                  <div>
                    <small className="block mb-14">Conforme:</small>
                    <div className="flex flex-col items-center justify-center">
                      <div className="font-bold text-sm">{data?.supplier}</div>
                      <small
                        className={classNames(
                          "block relative top-[1px] border-t border-black w-3/4 text-center"
                        )}
                      >
                        Signature over printed name of Supplier
                      </small>
                      <small
                        className={classNames(
                          "mt-6 block relative top-[1px] border-t border-black w-2/4 text-center"
                        )}
                      >
                        Date
                      </small>
                    </div>
                  </div>
                  <div>
                    <small className="block mb-14">Very truly yours:</small>
                    <div className="flex flex-col items-center justify-center">
                      <div className="font-bold text-sm">
                        JANE CENSORIA C. YAP
                      </div>
                      <small
                        className={classNames(
                          "block relative top-[1px] border-t border-black w-3/4 text-center"
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
              <td className="border px-6 py-4 bg-gray-50" colSpan={6}>
                <section className="grid grid-cols-2 grid-rows-1 gap-4 py-4">
                  <div>
                    <small className="block mb-14">Funds Available:</small>
                    <div className="flex flex-col items-center justify-center">
                      <div className="font-bold text-sm">HUBERT M. INAS</div>
                      <small
                        className={classNames(
                          "block relative top-[1px] border-t border-black w-3/4 text-center"
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
                          "ml-8 block relative border-b border-black w-3/4 top-[20px]"
                        )}
                      ></span>
                    </section>
                    <div className="clear-both"></div>
                    <section>
                      <span className="mb-4 float-left">AMOUNT:</span>
                      <span className="ml-4 text-gray-600">P</span>
                    </section>
                  </div>
                </section>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default PrintOrder;
