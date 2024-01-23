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
  const { isBACApprover, isReviewer, isAdmin } = useUserIdentity();

  const [mainAction, setMainAction] = useState("Update");

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
  const bacMainActions = (status: string) => {
    switch (status) {
      case RequestStatus.CATEGORIZED:
        return setMainAction("Post");

      case RequestStatus.POSTED:
        return setMainAction("Bid");

      case RequestStatus.BIDDING:
        return setMainAction("Award");

      case RequestStatus.AWARDED:
        return setMainAction("Print");

      default:
        return setMainAction("History");
    }
  };
  const approverMainActions = (status: string) => {
    switch (status) {
      case RequestStatus.POREVIEW:
      case RequestStatus.PODECLINED:
        return setMainAction("Approve");

      case RequestStatus.POAPPROVED:
        return setMainAction("Inspect");

      default:
        return setMainAction("History");
    }
  };
  const adminActions = (status: string) => {
    switch (status) {
      case RequestStatus.CATEGORIZED:
        return setMainAction("Post");

      case RequestStatus.POSTED:
        return setMainAction("Bid");

      case RequestStatus.BIDDING:
        return setMainAction("Award");

      case RequestStatus.AWARDED:
        return setMainAction("Print");

      case RequestStatus.POREVIEW:
      case RequestStatus.PODECLINED:
        return setMainAction("Approve");

      case RequestStatus.POAPPROVED:
        return setMainAction("Inspect");

      default:
        return setMainAction("History");
    }
  };
  const bacOtherActions = (status: string) => {
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
  };
  const approverOtherActions = (status: string) => {
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
  };
  const adminOtherActions = (status: string) => {
    switch (status) {
      case RequestStatus.CATEGORIZED:
        return [updateAction, history];
      case RequestStatus.POSTED:
      case RequestStatus.BIDDING:
        return [updateAction, history];
      case RequestStatus.AWARDED:
        return [reviewAction, history];
      case RequestStatus.POREVIEW:
        return [declineAction, history];
      case RequestStatus.PODECLINED:
        return [history];
      case RequestStatus.POAPPROVED:
        return [declineAction, history];

      default:
        return [];
    }
  };

  useEffect(() => {
    if (isBACApprover) {
      bacMainActions(status);
    } else if (isReviewer) {
      approverMainActions(status);
    } else if (isAdmin) {
      adminActions(status);
    } else {
      setMainAction("History");
    }
  }, [status, isBACApprover, isReviewer, isAdmin]);

  const handleMainAction = () => [onAction(mainAction)];
  const getActions = () => {
    if (isReviewer) {
      return approverOtherActions(status);
    } else if (isBACApprover) {
      return bacOtherActions(status);
    } else if (isAdmin) {
      const adminActions = adminOtherActions(status);
      return [...adminActions, print];
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
