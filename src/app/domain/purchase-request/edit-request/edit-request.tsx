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
import PurchaseHistory from "@core/ui/purchase-history/purchase-history";
import { RequestStatus } from "@core/model/request-status.enum";
import { FormCategoryItemProvider } from "@domain/item/new-item/form-category-item/form-category-item.context";
import { currencyFormat } from "@shared/formats/currency-format";
import { numberFormat } from "@shared/formats/number-format";
import ItemBulkUploader from "../item-bulk-uploader/item-bulk-uploader";
import RequestItemList from "../request-item-list/request-item-list";
import { FormUnitItemProvider } from "@domain/item/new-item/form-unit-item/form-unit-item.context";

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
    componentRef,
    remarksVisible,
    reviewRemarks,
    remarksMode,
    historySidebar,
    historyData,
    isUpdating,
    isProcessing,
    isDeleting,
    isRestrictedView,
    isAdmin,
    isRequestor,
    isGso,
    setVisible,
    handleAddAnItem,
    handleEdit,
    handleRemove,
    navigate,
    setRemarksVisible,
    setReviewRemarks,
    handleReviewAction,
    handleAction,
    getStageReviewers,
    setHistorySidebar,
    handleAddItem,
  } = useEditRequest();

  const statusName = requests?.data?.[0].status_name;
  const allEditPRItems =
    statusName === RequestStatus.DRAFT ||
    statusName === RequestStatus.BACDECLINED;

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
    const totalAmount = data?.total_amount || 0;
    const totalQuantity = data?.total_quantity || 0;

    return (
      <section className="flex flex-col md:flex-row md:justify-between">
        <section className="mb-5 flex justify-between flex-col">
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
        {isAdmin || isRequestor || isGso ? (
          <section className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
            <div className="border border-gray-200 rounded p-5 text-center bg-white">
              <p className="block font-bold">
                {currencyFormat(totalAmount, "PHP")}
              </p>
              <label className="block hint">Total Amount</label>
            </div>
            <div className="border border-gray-200 rounded p-5 text-center bg-white">
              <p className="block font-bold">{numberFormat(totalQuantity)}</p>
              <label className="block hint">Total Quantity</label>
            </div>
          </section>
        ) : null}
      </section>
    );
  };
  const reviewSection = () => (
    <ReviewSection classname="mb-3" reviewers={getStageReviewers()} />
  );
  const printSection = () => (
    <div style={{ display: "none" }}>
      <div ref={componentRef}>
        <RequestPrint data={requests?.data?.[0]} />
      </div>
    </div>
  );
  const remarksSidebar = () => {
    return (
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
          <Button
            label={remarksMode}
            onClick={() => handleReviewAction(remarksMode)}
          />
        </div>
      </Sidebar>
    );
  };
  const historySection = (
    <Sidebar
      visible={historySidebar}
      position="right"
      onHide={() => setHistorySidebar(false)}
      className="w-full md:w-[500px]"
    >
      <PurchaseHistory data={historyData} />
    </Sidebar>
  );
  const itemSection = (
    <Sidebar
      visible={visible}
      onHide={() => setVisible(false)}
      className="w-full md:w-2/5"
    >
      <h2>
        {!!defaultPrItem ? "Edit" : "Add"} an item to current purchase request
      </h2>
      <AddItem defaultItem={defaultPrItem} onAddItem={() => handleAddItem()} />
    </Sidebar>
  );
  const formRequest = (
    <section>
      {subHeader()}
      {reviewSection()}
      {printSection()}
      {historySection}
      {itemSection}

      {!isRestrictedView && (
        <FormCategoryItemProvider>
          <FormUnitItemProvider>
            <TabView className="mb-10">
              <TabPanel header="Information">
                <FormRequest />
              </TabPanel>
              <TabPanel header="Request Items">
                {allEditPRItems && (
                  <section className="flex gap-2">
                    <Button
                      icon="pi pi-plus"
                      label="Add Item"
                      className="block mb-4"
                      onClick={handleAddAnItem}
                    />
                    <ItemBulkUploader />
                  </section>
                )}

                <RequestItemList
                  requestItems={displayRequestItems}
                  onEdit={handleEdit}
                  onRemove={handleRemove}
                  showActions={allEditPRItems}
                />
              </TabPanel>
            </TabView>
          </FormUnitItemProvider>
        </FormCategoryItemProvider>
      )}
    </section>
  );

  return (
    <div className="edit-request">
      <HeaderContent title="Edit Request" onBack={() => navigate("../")}>
        <div className="flex gap-2">
          <ActionButton
            data={requests?.data?.[0]}
            status={requests?.data?.[0].status_name || ""}
            onAction={handleAction}
            disable={isUpdating || isProcessing || isDeleting}
          />
        </div>
      </HeaderContent>

      {remarksSidebar()}

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
