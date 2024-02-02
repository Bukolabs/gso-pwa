import { SplitButton } from "primereact/splitbutton";
import "./action-button.scss";
import { useEffect, useState } from "react";
import { RequestStatus } from "@core/model/request-status.enum";
import { useUserIdentity } from "@core/utility/user-identity.hook";
import { Button } from "primereact/button";

export interface ActionButtonProps {
  status: string;
  disabled?: boolean;
  procurement?: string;
  onAction: (action: string) => void;
}

export function ActionButton({
  status,
  disabled,
  procurement,
  onAction,
}: ActionButtonProps) {
  const { isBACApprover, isReviewer, isAdmin, isGso } = useUserIdentity();

  const [mainAction, setMainAction] = useState("Update");

  const getAction = (action: string) => {
    return {
      label: action,
      command: () => {
        onAction(action);
      },
    };
  };
  const updateAction = getAction("Update");
  const postAction = getAction("Post");
  const print = getAction("Print");
  const history = getAction("History");
  const deleteAction = getAction("Delete");
  const declineAction = getAction("Decline");
  const reviewAction = getAction("Review");
  const isRFQ = procurement === "RFQ";

  const bacMainActions = (status: string) => {
    switch (status) {
      case RequestStatus.CATEGORIZED:
        return setMainAction("Update");

      case RequestStatus.POSTED:
        return setMainAction("Bid");

      case RequestStatus.BIDDING:
        return setMainAction("Award");

      case RequestStatus.AWARDED:
        return setMainAction("Review");

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
        if (isGso) {
          setMainAction("Inspect");
        } else {
          setMainAction("History");
        }
        return;

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
        return [postAction, history, deleteAction];
      case RequestStatus.POSTED:
      case RequestStatus.BIDDING:
        return [updateAction, history, deleteAction];
      case RequestStatus.AWARDED:
        return [history, print];

      default:
        return [];
    }
  };
  const approverOtherActions = (status: string) => {
    switch (status) {
      case RequestStatus.AWARDED:
        if (isGso && isRFQ) {
          return [reviewAction, updateAction, print];
        } else if (isGso && !isRFQ) {
          return [updateAction];
        }
        return [history];

      case RequestStatus.POREVIEW:
        if (isGso && isRFQ) {
          return [declineAction, updateAction, history, print];
        } else if (isGso && !isRFQ) {
          return [declineAction, updateAction, history];
        }
        return [declineAction, history];
      case RequestStatus.PODECLINED:
        return [history];
      case RequestStatus.POAPPROVED:
        if (isGso && isRFQ) {
          return [history, print];
        } else if (isGso && !isRFQ) {
          return [history];
        } else {
          return [declineAction];
        }

      case RequestStatus.INSPECTION:
        if (isGso) {
          return [updateAction];
        } else {
          return [];
        }

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
        <Button
          label={mainAction}
          onClick={handleMainAction}
          disabled={disabled}
        ></Button>
      ) : (
        <SplitButton
          label={mainAction}
          onClick={handleMainAction}
          model={getActions()}
          disabled={disabled}
        />
      )}
    </div>
  );
}

export default ActionButton;
