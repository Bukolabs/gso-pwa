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
    switch (status) {
      case RequestStatus.CATEGORIZED:
        setMainAction("Update");
        break;
      case RequestStatus.POSTED:
        setMainAction("Bid");
        break;
      case RequestStatus.BIDDING:
        setMainAction("Award");
        break;
      case RequestStatus.AWARDED:
        setMainAction("Review");
        break;
      case RequestStatus.POREVIEW:
        setMainAction("Approve");
        break;

      default:
        setMainAction("History");
        break;
    }
    if (status === RequestStatus.CATEGORIZED) {
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
    const print = {
      label: "Print",
      command: () => {
        onAction("Print");
      },
    };
    const postAction = {
      label: "Post",
      command: () => {
        onAction("Post");
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

    const hasReviewerActions =
      !isRequestor && showReviewControl(status as RequestStatus);

    if (!hasReviewerActions) {
      switch (status) {
        case RequestStatus.CATEGORIZED:
          return [postAction, print, history];
        case RequestStatus.POSTED:
        case RequestStatus.BIDDING:
          return [print, history];
        case RequestStatus.AWARDED:
          return [history];
      }
    }

    switch (status) {
      case RequestStatus.AWARDED:
        return [declineAction, history];
      case RequestStatus.POREVIEW:
        return [declineAction, history];
      case RequestStatus.DECLINED:
        return [history];
      case RequestStatus.APPROVED:
        return [declineAction, history];
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
