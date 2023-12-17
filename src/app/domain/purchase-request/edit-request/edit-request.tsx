import { useNotificationContext } from "@shared/ui/notification/notification.context";
import "./edit-request";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { PurchaseRequestControllerGetDataAsList200Response } from "@api/api";
import { useEditRequest, useGetRequestById } from "@core/query/request.query";
import {
  ItemFormSchema,
  RequestFormRule,
  RequestFormSchema,
} from "@core/model/form.rule";
import { getRequestFormDefault } from "@core/model/get-form.default";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormToApiService } from "@core/services/form-to-api.service";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorSection from "@shared/ui/error-section/error-section";
import FormRequest from "../form-request/form-request";
import HeaderContent from "@shared/ui/header-content/header-content";
import { Button } from "primereact/button";
import ItemCard from "@core/ui/item-card/item-card";
import { ApiToFormService } from "@core/services/api-to-form.service";
import AddItem from "../add-item/add-item";
import { TabPanel, TabView } from "primereact/tabview";
import { Sidebar } from "primereact/sidebar";
import { format } from "date-fns";
import { SETTINGS } from "@core/utility/settings";
import { tagTemplate } from "@core/utility/data-table-template";

export function EditRequest() {
  const { showSuccess, showError } = useNotificationContext();
  const navigate = useNavigate();
  const [dataEmpty, setDataEmpty] = useState(false);
  const { requestId } = useParams();
  const [visible, setVisible] = useState(false);
  const [defaultPrItem, setDefaultPrItem] = useState<
    ItemFormSchema | undefined
  >(undefined);

  // UNCACHED, API VALUES
  const handleGetApiSuccess = (
    data: PurchaseRequestControllerGetDataAsList200Response
  ) => {
    if (data && data.count && data.count > 0) {
      const responseData = data.data?.[0];
      setValue("prno", responseData?.pr_no);
      setValue(
        "dueDate",
        responseData?.pr_date
          ? (format(
              new Date(responseData?.pr_date),
              SETTINGS.dateFormat
            ) as any)
          : undefined
      );
      setValue("category", responseData?.category || "");
      setValue("section", responseData?.section || "");
      setValue("sai", responseData?.sai_no || "");
      setValue(
        "saiDate",
        responseData?.sai_date
          ? (format(
              new Date(responseData?.sai_date),
              SETTINGS.dateFormat
            ) as any)
          : undefined
      );
      setValue("alobs", responseData?.alobs_no || "");
      setValue(
        "alobsDate",
        responseData?.alobs_date
          ? (format(
              new Date(responseData?.alobs_date),
              SETTINGS.dateFormat
            ) as any)
          : ""
      );
      setValue("purpose", responseData?.purpose || "");

      const items = responseData?.items
        ? ApiToFormService.MapRequestItems(
            responseData.items as unknown as string
          )
        : [];
      setValue("items", items);
      setValue("urgent", responseData?.is_urgent || false);

      setDataEmpty(false);
      return;
    }

    return setDataEmpty(true);
  };
  const {
    data: requests,
    isLoading,
    isError: requestError,
  } = useGetRequestById(requestId || "", handleGetApiSuccess);

  const handleApiSuccess = () => {
    showSuccess("Request updated");
    handleBack();
  };
  const { mutate: editRequest, isError: editError } =
    useEditRequest(handleApiSuccess);

  const formMethod = useForm<RequestFormSchema>({
    // CACHED / DEFAULT VALUES
    defaultValues: getRequestFormDefault(requests?.data?.[0]),
    resolver: zodResolver(RequestFormRule),
  });
  const { handleSubmit, setValue, watch } = formMethod;
  const requestItems = watch("items");

  const handleBack = () => {
    navigate("../");
  };
  const handleValidate = (form: RequestFormSchema) => {
    const formData = FormToApiService.EditPurchaseRequest(
      form,
      requestId || ""
    );
    editRequest(formData);
  };
  const handleValidateError = (err: FieldErrors<RequestFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };

  const handleAddAnItem = () => {
    setVisible(true);
    setDefaultPrItem(undefined);
  }
  const handleEdit = (item: ItemFormSchema) => {
    setVisible(true);
    setDefaultPrItem(item);
  };
  const handleRemove = (item: ItemFormSchema) => {
    const unmatchedCode = requestItems.filter((x) => x.code !== item.code);
    setValue("items", unmatchedCode);
  };

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
    const tag = tagTemplate(data?.status_name || "none", data?.stage_name);
    return (
      <section className="mb-5">
        <h2>PR#: {data?.pr_no}</h2>
        {tag}
      </section>
    );
  };
  const formRequest = (
    <section>
      {subHeader()}
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
            <h2>{!!defaultPrItem ? 'Edit' : 'Add'} an item to current purchase request</h2>
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
        <Button
          label="Update"
          onClick={handleSubmit(handleValidate, handleValidateError)}
        />
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
