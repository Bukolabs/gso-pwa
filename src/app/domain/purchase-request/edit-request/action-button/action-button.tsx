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

  const [mainAction, setMainAction] = useState('Update');

  useEffect(() => {
    if (status === "DRAFT") {
      setMainAction("Update");
    } else {
      setMainAction("Approve");
    }
  }, [status]);

  const handleMainAction = () => [onAction(mainAction)];
  const getActions = () => {
    const initialAction = {
      label: "Submit",
      command: () => {
        onAction("Submit");
      },
    };
    const defaultActions = [
      {
        label: "History",
        command: () => {
          onAction("History");
        },
      },
      {
        label: "Print",
        command: () => {
          onAction("Print");
        },
      },
      {
        label: "Delete",
        command: () => {
          onAction("Delete");
        },
      },
    ];
    const declineAction = {
      label: "Decline",
      command: () => {
        onAction("Decline");
      },
    };

    const hasReviewerActions =
      !isRequestor && showReviewControl(status as RequestStatus);
    const actions = hasReviewerActions
      ? [declineAction, ...defaultActions]
      : [initialAction, ...defaultActions];
    return actions;
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
