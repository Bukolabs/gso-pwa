import classNames from "classnames";
import "./office-circle";

/* eslint-disable-next-line */
export interface OfficeCircleProps {
  label: string;
  value: string;
  isIcon?: boolean;
  severity?: string;
}

export function OfficeCircle({ label, value, isIcon }: OfficeCircleProps) {
  let displayValue = <></>;
  if (isIcon && !!value) {
    displayValue = <i className={value}></i>;
  } else if (!isIcon && !!value) {
    displayValue = <h5>{value}</h5>;
  }

  return (
    <div className={classNames("flex flex-col justify-center items-center")}>
      <div className="border border-white rounded-full w-9 h-9 flex items-center justify-center">
        {displayValue}
      </div>
      <b className="text-white">{label}</b>
    </div>
  );
}

export default OfficeCircle;
