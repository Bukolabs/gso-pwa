import { SyntheticEvent, useState } from "react";
import "./notification-page.scss";
import { useQyGetNotification } from "@core/query/notification.query";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { dateFormat } from "@shared/formats/date-time-format";
import { Avatar } from "primereact/avatar";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorSection from "@shared/ui/error-section/error-section";
import { Button } from "primereact/button";
import {
  useQyBlockAccount,
  useQyUnblockAccount,
} from "@core/query/account.query";
import { GetNotificationDto } from "@api/api";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useUserIdentity } from "@core/utility/user-identity.hook";

export function NotificationPage() {
  const { isAdmin } = useUserIdentity();
  const [rowLimit, setRowLimit] = useState(5);
  const { showSuccess } = useNotificationContext();
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm] = useState("");
  const [first, setFirst] = useState(0);

  // GET NOTIFICATION API
  const {
    data: notificationResponse,
    error,
    isLoading,
    isError,
  } = useQyGetNotification(
    searchTerm,
    rowLimit,
    pageNumber,
    undefined,
    undefined
  );

  // BLOCK API
  const handleBlockSuccess = () => {
    showSuccess("User is blocked");
  };
  const { mutate: blockAccount } = useQyBlockAccount(handleBlockSuccess);

  // UNBLOCK API
  const handleUnblockSuccess = () => {
    showSuccess("User is unblocked");
  };
  const { mutate: unblockAccount } = useQyUnblockAccount(handleUnblockSuccess);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    const offsetValue = event.page * rowLimit;
    setFirst(event.first);
    setPageNumber(offsetValue);
    setRowLimit(event.rows);
  };
  const handleBlock = (item: GetNotificationDto) => {
    blockAccount({
      code: item.created_by || "",
    });
  };
  const handleUnblock = (item: GetNotificationDto) => {
    unblockAccount({
      code: item.created_by || "",
    });
  };

  const displayLoading = (
    <div className="card">
      <SkeletonList count={4} />
    </div>
  );
  const displayError = (
    <div className="card">
      <ErrorSection title="Error Occured" message={(error as any)?.message} />
    </div>
  );
  const notificationList = (
    <>
      <section className="grid grid-cols-1 gap-2 md:gap-4 p-7 items-baseline">
        {(notificationResponse?.data || []).map((item, id) => {
          return (
            <div key={id} className="flex gap-2">
              <div className="w-20">
                <Avatar
                  icon="pi pi-bell"
                  size="large"
                  style={{
                    backgroundColor: "#2196F3",
                    color: "#ffffff",
                  }}
                  shape="circle"
                />
              </div>

              <div className="flex flex-col flex-wrap">
                <h3>{item.title}</h3>
                <span>{item.message}</span>
                <small>{dateFormat(item.updated_at)}</small>
                {item.action === "LOGIN" && isAdmin ? (
                  <div className="flex gap-2">
                    <Button label="Block" onClick={() => handleBlock(item)} />
                    <Button
                      outlined
                      label="Unblock"
                      onClick={() => handleUnblock(item)}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </section>
      <Paginator
        first={first}
        rows={rowLimit}
        totalRecords={notificationResponse?.count}
        onPageChange={onPageChange}
        className="mb-20"
      />
    </>
  );

  return (
    <div className="notification-page">
      <h2>Notification</h2>
      <h5>
        Total: <b>{notificationResponse?.count}</b>
      </h5>

      {isLoading && displayLoading}
      {isError && !isLoading && displayError}
      {!isLoading && !isError && notificationList}
    </div>
  );
}

export default NotificationPage;
