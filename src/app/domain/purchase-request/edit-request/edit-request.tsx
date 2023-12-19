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
import { SplitButton } from "primereact/splitbutton";
import { useEditRequest } from "./edit-request.hook";
import ReviewSection from "@core/ui/review-section/review-section";
import RequestPrint from "./request-print/request-print";

export function EditRequest() {
  const {
    requests,
    visible,
    defaultPrItem,
    requestItems,
    actions,
    formMethod,
    isLoading,
    requestError,
    editError,
    dataEmpty,
    reviewers,
    componentRef,
    setVisible,
    handleAddAnItem,
    handleEdit,
    handleRemove,
    navigate,
    handleSubmit,
    handleValidate,
    handleValidateError,
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
    return (
      <section className="mb-5">
        <h2>PR#: {data?.pr_no}</h2>
        {tag}
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
              {requestItems.map((item, id) => (
                <ItemCard
                  key={item.code || id}
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
          <SplitButton
            label="Update"
            onClick={handleSubmit(handleValidate, handleValidateError)}
            model={actions}
          />
        </div>
      </HeaderContent>
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
