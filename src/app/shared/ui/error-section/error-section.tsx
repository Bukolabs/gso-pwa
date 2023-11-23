import classNames from "classnames";

export interface ErrorSectionProps {
  title: string;
  message: string;
}

export function ErrorSection({ title, message }: ErrorSectionProps) {
  return (
    <div className={classNames("flex flex-col m-6")}>
      <div className="text-center">
        <i className="pi pi-info-circle" style={{ fontSize: "2.5rem" }}></i>
      </div>
      <h1 className="text-900 font-bold text-5xl mb-2 text-center">{title}</h1>
      <div className="text-600 mb-5 text-center">{message}</div>
    </div>
  );
}

export default ErrorSection;
