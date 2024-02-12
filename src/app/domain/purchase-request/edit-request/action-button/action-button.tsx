import { SplitButton } from "primereact/splitbutton";
import "./action-button.scss";
import { useEffect, useState } from "react";
import {
  RequestStatus,
  RequestStatusAction,
} from "@core/model/request-status.enum";
import { useUserIdentity } from "@core/utility/user-identity.hook";
import { Button } from "primereact/button";
import { GetPurchaseRequestDto } from "@api/api";

export interface ActionButtonProps {
  status: string;
  disable: boolean;
  data?: GetPurchaseRequestDto;
  onAction: (action: string) => void;
}

export function ActionButton({
  status,
  disable,
  data,
  onAction,
}: ActionButtonProps) {
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
  const bacDeclineAction = {
    label: "BAC Decline",
    command: () => {
      onAction(RequestStatusAction.BACDECLINE);
    },
  };
  const updateAction = {
    label: "Update",
    command: () => {
      onAction("Update");
    },
  };
  const bacApproverMainActions = (status: string) => {
    switch (status) {
      default:
        setMainAction("History");
        break;
    }
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
          return [print];
        }
        return [];
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
  const bacOtherActions = (status: string) => {
    switch (status) {
      case RequestStatus.APPROVED:
      case RequestStatus.CATEGORIZED:
        return [bacDeclineAction];

      default:
        return [];
    }
  };
  const requesterOtherActions = (status: string) => {
    switch (status) {
      case RequestStatus.DRAFT:
        return [submitAction, deleteAction];
      case RequestStatus.SUBMITTED:
        return [deleteAction];
      case RequestStatus.REVIEW:
        if (data && data.is_gso) {
          return [print];
        }
        return [];

      default:
        return [];
    }
  };

  useEffect(() => {
    if (isBACApprover) {
      bacApproverMainActions(status);
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
      return bacOtherActions(status);
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
