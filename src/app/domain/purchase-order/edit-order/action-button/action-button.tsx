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
      switch (status) {
        case RequestStatus.CATEGORIZED:
          setMainAction("Post");
          break;
        case RequestStatus.POSTED:
          setMainAction("Bid");
          break;
        case RequestStatus.BIDDING:
          setMainAction("Award");
          break;
        case RequestStatus.AWARDED:
          setMainAction("Print");
          break;

        default:
          setMainAction("History");
          break;
      }
    } else if (isReviewer) {
      switch (status) {
        case RequestStatus.POREVIEW:
        case RequestStatus.PODECLINED:
          setMainAction("Approve");
          break;
        case RequestStatus.POAPPROVED:
          setMainAction("Inspect");
          break;
        default:
          setMainAction("History");
          break;
      }
    } else {
      setMainAction("History");
    }
  }, [status, isBACApprover, isReviewer]);

  const handleMainAction = () => [onAction(mainAction)];
  const getActions = () => {
    const updateAction = {
      label: "Update",
      command: () => {
        onAction("Update");
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
    const declineAction = {
      label: "Decline",
      command: () => {
        onAction("Decline");
      },
    };
    const reviewAction = {
      label: "Review",
      command: () => {
        onAction("Review");
      },
    };

    if (isReviewer) {
      switch (status) {
        case RequestStatus.POREVIEW:
          return [declineAction, history];
        case RequestStatus.PODECLINED:
          return [history];
        case RequestStatus.POAPPROVED:
          return [declineAction, history];

        default:
          return [];
      }
    } else if (isBACApprover) {
      switch (status) {
        case RequestStatus.CATEGORIZED:
          return [updateAction, history];
        case RequestStatus.POSTED:
        case RequestStatus.BIDDING:
          return [updateAction, history];
        case RequestStatus.AWARDED:
          return [reviewAction, history];

        default:
          return [];
      }
    } else {
      return [];
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
