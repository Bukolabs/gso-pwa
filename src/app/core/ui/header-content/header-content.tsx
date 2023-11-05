import classNames from "classnames";
import { ReactNode } from "react";

export interface HeaderContentProps {
  title?: string;
  subTitle?: string;
  children?: ReactNode;
  showLabel?: boolean;
  onBack?: () => void;
}

export function HeaderContent({
  title,
  subTitle,
  children,
  showLabel,
  onBack,
}: HeaderContentProps) {
  const back = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <section className="flex flex-row justify-between mb-4">
      <div className="flex gap-2">
        {onBack && (
          <div
            onClick={back}
            className={classNames('cursor-pointer flex relative gap-2', subTitle ? 'items-start mt-1' : 'items-center')}
          >
            <span className="pi pi-angle-left p-2 hover:bg-gray-100"></span>
            {showLabel && <p>Back</p>}
          </div>
        )}
        <div className="flex flex-col justify-center">
          {title && <h1>{title}</h1>}
          {subTitle && <h6 className="m-0 text-gray-500">{subTitle}</h6>}
        </div>
      </div>
      <div>{children}</div>
    </section>
  );
}

export default HeaderContent;
