import {
  GetPIDDto,
  GetPurchaseOrderDto,
  GetPurchaseRequestDto,
} from "@api/api";
import "./print-inspection.scss";
import { twoDigit } from "@core/utility/number-helper";
import {
  currencyTemplate,
  numberTemplate,
} from "@core/utility/data-table-template";
import { sumBy } from "lodash-es";
import { dateFormat } from "@shared/formats/date-time-format";
import { RequestStatus } from "@core/model/request-status.enum";
import { SETTINGS } from "@core/utility/settings";

export interface PrintInspectionProps {
  data: GetPurchaseRequestDto;
  deliveryItem: GetPIDDto;
  order?: GetPurchaseOrderDto;
}

export function PrintInspection({
  data,
  deliveryItem,
  order,
}: PrintInspectionProps) {
  const requestorName =
    `${order?.end_user_name}` ||
    `${data.create_by_first_name} ${data.create_by_last_name}`;
  const requestorOffice =
    `${order?.end_user_office}` || SETTINGS.endUserOffice1;
  const logo = "/tagbilaran-logo.png";
  const totalAmount = sumBy(deliveryItem.delivery, (x) => x.price * x.quantity);
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

  return (
    <div className="print-inspection mx-8">
      <header className="flex w-full my-4">
        <div className="relative top-0 mx-4">
          <img
            src={logo}
            className="w-28"
            alt="city of tagbilaran official seal"
          />
        </div>
        <div className="flex flex-col items-center w-full">
          <small className="print-normal">Republic of the Philippines</small>
          <small className="print-normal">City Government of Tagbilaran</small>
          <span className="print-header mt-5">
            INSPECTION AND ACCEPTANCE REPORT
          </span>
        </div>
        <div className="mx-4">
          <p className="print-normal whitespace-nowrap w-20">Appendix 62</p>
        </div>
      </header>

      <section>
        <table className="print-table w-full text-sm text-left rtl:text-right text-gray-500 border-t border-b border-l-0 border-r-0">
          <tbody className="border-t border-b border-l-0 border-r-0">
            <tr>
              <td className="print-normal px-2 py-1 border-l bg-gray-50 w-20 align-top">
                <label className="print-normal block mb-1">Supplier:</label>
                <label className="print-normal block mb-4">PO NO./Date:</label>
                <label className="print-normal block">
                  Requisitioning Office/Dept:
                </label>
              </td>
              <td
                className="print-normal px-2 py-1 bg-gray-50 align-top"
                colSpan={3}
              >
                <label className="print-normal block relative font-bold border-b border-black w-full top-[1px] mb-1">
                  {order?.supplier}
                </label>
                <label className="print-normal block relative font-bold border-b border-black w-full top-[1px] mb-4">
                  {dateFormat(order?.po_date)}
                </label>
                <label className="print-normal block relative font-bold border-b border-black w-full top-[1px]">
                  {data.department_name}
                </label>
              </td>
              <td className="bg-gray-50"></td>
              <td className="align-top bg-gray-50">
                <label className="print-normal block mb-1">IAR No.:</label>
                <label className="print-normal block mb-4">Date:</label>
                <label className="print-normal block">Invoice No.:</label>
                <label className="print-normal block">Date:</label>
              </td>
              <td className="align-top border-r bg-gray-50">
                <label className="print-normal block relative font-bold border-b border-black w-full top-[1px] mb-1">
                  {order?.iar_no || "-"}
                </label>
                <label className="print-normal block relative font-bold border-b border-black w-full top-[1px] mb-1">
                  {dateFormat(order?.iar_date) || "-"}
                </label>
                <label className="print-normal block relative font-bold border-b border-black w-full top-[1px] mb-1">
                  {order?.invoice_no || "-"}
                </label>
                <label className="print-normal block relative font-bold border-b border-black w-full top-[1px] mb-1">
                  {dateFormat(order?.invoice_date) || "-"}
                </label>
              </td>
            </tr>
            <tr>
              <th className="print-normal px-2 py-1 border bg-gray-50">
                Item No.
              </th>
              <th className="print-normal px-2 py-1 border bg-gray-50">
                Description
              </th>
              <th className="print-normal px-2 py-1 border bg-gray-50">
                Brand
              </th>
              <th className="print-normal px-2 py-1 border bg-gray-50">Unit</th>
              <th className="print-normal px-2 py-1 border bg-gray-50">
                Quantity
              </th>
              <th className="print-normal px-2 py-1 border bg-gray-50 whitespace-nowrap">
                Unit Price
              </th>
              <th className="print-normal px-2 py-1 border bg-gray-50">
                Total
              </th>
            </tr>
            {(deliveryItem.delivery || [])?.map((artifact, id) => (
              <tr key={id} className="border-t border-b border-l-0 border-r-0">
                <td className="print-normal px-2 py-1 border bg-gray-50">
                  {twoDigit(id + 1)}
                </td>
                <td className="print-normal px-2 py-1 border bg-gray-50">
                  {itemDisplay(
                    artifact.item_name || "",
                    artifact.description || ""
                  )}
                </td>
                <td className="print-normal px-2 py-1 border bg-gray-50">
                  {artifact.brand_name}
                </td>
                <td className="print-normal px-2 py-1 border bg-gray-50">
                  {artifact.unit_name}
                </td>
                <td className="print-normal px-2 py-1 border bg-gray-50">
                  {numberTemplate(artifact.quantity)}
                </td>
                <td className="print-normal px-2 py-1 border bg-gray-50">
                  {currencyTemplate(artifact.price || 0)}
                </td>
                <td className="print-normal px-2 py-1 border bg-gray-50">
                  {currencyTemplate((artifact.price || 0) * artifact.quantity)}
                </td>
              </tr>
            ))}
            <tr>
              <td className="border bg-gray-50" colSpan={5}></td>
              <td className="print-normal px-2 py-1 border bg-gray-50">
                Total:
              </td>
              <td className="print-normal px-2 py-1 border bg-gray-50">
                {currencyTemplate(totalAmount)}
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="border bg-gray-50 text-center">
                <span className="font-bold">INSPECTION</span>
              </td>
              <td colSpan={4} className="border bg-gray-50 text-center">
                <span className="font-bold">ACCEPTANCE</span>
              </td>
            </tr>
            <tr>
              <td className="border px-2 pb-1 bg-gray-50" colSpan={3}>
                <span className="print-normal">Date Inspected:</span>
                <span className="print-normal block mt-4">
                  Inspected, verified and found in order as to quantity and
                  specifications
                </span>
                <section className="grid grid-cols-1 gap-4 py-1 mt-10">
                  <div className="flex flex-col items-center justify-center">
                    <div className="font-bold text-sm">
                      {order?.signatory_name_1 || SETTINGS.signatoryName1}
                    </div>
                    <small className="print-normal block relative top-[1px] border-t border-black w-2/4 text-center">
                      {order?.signatory_office_1 || SETTINGS.signatoryOffice1}
                    </small>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="font-bold text-sm">
                      {order?.signatory_name_2 || SETTINGS.signatoryName2}
                    </div>
                    <small className="print-normal block relative top-[1px] border-t border-black w-2/4 text-center">
                      {order?.signatory_office_2 || SETTINGS.signatoryOffice2}
                    </small>
                  </div>
                </section>
              </td>
              <td className="border px-2 pt-4 pb-1 bg-gray-50" colSpan={5}>
                <span className="print-normal">Date Received:</span>
                <span className="print-normal block mt-4">
                  Complete{" "}
                  {data.status_name === RequestStatus.COMPLETED ? (
                    <span className="inline-block ml-2">
                      <i className="pi pi-check"></i>
                    </span>
                  ) : null}
                </span>
                <span className="print-normal block mt-4">
                  Partial (Pls. specify quantity)
                  {data.status_name === RequestStatus.PARTIAL ? (
                    <span className="inline-block ml-2">
                      <i className="pi pi-check"></i>
                    </span>
                  ) : null}
                </span>
                <section className="grid grid-cols-1 gap-4 py-1 mt-10">
                  <div className="flex flex-col items-center justify-center">
                    <div className="font-bold text-sm">{requestorName}</div>
                    <small className="print-normal block relative top-[1px] border-t border-black w-2/4 text-center">
                      <span className="block whitespace-nowrap">
                        {requestorOffice}
                      </span>
                    </small>
                  </div>
                </section>
              </td>
            </tr>
            <tr>
              <td className="border px-2 pb-1 bg-gray-50" colSpan={7}>
                <span className="print-normal">Approved by:</span>
                <section className="grid grid-cols-1 gap-4 py-1 mt-10">
                  <div className="flex flex-col items-center justify-center">
                    <div className="font-bold text-sm">
                      CHRIS JOHN RENER G. TORRALBA, Ph.D
                    </div>
                    <small className="print-normal block relative top-[1px] border-t border-black w-2/4 text-center">
                      City General Services Officer
                    </small>
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

export default PrintInspection;
