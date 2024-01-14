import { SplitButton } from "primereact/splitbutton";
import "./action-button.scss";
import { useEffect, useState } from "react";
import { RequestStatus } from "@core/model/request-status.enum";
import { showReviewControl } from "@core/utility/approve-control";
import { useUserIdentity } from "@core/utility/user-identity.hook";

export interface ActionButtonProps {
  status: string;
  onAction: (action: string) => void;
}

export function ActionButton({ status, onAction }: ActionButtonProps) {
  const { isRequestor } = useUserIdentity();

  const [mainAction, setMainAction] = useState("Update");

  useEffect(() => {
    if (status === "DRAFT") {
      setMainAction("Update");
    } else if (
      (status === "SUBMITTED" ||
        status === "REVIEW" ||
        status === "DECLINED") &&
      !isRequestor
    ) {
      setMainAction("Approve");
    } else {
      setMainAction("History");
    }
  }, [status, isRequestor]);

  const handleMainAction = () => [onAction(mainAction)];
  const getActions = () => {
    const initialAction = {
      label: "Submit",
      command: () => {
        onAction("Submit");
      },
    };
    const print = {
      label: "Print",
      command: () => {
        onAction("Print");
      },
    };

    const history = {
      label: "History",
      command: () => {
        onAction("History");
      },
    };
    const deleteAction = {
      label: "Delete",
      command: () => {
        onAction("Delete");
      },
    };
    const declineAction = {
      label: "Decline",
      command: () => {
        onAction("Decline");
      },
    };

    const hasReviewerActions =
      !isRequestor && showReviewControl(status as RequestStatus);


      

    if (status === "DRAFT") {
      return [initialAction, print, deleteAction];
    } else if (
      (status === "SUBMITTED" || status === "REVIEW") &&
      hasReviewerActions
    ) {
      return [declineAction, history, deleteAction];
    } else if (
      (status === "SUBMITTED" || status === "REVIEW") &&
      !hasReviewerActions
    ) {
      return [deleteAction];
    } else if (status === "DECLINED") {
      return [history, deleteAction];
    } else {
      return [deleteAction];
    }
  };

  return (
    <div className="action-button">
      <SplitButton
        label={mainAction}
        onClick={handleMainAction}
        model={getActions()}
      />
    </div>
  );
}

export default ActionButton;
