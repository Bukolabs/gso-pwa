import { GetPurchaseRequestDto } from "@api/api";
import "./request-print.scss";
import {
  currencyTemplate,
  dateTemplate,
  numberTemplate,
} from "@core/utility/data-table-template";
import StorageService from "@shared/services/storage.service";
import { AUTH } from "@core/utility/settings";
import { LocalAuth } from "@core/model/local-auth";
import { sumBy } from "lodash-es";
import classNames from "classnames";
import { twoDigit } from "@core/utility/number-helper";

export interface RequestPrintProps {
  data: GetPurchaseRequestDto | undefined;
}

export function RequestPrint({ data }: RequestPrintProps) {
  const currentUser = StorageService.load(AUTH) as LocalAuth;
  const logo = "/tagbilaran-logo.png";
  const prItems = data?.items;
  const itemDisplay = (title: string, description: string) => {
    return (
      <span>
        <label className="font-bold">{title}</label>
        <small className="block">{description}</small>
      </span>
    );
  };
  const overallTotal = sumBy(prItems || [], (x) => x.price * (x.quantity || 0));

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
          <h1 className="mb-5">Purchase Request</h1>
          <small className="underline">CITY GOVERNMENT OF TAGBILARAN</small>
          <small className="font-bold">LGU</small>
        </div>
        <div className="mx-4">
          <p className="w-20">Annex 30</p>
        </div>
      </header>

      <section className="flex justify-between w-full border-t border-b-0 border-l-0 border-r-0 border-gray-200 p-4 mb-4">
        <div>
          <span className="flex items-center gap-2">
            <label>Department: </label>
            <h4 className="underline underline-offset-4">
              {data?.department_name || "-"}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label>Section: </label>
            <h4
              className={classNames(
                "block",
                data?.section
                  ? "underline underline-offset-4 "
                  : "relative top-3 border-b border-black w-24"
              )}
            >
              {data?.section}
            </h4>
          </span>
        </div>
        <div>
          <span className="flex items-center gap-2">
            <label>PR No: </label>
            <h4 className="underline underline-offset-4">
              {data?.pr_no || "-"}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label>SAI No: </label>
            <h4 className="relative top-3 border-b border-black w-24"> </h4>
          </span>
          <span className="flex items-center gap-2">
            <label>SAI No: </label>
            <h4 className="relative top-3 border-b border-black w-24"> </h4>
          </span>
        </div>
        <div>
          <span className="flex items-center gap-2">
            <label>Date: </label>
            <h4 className="underline underline-offset-4">
              {dateTemplate(data?.pr_date)}
            </h4>
          </span>
          <span className="flex items-center gap-2">
            <label>Date: </label>
            <h4 className="relative top-3 border-b border-black w-24"> </h4>
          </span>
          <span className="flex items-center gap-2">
            <label>Date: </label>
            <h4 className="relative top-3 border-b border-black w-24"> </h4>
          </span>
        </div>
      </section>

      <section>
        <table className="print-table w-full text-sm text-left rtl:text-right text-gray-500 border-t border-b border-l-0 border-r-0">
          <tbody className="border-t border-b border-l-0 border-r-0">
            <tr>
              <th className="px-6 py-3 border bg-gray-50">No.</th>
              <th className="px-6 py-3 border bg-gray-50">Quantity</th>
              <th className="px-6 py-3 border bg-gray-50">Unit</th>
              <th className="px-6 py-3 border bg-gray-50">Items</th>
              <th className="px-6 py-3 border bg-gray-50">Cost</th>
              <th className="px-6 py-3 border bg-gray-50">Total Cost</th>
            </tr>
            {prItems?.map((item, id) => (
              <tr key={id} className="border-t border-b border-l-0 border-r-0">
                <td className="px-6 py-4 border bg-gray-50">
                  {twoDigit(id + 1)}
                </td>
                <td className="px-6 py-4 border bg-gray-50">
                  {numberTemplate(item.quantity)}
                </td>
                <td className="px-6 py-4 border bg-gray-50">
                  {item.unit_name}
                </td>
                <td className="px-6 py-4 border bg-gray-50">
                  {itemDisplay(item.item_name, item.description || "")}
                </td>
                <td className="px-6 py-4 border bg-gray-50">
                  {currencyTemplate(item.price)}
                </td>
                <td className="px-6 py-4 border bg-gray-50">
                  {currencyTemplate(item.price * item.quantity)}
                </td>
              </tr>
            ))}
            <tr>
              <td className="border bg-gray-50"></td>
              <td className="border bg-gray-50"></td>
              <td className="border bg-gray-50"></td>
              <td className="border bg-gray-50"></td>
              <td className="px-6 py-4 border bg-gray-50">Total:</td>
              <td className="px-6 py-4 border bg-gray-50">
                {currencyTemplate(overallTotal)}
              </td>
            </tr>
            <tr>
              <td className="border px-6 py-5 bg-gray-50 font-bold">
                Purpose:
              </td>
              <td className="border px-6 py-4 bg-gray-50" colSpan={5}></td>
            </tr>
            <tr>
              <td className="border bg-gray-50 align-top">
                <section>
                  <small className="block mt-14">Signature</small>
                  <small className="block">Printed Name</small>
                  <small className="block">Designation</small>
                  <small className="block">Date</small>
                </section>
              </td>
              <td className="border bg-gray-50 align-top" colSpan={2}>
                <small className="block mb-14">Requested by:</small>
                <div className="text-center">
                  <div className="font-bold text-sm">
                    {currentUser.person_first_name +
                      " " +
                      currentUser.person_last_name}
                  </div>
                  <small>(DEPARTMENT HEAD)</small>
                </div>
              </td>
              <td className="border bg-gray-50 align-top">
                <small className="block mb-14">Cash Availability:</small>
                <div className="text-center">
                  <div className="font-bold text-sm">HUBERT M. INAS</div>
                  <small>CITY TREASURER</small>
                  <small className="block">
                    (Subject to Existing Appropriation)
                  </small>
                </div>
              </td>
              <td className="border bg-gray-50 align-top" colSpan={2}>
                <small className="block mb-14">Approved by:</small>
                <div className="text-center">
                  <div className="font-bold text-sm">JANE CENSORIA C. YAP</div>
                  <small>CITY MAYOR</small>
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
