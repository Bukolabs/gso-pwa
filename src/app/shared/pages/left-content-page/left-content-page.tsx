import { ReactNode } from "react";
import classNames from "classnames";

export interface LeftContentPageProps {
  children: ReactNode;
  backgroundImage: string;
  leftPanelClass?: string;
  rightColClassName?: string;
}

export function LeftContentPage({
  children,
  leftPanelClass,
  rightColClassName,
  backgroundImage,
}: LeftContentPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row-reverse">
        <div
          className={classNames(
            "min-h-screen bg-white lg:w-1/2 flex",
            rightColClassName
          )}
        >
          <div className="mx-auto sm:max-w-[90%] sm:p-5 p-0 bg-white">
            {children}
          </div>
        </div>
        <div
          className={classNames(
            "lg:w-1/2 bg-cover bg-center hidden lg:block",
            leftPanelClass
          )}
          style={{
            backgroundImage,
          }}
        ></div>
      </div>
    </div>
  );
}

export default LeftContentPage;
