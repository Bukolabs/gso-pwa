import HeaderContent from "@shared/ui/header-content/header-content";
import "./edit-order.scss";
import { useEditOrder } from "./edit-order.hook";
import { FormProvider } from "react-hook-form";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorSection from "@shared/ui/error-section/error-section";
import { tagTemplate } from "@core/utility/data-table-template";
import { format } from "date-fns";
import { SETTINGS } from "@core/utility/settings";
import { TabPanel, TabView } from "primereact/tabview";
import FormOrder from "../form-order/form-order";
import { Sidebar } from "primereact/sidebar";
import ManagePr from "../manage-pr/manage-pr";
import ActionButton from "./action-button/action-button";
import PrintOrder from "./print-order/print-order";
import FormBidder from "./form-bidder/form-bidder";
import { ConfirmDialog } from "primereact/confirmdialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import ReviewSection from "@core/ui/review-section/review-section";
import { RequestStatus } from "@core/model/request-status.enum";

export function EditOrder() {
  const {
    formMethod,
    orders,
    isLoading,
    orderError,
    dataEmpty,
    visible,
    editError,
    category,
    selectedRequests,
    componentRef,
    remarksVisible,
    remarksMode,
    reviewRemarks,
    reviewers,
    navigate,
    setVisible,
    handleSelectedRequests,
    handleAction,
    setRemarksVisible,
    setReviewRemarks,
    handleReviewAction,
  } = useEditOrder();

  const status = orders?.data?.[0].status_name;

  const displayLoading = (
    <div className="card">
      <SkeletonList count={4} />
    </div>
  );
  const displayError = (
    <div className="card">
      <ErrorSection
        title="No Data"
        message="No data found in selected record. Please try again."
      />
    </div>
  );
  const subHeader = () => {
    const data = orders?.data?.[0];
    const tag = tagTemplate(data?.status_name || "none");
    const dateUpdated = data?.updated_at;

    return (
      <section className="mb-5">
        <h2>PO#: {data?.po_no}</h2>
        <div>{tag}</div>
        <span className="flex gap-1 mt-1">
          <label className="hint">Date Updated:</label>
          <p className="hint">
            {dateUpdated
              ? format(new Date(dateUpdated), SETTINGS.dateFormat)
              : ""}
          </p>
        </span>
      </section>
    );
  };
  const remarksSidebar = (
    <Sidebar visible={remarksVisible} onHide={() => setRemarksVisible(false)}>
      <label>Remarks</label>
      <InputTextarea
        value={reviewRemarks}
        onChange={(e) => setReviewRemarks(e.target.value)}
        rows={5}
        cols={30}
      />
      <small className="text-gray-400 mb-1 block">
        Enter reason why you are approving/disapproving the item
      </small>

      <div className="flex justify-end mt-5">
        {remarksMode === "approve" ? (
          <Button
            label="Approve"
            onClick={() => handleReviewAction("approve")}
          />
        ) : (
          <Button
            label="Decline"
            onClick={() => handleReviewAction("decline")}
          />
        )}
      </div>
    </Sidebar>
  );
  const reviewSection = () => (
    <ReviewSection classname="mb-3" reviewers={reviewers} />
  );
  const printSection = () => (
    // <div>
    <div style={{ display: "none" }}>
      <div ref={componentRef}>
        <PrintOrder data={orders?.data?.[0]} />
      </div>
    </div>
  );
  const orderTab = (
    <section>
      {subHeader()}
      {reviewSection()}
      {printSection()}

      <TabView className="mb-10">
        <TabPanel header="Information">
          <FormOrder />
        </TabPanel>
        <TabPanel header="Purchase Requests">
          <Sidebar
            visible={visible}
            onHide={() => setVisible(false)}
            className="w-full md:w-2/5"
          >
            PR Details
          </Sidebar>

          <div className="mt-2 md:px-6">
            <ManagePr
              category={category}
              selectedList={selectedRequests}
              onSelect={handleSelectedRequests}
            />
          </div>
        </TabPanel>
        {status === RequestStatus.BIDDING && (
          <TabPanel header="Supplier">
            <FormBidder />
          </TabPanel>
        )}
      </TabView>
    </section>
  );

  return (
    <div className="edit-order">
      <HeaderContent title="Edit Order" onBack={() => navigate("../")}>
        <div className="flex gap-2">
          <ActionButton
            status={orders?.data?.[0].status_name || ""}
            onAction={handleAction}
          />
        </div>
      </HeaderContent>

      <ConfirmDialog />
      {remarksSidebar}

      <div className="p-7">
        <FormProvider {...formMethod}>
          {isLoading && displayLoading}
          {(orderError || editError || dataEmpty) && !isLoading && displayError}
          {!isLoading && !dataEmpty && !editError ? orderTab : <></>}
        </FormProvider>
      </div>
    </div>
  );
}

export default EditOrder;
