import HeaderContent from "@shared/ui/header-content/header-content";
import "./report.scss";

/* eslint-disable-next-line */
export interface ReportProps {}

export function Report() {
  return (
    <div className="report">
      <HeaderContent title="Reports"></HeaderContent>

      <div className="p-7">
        <div>Total Submitted PR</div>
        <div>Total Approved PR</div>
        <div>Total Declined PR</div>
        <div>Total ITB</div>
        <div>Total RFQ</div>
        <div>Total Approved PO</div>
        <div>Total Declined PO</div>
      </div>
    </div>
  );
}

export default Report;
