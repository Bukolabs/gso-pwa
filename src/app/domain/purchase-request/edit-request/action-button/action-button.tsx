import "./action-button.scss";
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

  const approverActions = (status: string) => {
    switch (status) {
      case RequestStatus.SUBMITTED:
      case RequestStatus.REVIEW:
        if (isGso) {
          return [
            RequestStatusAction.Approve,
            RequestStatusAction.Print,
            RequestStatusAction.Decline,
            RequestStatusAction.History,
          ];
        }
        const _actions = [
          RequestStatusAction.Approve,
          RequestStatusAction.Decline,
          RequestStatusAction.History,
        ];
        const reviewActions = isGso
          ? [..._actions, RequestStatusAction.Print]
          : _actions;
        return reviewActions;

      case RequestStatus.APPROVED:
        if (isGso) {
          return [RequestStatusAction.History, RequestStatusAction.Print];
        }
        return [RequestStatusAction.History];

      case RequestStatus.PENDING:
        if (isGso) {
          return [RequestStatusAction.Reapprove, RequestStatusAction.History];
        }
        return [RequestStatusAction.History];

      case RequestStatus.DECLINED:
        return [RequestStatusAction.Approve, RequestStatusAction.History];

      default:
        return [RequestStatusAction.History];
    }
  };
  const bacActions = (status: string) => {
    switch (status) {
      case RequestStatus.APPROVED:
        return [RequestStatusAction.Bacdecline];
      default:
        return [RequestStatusAction.History];
    }
  };
  const adminActions = (status: string) => {
    switch (status) {
      default:
        return [RequestStatusAction.Update, RequestStatusAction.Print];
    }
  };
  const requestorActions = (status: string) => {
    switch (status) {
      case RequestStatus.DRAFT:
        return [
          RequestStatusAction.Update,
          RequestStatusAction.Submit,
          RequestStatusAction.Delete,
        ];
      case RequestStatus.SUBMITTED:
        return [RequestStatusAction.Delete];
      case RequestStatus.REVIEW:
        if (data && data.reviewer === "CTO") {
          return [RequestStatusAction.Print, RequestStatusAction.History];
        }
        return [RequestStatusAction.History];

      case RequestStatus.BACDECLINED:
        return [RequestStatusAction.Update, RequestStatusAction.Resubmit];

      default:
        return [RequestStatusAction.History];
    }
  };
  const handleMainAction = (action: string) => [onAction(action)];
  const getUserAction = () => {
    let action = [];
    if (isReviewer) {
      action = approverActions(status);
    } else if (isBACApprover) {
      action = bacActions(status);
    } else if (isAdmin) {
      action = adminActions(status);
    } else {
      action = requestorActions(status);
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
            disabled={disable}
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
              disabled={disable}
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
