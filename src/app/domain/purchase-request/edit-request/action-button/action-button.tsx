import { SplitButton } from "primereact/splitbutton";
import "./action-button.scss";
import { useEffect, useState } from "react";
import { RequestStatus } from "@core/model/request-status.enum";
import { useUserIdentity } from "@core/utility/user-identity.hook";
import { Button } from "primereact/button";

export interface ActionButtonProps {
  status: string;
  disable: boolean;
  onAction: (action: string) => void;
}

export function ActionButton({ status, disable, onAction }: ActionButtonProps) {
  const { isBACApprover, isReviewer, isAdmin, isGso } = useUserIdentity();
  const [mainAction, setMainAction] = useState("History");
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
  const approverMainActions = (status: string) => {
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
  };
  const requesterMainActions = (status: string) => {
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
  };
  const approverOtherActions = (status: string) => {
    switch (status) {
      case RequestStatus.SUBMITTED:
      case RequestStatus.REVIEW:
        if (isGso) {
          return [print, declineAction, history];
        }
        return [declineAction, history];
      case RequestStatus.APPROVED:
        if (isGso) {
          return [print, declineAction];
        }
        return [declineAction];
      case RequestStatus.DECLINED:
        return [history];

      default:
        return [];
    }
  };
  const adminOtherActions = (status: string) => {
    switch (status) {
      case RequestStatus.SUBMITTED:
        return [];

      default:
        return [print];
    }
  };
  const requesterOtherActions = (status: string) => {
    switch (status) {
      case RequestStatus.DRAFT:
        return [submitAction, deleteAction];
      case RequestStatus.SUBMITTED:
        return [history, deleteAction];

      default:
        return [];
    }
  };

  useEffect(() => {
    if (isBACApprover) {
      setMainAction("History");
    } else if (isReviewer) {
      approverMainActions(status);
    } else {
      requesterMainActions(status);
    }
  }, [status, isBACApprover, isReviewer, isAdmin]);

  const handleMainAction = () => [onAction(mainAction)];
  const getActions = () => {
    if (isReviewer) {
      return approverOtherActions(status);
    } else if (isBACApprover) {
      return [];
    } else if (isAdmin) {
      return adminOtherActions(status);
    } else {
      return requesterOtherActions(status);
    }
  };

  return (
    <div className="action-button">
      {getActions().length === 0 ? (
        <Button
          label={mainAction}
          onClick={handleMainAction}
          disabled={disable}
        ></Button>
      ) : (
        <SplitButton
          label={mainAction}
          onClick={handleMainAction}
          model={getActions()}
          disabled={disable}
        />
      )}
    </div>
  );
}

export default ActionButton;
