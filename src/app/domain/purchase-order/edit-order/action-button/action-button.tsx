import "./action-button.scss";
import {
  RequestStatus,
  RequestStatusAction,
} from "@core/model/request-status.enum";
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
  const isRFQ = procurement === "RFQ";

  const handleMainAction = (action: string) => [onAction(action)];

  const approverActions = (status: string) => {
    switch (status) {
      case RequestStatus.POREVIEW:
        const common = [
          RequestStatusAction.Approve,
          RequestStatusAction.Decline,
          RequestStatusAction.Update,
          RequestStatusAction.History,
        ];
        let poreviewActions = common;
        if (isGso && isRFQ) {
          poreviewActions = [...common, RequestStatusAction.Print];
        } else if (isGso && !isRFQ) {
          poreviewActions = common;
        } else {
          poreviewActions = [
            RequestStatusAction.Approve,
            RequestStatusAction.Decline,
            RequestStatusAction.History,
          ];
        }
        return poreviewActions;

      case RequestStatus.PODECLINED:
        const otherAction = isGso
          ? [RequestStatusAction.Update, RequestStatusAction.History]
          : [RequestStatusAction.History];
        const podeclineActions = [RequestStatusAction.Approve, ...otherAction];
        return podeclineActions;

      case RequestStatus.POAPPROVED:
        let poapprovedActions = [];
        if (isGso && isRFQ) {
          poapprovedActions = [
            RequestStatusAction.Inspect,
            RequestStatusAction.History,
            RequestStatusAction.Print,
          ];
        } else if (isGso && !isRFQ) {
          poapprovedActions = [
            RequestStatusAction.Inspect,
            RequestStatusAction.History,
          ];
        } else {
          poapprovedActions = [RequestStatusAction.History];
        }
        return poapprovedActions;

      case RequestStatus.AWARDED:
        if (isGso && isRFQ) {
          return [
            RequestStatusAction.Review,
            RequestStatusAction.Update,
            RequestStatusAction.Print,
          ];
        } else if (isGso && !isRFQ) {
          return [RequestStatusAction.Review, RequestStatusAction.Update];
        }
        return [RequestStatusAction.History];

      case RequestStatus.INSPECTION:
      case RequestStatus.PARTIAL:
        if (isGso) {
          return [RequestStatusAction.Update];
        } else {
          return [RequestStatusAction.History];
        }

      case RequestStatus.COMPLETED:
        return [RequestStatusAction.History];

      default:
        return [RequestStatusAction.History];
    }
  };
  const bacActions = (status: string) => {
    switch (status) {
      case RequestStatus.CATEGORIZED:
        const categorizedActions = [
          RequestStatusAction.Update,
          RequestStatusAction.Post,
          RequestStatusAction.History,
          RequestStatusAction.Delete,
        ];
        return categorizedActions;

      case RequestStatus.POSTED:
        const postedActions = [
          RequestStatusAction.Bid,
          RequestStatusAction.Update,
          RequestStatusAction.History,
          RequestStatusAction.Delete,
        ];
        return postedActions;

      case RequestStatus.BIDDING:
        const biddingActions = [
          RequestStatusAction.Award,
          RequestStatusAction.Update,
          RequestStatusAction.History,
          RequestStatusAction.Delete,
        ];
        return biddingActions;

      case RequestStatus.AWARDED:
        const awardActions = [
          RequestStatusAction.Review,
          RequestStatusAction.History,
          RequestStatusAction.Print,
        ];
        return awardActions;

      default:
        return [RequestStatusAction.History];
    }
  };
  const adminActions = (status: string) => {
    switch (status) {
      case RequestStatus.CATEGORIZED:
        return [
          RequestStatusAction.Post,
          RequestStatusAction.Update,
          RequestStatusAction.History,
        ];

      case RequestStatus.POSTED:
        return [
          RequestStatusAction.Bid,
          RequestStatusAction.Update,
          RequestStatusAction.History,
        ];

      case RequestStatus.BIDDING:
        return [
          RequestStatusAction.Award,
          RequestStatusAction.Update,
          RequestStatusAction.History,
        ];

      case RequestStatus.AWARDED:
        return [
          RequestStatusAction.Print,
          RequestStatusAction.Review,
          RequestStatusAction.History,
        ];

      case RequestStatus.POREVIEW:
      case RequestStatus.PODECLINED:
        return [RequestStatusAction.History];

      case RequestStatus.POAPPROVED:
        return [RequestStatusAction.Inspect, RequestStatusAction.History];

      default:
        return [RequestStatusAction.History, RequestStatusAction.Print];
    }
  };
  const getUserAction = () => {
    let action = [] as RequestStatusAction[];
    if (isReviewer) {
      action = approverActions(status);
    } else if (isBACApprover) {
      action = bacActions(status);
    } else if (isAdmin) {
      action = adminActions(status);
    }

    return action;
  };
  const getSeverity = (action: string) => {
    switch (action) {
      case RequestStatusAction.Delete:
      case RequestStatusAction.Decline:
      case RequestStatusAction.Bacdecline:
        return "danger";

      default:
        return "secondary";
    }
  };

  return (
    <div className="action-button flex gap-1">
      {getUserAction().map((item, id) => {
        let display = (
          <Button
            key={id}
            label={item}
            onClick={() => handleMainAction(item)}
            disabled={disabled}
          ></Button>
        );

        if (
          (id === 0 && item === RequestStatusAction.Delete) ||
          (id === 0 && item === RequestStatusAction.Bacdecline) ||
          id !== 0
        ) {
          display = (
            <Button
              key={id}
              label={item}
              onClick={() => handleMainAction(item)}
              disabled={disabled}
              severity={getSeverity(item)}
            ></Button>
          );
        }

        return display;
      })}
    </div>
  );
}

export default ActionButton;
