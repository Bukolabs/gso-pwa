import classNames from "classnames";
import "./office-circle";

/* eslint-disable-next-line */
export interface OfficeCircleProps {
  label: string;
  icon?: string;
  severity?: string;
}

export function OfficeCircle({ label, icon }: OfficeCircleProps) {
  return (
    <div className={classNames('flex flex-col justify-center items-center')}>
      <div className="border border-gray-500 rounded-full w-9 h-9 flex items-center justify-center">
        {icon ? <i className={icon}></i> : <></>}
      </div>
      <b>{label}</b>
    </div>
  );
}

export default OfficeCircle;
