import classNames from "classnames";

export interface TextBlockProps {
  className?: string;
  label: string;
  value: string;
  mode?: "vertical" | "horizontal";
}

export function TextBlock({
  className,
  label,
  value,
  mode = "horizontal",
}: TextBlockProps) {
  const horizontalDisplay = (
    <div className={classNames("flex gap-2", className)}>
      <p className="text-gray-500 mb-0 text-sm">{label}: </p>
      <p className="font-bold">{value}</p>
    </div>
  );
  const verticalDisplay = (
    <div className={classNames("flex flex-col", className)}>
      <p className="font-bold m-0 text-lg">{value}</p>
      <span className="text-gray-500 m-0 text-sm">{label} </span>
    </div>
  );
  return mode === "horizontal" ? horizontalDisplay : verticalDisplay;
}

export default TextBlock;
