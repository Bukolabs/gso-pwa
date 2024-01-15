import { SplitButton } from "primereact/splitbutton";
import "./action-button.scss";
import { useEffect, useState } from "react";
import { RequestStatus } from "@core/model/request-status.enum";
import { showReviewControl } from "@core/utility/review-control";
import { useUserIdentity } from "@core/utility/user-identity.hook";

export interface ActionButtonProps {
  status: string;
  onAction: (action: string) => void;
}

export function ActionButton({ status, onAction }: ActionButtonProps) {
  const { isRequestor } = useUserIdentity();

  const [mainAction, setMainAction] = useState("Update");

  useEffect(() => {
    if (status === RequestStatus.DRAFT) {
      setMainAction("Update");
    } else if (
      (status === RequestStatus.SUBMITTED ||
        status === RequestStatus.REVIEW ||
        status === RequestStatus.DECLINED) &&
      !isRequestor
    ) {
      setMainAction("Approve");
    } else {
      setMainAction("History");
    }
  }, [status, isRequestor]);

  const handleMainAction = () => [onAction(mainAction)];
  const getActions = () => {
    const submitAction = {
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

    if (!hasReviewerActions) {
      switch (status) {
        case RequestStatus.DRAFT:
          return [submitAction, print, deleteAction];
        case RequestStatus.SUBMITTED:
        case RequestStatus.REVIEW:
          return [history, deleteAction];
        case RequestStatus.APPROVED:
          return [history, deleteAction];
        case RequestStatus.DECLINED:
          return [history, deleteAction];
        default:
          return [history, deleteAction];
      }
    }

    switch (status) {
      case RequestStatus.DRAFT:
        return [submitAction, print, deleteAction];
      case RequestStatus.SUBMITTED:
      case RequestStatus.REVIEW:
        return [declineAction, history, deleteAction];
      case RequestStatus.APPROVED:
        return [declineAction, history, deleteAction];
      case RequestStatus.DECLINED:
        return [history, deleteAction];
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
