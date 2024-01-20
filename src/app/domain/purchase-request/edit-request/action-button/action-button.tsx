import { SplitButton } from "primereact/splitbutton";
import "./action-button.scss";
import { useEffect, useState } from "react";
import { RequestStatus } from "@core/model/request-status.enum";
import { useUserIdentity } from "@core/utility/user-identity.hook";
import { Button } from "primereact/button";

export interface ActionButtonProps {
  status: string;
  onAction: (action: string) => void;
}

export function ActionButton({ status, onAction }: ActionButtonProps) {
  const { isBACApprover, isReviewer } = useUserIdentity();

  const [mainAction, setMainAction] = useState("Update");

  useEffect(() => {
    if (isBACApprover) {
      setMainAction("History");
    } else if (isReviewer) {
      switch (status) {
        case RequestStatus.SUBMITTED:
        case RequestStatus.REVIEW:
        case RequestStatus.DECLINED:
          setMainAction("Approve");
          break;

        default:
          setMainAction("History");
          break;
      }
    } else {
      switch (status) {
        case RequestStatus.DRAFT:
          setMainAction("Update");
          break;
        case RequestStatus.SUBMITTED:
          setMainAction("Print");
          break;

        default:
          setMainAction("History");
          break;
      }
    }
  }, [status, isBACApprover, isReviewer]);

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

    if (isReviewer) {
      switch (status) {
        case RequestStatus.SUBMITTED:
        case RequestStatus.REVIEW:
          return [declineAction, history];
        case RequestStatus.APPROVED:
          return [declineAction];
        case RequestStatus.DECLINED:
          return [history];

        default:
          return [];
      }
    } else if (isBACApprover) {
      return [];
    } else {
      switch (status) {
        case RequestStatus.DRAFT:
          return [submitAction, deleteAction];
        case RequestStatus.SUBMITTED:
          return [history, deleteAction];

        default:
          return [];
      }
    }
  };

  return (
    <div className="action-button">
      {getActions().length === 0 ? (
        <Button label={mainAction} onClick={handleMainAction}></Button>
      ) : (
        <SplitButton
          label={mainAction}
          onClick={handleMainAction}
          model={getActions()}
        />
      )}
    </div>
  );
}

export default ActionButton;
