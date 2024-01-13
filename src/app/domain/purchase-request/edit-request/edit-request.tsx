import "./edit-request";
import { FormProvider } from "react-hook-form";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorSection from "@shared/ui/error-section/error-section";
import FormRequest from "../form-request/form-request";
import HeaderContent from "@shared/ui/header-content/header-content";
import { Button } from "primereact/button";
import ItemCard from "@core/ui/item-card/item-card";
import AddItem from "../add-item/add-item";
import { TabPanel, TabView } from "primereact/tabview";
import { Sidebar } from "primereact/sidebar";
import { tagTemplate } from "@core/utility/data-table-template";
import { useEditRequest } from "./edit-request.hook";
import ReviewSection from "@core/ui/review-section/review-section";
import RequestPrint from "./request-print/request-print";
import { format } from "date-fns";
import { SETTINGS } from "@core/utility/settings";
import { InputTextarea } from "primereact/inputtextarea";
import ActionButton from "./action-button/action-button";

export function EditRequest() {
  const {
    requests,
    visible,
    defaultPrItem,
    displayRequestItems,
    formMethod,
    isLoading,
    requestError,
    editError,
    dataEmpty,
    reviewers,
    componentRef,
    remarksVisible,
    reviewRemarks,
    remarksMode,
    setVisible,
    handleAddAnItem,
    handleEdit,
    handleRemove,
    navigate,
    setRemarksVisible,
    setReviewRemarks,
    handleApprove,
    handleDecline,
    handleAction,
  } = useEditRequest();

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
    const data = requests?.data?.[0];
    const tag = tagTemplate(data?.status_name || "none");
    const dateUpdated = data?.updated_at;
    return (
      <section className="mb-5">
        <h2>PR#: {data?.pr_no}</h2>
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
  const reviewSection = () => (
    <ReviewSection classname="mb-3" reviewers={reviewers} />
  );
  const printSection = () => (
    <div style={{ display: "none" }}>
      <div ref={componentRef}>
        <RequestPrint data={requests?.data?.[0]} />
      </div>
    </div>
  );
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
          <Button label="Approve" onClick={() => handleApprove()} />
        ) : (
          <Button label="Decline" onClick={() => handleDecline()} />
        )}
      </div>
    </Sidebar>
  );
  const formRequest = (
    <section>
      {subHeader()}
      {reviewSection()}
      {printSection()}

      <TabView className="mb-10">
        <TabPanel header="Information">
          <FormRequest />
        </TabPanel>
        <TabPanel header="Request Items">
          <Sidebar
            visible={visible}
            onHide={() => setVisible(false)}
            className="w-full md:w-2/5"
          >
            <h2>
              {!!defaultPrItem ? "Edit" : "Add"} an item to current purchase
              request
            </h2>
            <AddItem
              defaultItem={defaultPrItem}
              closeSidebar={() => setVisible(false)}
            />
          </Sidebar>
          <Button
            icon="pi pi-plus"
            label="Add Item"
            className="block mb-4"
            onClick={handleAddAnItem}
          />

          <div className="mt-2 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-4">
              {displayRequestItems.map((item, id) => (
                <ItemCard
                  key={id}
                  itemNo={id}
                  item={item}
                  onEdit={handleEdit}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </div>
        </TabPanel>
      </TabView>
    </section>
  );

  return (
    <div className="edit-request">
      <HeaderContent title="Edit Request" onBack={() => navigate("../")}>
        <div className="flex gap-2">
          <ActionButton
            status={requests?.data?.[0].status_name || "DRAFT"}
            onAction={handleAction}
          />
        </div>
      </HeaderContent>

      {remarksSidebar}

      <div className="p-7">
        <FormProvider {...formMethod}>
          {isLoading && displayLoading}
          {(requestError || editError || dataEmpty) &&
            !isLoading &&
            displayError}
          {!isLoading && !dataEmpty && !editError ? formRequest : <></>}
        </FormProvider>
      </div>
    </div>
  );
}

export default EditRequest;
