import classNames from "classnames";
import "./office-circle";

export interface OfficeCircleProps {
  label: string;
  value: string;
  isIcon?: boolean;
  severity?: string;
  isLightBg?: boolean;
  className?: string;
  onClick?: (value: any) => any;
}

export function OfficeCircle({
  label,
  value,
  isIcon,
  isLightBg,
  className,
  onClick,
}: OfficeCircleProps) {
  let displayValue = <></>;
  if (isIcon && !!value) {
    displayValue = <i className={value}></i>;
  } else if (!isIcon && !!value) {
    displayValue = <h5>{value}</h5>;
  }

  return (
    <div
      className={classNames(
        "flex flex-col justify-center items-center",
        className
      )}
      onClick={onClick}
    >
      <div
        className={classNames(
          "border  rounded-full w-9 h-9 flex items-center justify-center mb-2",
          isLightBg ? "border-gray-300" : "border-white"
        )}
      >
        {displayValue}
      </div>
      <b className={classNames(isLightBg ? "text-gray-600" : "text-white")}>
        {label}
      </b>
    </div>
  );
}

export default OfficeCircle;
