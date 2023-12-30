import { GetPurchaseRequestDto } from "@api/api";
import "./request-print";
import {
  currencyTemplate,
  dateTemplate,
  numberTemplate,
} from "@core/utility/data-table-template";
import StorageService from "@shared/services/storage.service";
import { AUTH } from "@core/utility/settings";
import { LocalAuth } from "@core/model/local-auth";
import { sumBy } from "lodash-es";

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
      <header className="flex justify-center items-center gap-2 w-full my-6">
        <div className="relative top-0">
          <img
            src={logo}
            className="w-20 h-20"
            alt="city of tagbilaran official seal"
          />
        </div>
        <div className="flex flex-col items-center my-4">
          <h1>Purchase Request</h1>
          <h3 className="underline">CITY GOVERNMENT OF TAGBILARAN</h3>
          <h3 className="font-bold">LGU</h3>
        </div>
      </header>

      <section className="flex justify-between w-full border-t border-b-0 border-l-0 border-r-0 border-gray-200 p-4 mb-4">
        <div>
          <span className="flex items-center gap-2">
            <label>Department: </label>
            <h4>{data?.department_name || "-"}</h4>
          </span>
          <span className="flex items-center gap-2">
            <label>Section: </label>
            <h4>{data?.section || "-"}</h4>
          </span>
        </div>
        <div>
          <span className="flex items-center gap-2">
            <label>PR No: </label>
            <h4>{data?.pr_no || "-"}</h4>
          </span>
          <span className="flex items-center gap-2">
            <label>SAI No: </label>
            <h4>{data?.sai_no || "-"}</h4>
          </span>
          <span className="flex items-center gap-2">
            <label>SAI No: </label>
            <h4>{data?.alobs_no || "-"}</h4>
          </span>
        </div>
        <div>
          <span className="flex items-center gap-2">
            <label>Date: </label>
            <h4>{dateTemplate(data?.pr_date)}</h4>
          </span>
          <span className="flex items-center gap-2">
            <label>Date: </label>
            <h4>{dateTemplate(data?.sai_date)}</h4>
          </span>
          <span className="flex items-center gap-2">
            <label>Date: </label>
            <h4>{dateTemplate(data?.alobs_date)}</h4>
          </span>
        </div>
      </section>

      <section>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-t border-b border-l-0 border-r-0">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-t border-b border-l border-r">
            <tr>
              <th className="px-6 py-3">No.</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Unit</th>
              <th className="px-6 py-3">Items</th>
              <th className="px-6 py-3">Cost</th>
              <th className="px-6 py-3">Total Cost</th>
            </tr>
          </thead>
          <tbody className="border-t border-b border-l-0 border-r-0">
            {prItems?.map((item, id) => (
              <tr key={id} className="border-t border-b border-l-0 border-r-0">
                <td className="px-6 py-4">{id + 1}</td>
                <td className="px-6 py-4">{numberTemplate(item.quantity)}</td>
                <td className="px-6 py-4">{item.unit_name}</td>
                <td className="px-6 py-4">
                  {itemDisplay(item.item_name, item.description || "")}
                </td>
                <td className="px-6 py-4">{currencyTemplate(item.price)}</td>
                <td className="px-6 py-4">
                  {currencyTemplate(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="px-6 py-4">Total:</td>
              <td className="px-6 py-4">{currencyTemplate(overallTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </section>

      <section className="my-6 p-4">
        <span className="flex items-center gap-2">
          <label>Purpose: </label>
          <h4>{data?.purpose || "-"}</h4>
        </span>
      </section>

      <footer className="grid grid-cols-4 gap-4 w-full border-t border-b-0 border-l-0 border-r-0 my-4 p-4">
        <section>
          <small className="mt-10 block">Signature</small>
          <small className="block">Printed Name</small>
          <small className="block">Designation</small>
          <small className="block">Date</small>
        </section>
        <section>
          <small className="mb-10 block">Requested by:</small>
          <div className="font-bold text-sm">
            {currentUser.person_first_name + " " + currentUser.person_last_name}
          </div>
          <small>(DEPARTMENT HEAD)</small>
        </section>
        <section>
          <small className="mb-10 block">Cash Availability:</small>
          <div className="font-bold text-sm">HUBERT M. INAS</div>
          <small>CITY TREASURER</small>
        </section>
        <section>
          <small className="mb-10 block">Approved by:</small>
          <div className="font-bold text-sm">JANE CENSORIA C. YAP</div>
          <small>CITY MAYOR</small>
        </section>
      </footer>
    </div>
  );
}

export default RequestPrint;
