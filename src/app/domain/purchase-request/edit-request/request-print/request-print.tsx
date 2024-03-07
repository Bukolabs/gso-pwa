import { GetPurchaseRequestDto } from "@api/api";
import "./request-print.scss";
import {
  currencyTemplate,
  dateTemplate,
  numberTemplate,
} from "@core/utility/data-table-template";
import { sumBy } from "lodash-es";
import classNames from "classnames";
import { twoDigit } from "@core/utility/number-helper";

export interface RequestPrintProps {
  data: GetPurchaseRequestDto | undefined;
  spacing: number;
}

export function RequestPrint({ data, spacing }: RequestPrintProps) {
  const logo = "/tagbilaran-logo.png";
  const prItems = data?.items;
  const itemDisplay = (title: string, description: string) => {
    return (
      <div>
        <label className="font-bold">{title}</label>
        <pre className="w-full whitespace-pre-wrap">{description}</pre>
      </div>
    );
  };
  const overallTotal = sumBy(prItems || [], (x) => x.price * (x.quantity || 0));
  const mayorOffice =
    data?.department_name === "SP" ? "Vice Mayor" : "City Mayor";
  const mayorName =
    data?.department_name === "SP"
      ? "HON. ADAM RELSON L. JALA"
      : "JANE CENSORIA C. YAP";

  return (
    <div className="request-print mt-10 mx-10 border">
      <header className="flex w-full my-4">
        <div className="relative top-0 mx-4">
          <img
            src={logo}
            className="w-28"
            alt="city of tagbilaran official seal"
          />
        </div>
        <div className="flex flex-col items-center w-full">
          <span className="mb-5 print-header">Purchase Request</span>
          <small className="print-normal underline">
            CITY GOVERNMENT OF TAGBILARAN
          </small>
          <small className="print-normal font-bold">LGU</small>
        </div>
        <div className="mx-4">
          <p className="whitespace-nowrap print-normal">Annex 30</p>
        </div>
      </header>

      <section className="flex justify-between w-full border-t border-b-0 border-l-0 border-r-0 border-gray-200 p-4 mb-4">
        <div>
          <span className="flex items-center gap-2">
            <label className="print-normal">Department: </label>
            <h4 className="print-normal block relative font-bold border-b border-black top-[1px] mb-1 w-3/4 ">
              {data?.department_description || "-"}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label className="print-normal">Section: </label>
            <h4
              className={classNames(
                "print-normal block relative font-bold border-b border-black min-w-[100px] w-full",
                data?.section ? "top-[1px]" : "top-[10px]"
              )}
            >
              {data?.section}
            </h4>
          </span>
        </div>
        <div>
          <span className="flex items-center gap-2">
            <label className="print-normal whitespace-nowrap">PR No: </label>
            <h4 className="print-normal block relative font-bold border-b border-black min-w-[100px] w-full">
              {data?.pr_no || "-"}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label className="print-normal whitespace-nowrap">SAI No: </label>
            <span className="print-normal block relative font-bold border-b border-black min-w-[100px] w-full top-[6px]"></span>
          </span>
          <span className="flex items-center gap-2">
            <label className="print-normal whitespace-nowrap">ALOBS No: </label>
            <span className="print-normal block relative font-bold border-b border-black min-w-[100px] w-full top-[6px]"></span>
          </span>
        </div>
        <div>
          <span className="flex items-center gap-2">
            <label className="print-normal">Date: </label>
            <h4 className="print-normal block relative font-bold border-b border-black min-w-[100px] w-full">
              {dateTemplate(data?.pr_date)}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label className="print-normal">Date: </label>
            <span className="print-normal block relative font-bold border-b border-black min-w-[100px] w-full top-[6px]"></span>
          </span>
          <span className="flex items-center gap-2">
            <label className="print-normal">Date: </label>
            <span className="print-normal block relative font-bold border-b border-black min-w-[100px] w-full top-[6px]"></span>
          </span>
        </div>
      </section>

      <section>
        <table className="print-table table-auto w-full text-sm text-left rtl:text-right text-gray-800 border-t-2 border-b-2 border-l-2 border-r-2">
          <tbody className="border-t border-b border-l-0 border-r-0">
            <tr>
              <th className="print-normal px-2 py-1 border-l-0 border bg-gray-50 w-20">
                Item No.
              </th>
              <th className="print-normal px-2 py-1 border-l-0 border bg-gray-50">
                Quantity
              </th>
              <th className="print-normal px-2 py-1 border-l-0 border bg-gray-50">
                Unit
              </th>
              <th className="print-normal px-2 py-1 border-l-0 border bg-gray-50">
                Item Description
              </th>
              <th className="print-normal px-2 py-1 border-l-0 border bg-gray-50">
                Cost
              </th>
              <th className="print-normal px-2 py-1 border-l-0 border border-r-0 bg-gray-50">
                Total Cost
              </th>
            </tr>
            {prItems?.map((item, id) => (
              <tr key={id} className="border-t border-b border-l-0 border-r-0">
                <td className="print-normal px-2 border-l-0 border bg-gray-50">
                  {twoDigit(id + 1)}
                </td>
                <td className="print-normal px-2 border bg-gray-50">
                  {numberTemplate(item.quantity)}
                </td>
                <td className="print-normal px-2 border bg-gray-50">
                  {item.unit_name}
                </td>
                <td className="print-normal px-2 border bg-gray-50">
                  {itemDisplay(item.item_name, item.description || "")}
                </td>
                <td className="print-normal px-2 border bg-gray-50">
                  {currencyTemplate(item.price)}
                </td>
                <td className="print-normal px-2 border-r-0 border bg-gray-50">
                  {currencyTemplate(item.price * item.quantity)}
                </td>
              </tr>
            ))}
            <tr>
              <td className="border border-l-0 bg-gray-50"></td>
              <td className="border bg-gray-50"></td>
              <td className="border bg-gray-50"></td>
              <td className="border bg-gray-50"></td>
              <td className="print-normal px-2 border bg-gray-50">Total:</td>
              <td className="print-normal px-2 border-r-0 border bg-gray-50">
                {currencyTemplate(overallTotal)}
              </td>
            </tr>
            <tr>
              <td
                className={classNames(
                  `print-normal border-l-0 border bg-gray-50 pb-4`
                )}
                style={{ paddingTop: `${spacing}px` }}
              >
                Purpose:
              </td>
              <td
                className={classNames("border border-r-0 bg-gray-50 px-2 pb-4")}
                style={{ paddingTop: `${spacing}px` }}
                colSpan={5}
              >
                {data?.purpose}
              </td>
            </tr>
            <tr>
              <td className="border border-l-0 bg-gray-50 align-top">
                <section>
                  <small className="print-normal block mt-14">Signature</small>
                  <small className="print-normal block">Printed Name</small>
                  <small className="print-normal block">Designation</small>
                  <small className="print-normal block">Date</small>
                </section>
              </td>
              <td className="border bg-gray-50 align-top" colSpan={2}>
                <small className="print-normal block mb-14">
                  Requested by:
                </small>
                <div className="text-center">
                  <div className="font-bold text-sm print-normal">
                    {data?.signatory_name || "-"}
                  </div>
                  <small className="print-normal">(DEPARTMENT HEAD)</small>
                </div>
              </td>
              <td className="border bg-gray-50 align-top">
                <small className="print-normal block mb-14">
                  Cash Availability:
                </small>
                <div className="text-center">
                  <div className="print-normal font-bold text-sm">
                    HUBERT M. INAS
                  </div>
                  <small className="print-normal">CITY TREASURER</small>
                  <small className="print-normal block">
                    (Subject to Existing Appropriation)
                  </small>
                </div>
              </td>
              <td
                className="border border-r-0 bg-gray-50 align-top"
                colSpan={2}
              >
                <small className="print-normal block mb-14">Approved by:</small>
                <div className="text-center">
                  <div className="print-normal font-bold text-sm">
                    {mayorName}
                  </div>
                  <small>{mayorOffice}</small>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default RequestPrint;
