import { useNotificationContext } from "@shared/ui/notification/notification.context";
import "./edit-request";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { PurchaseRequestControllerGetDataAsList200Response } from "@api/api";
import { useEditRequest, useGetRequestById } from "@core/query/request.query";
import { ItemFormRule, RequestFormSchema } from "@core/model/form.rule";
import { getRequestFormDefault } from "@core/model/get-form.default";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormToApiService } from "@core/services/form-to-api.service";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorSection from "@shared/ui/error-section/error-section";
import { Accordion, AccordionTab } from "primereact/accordion";
import FormRequest from "../form-request/form-request";
import HeaderContent from "@shared/ui/header-content/header-content";
import { Button } from "primereact/button";

export function EditRequest() {
  const { showSuccess, showError } = useNotificationContext();
  const navigate = useNavigate();
  const [dataEmpty, setDataEmpty] = useState(false);
  const { requestId } = useParams();

  const handleGetApiSuccess = (
    data: PurchaseRequestControllerGetDataAsList200Response
  ) => {
    if (data && data.count && data.count > 0) {
      const item = data.data?.[0];
      setValue("prno", item?.pr_no);
      setValue("category", item?.category || "");
      setValue("section", item?.section || "");
      setValue("sai", item?.sai_no || "");
      setValue("saiDate", item?.sai_date ? (item?.sai_date as any) : undefined);
      setValue("alobs", item?.alobs_no || "");
      setValue(
        "alobsDate",
        item?.alobs_date ? new Date(item?.alobs_date) : undefined
      );
      setValue("purpose", item?.purpose || "");

      setDataEmpty(false);
      return;
    }

    return setDataEmpty(true);
  };
  const {
    data: item,
    isLoading,
    isError: itemError,
  } = useGetRequestById(requestId || "", handleGetApiSuccess);

  const handleApiSuccess = () => {
    showSuccess("Request updated");
    handleBack();
  };
  const { mutate: editRequest, isError: editError } =
    useEditRequest(handleApiSuccess);

  const formMethod = useForm<RequestFormSchema>({
    defaultValues: getRequestFormDefault(item?.data?.[0]),
    resolver: zodResolver(ItemFormRule),
  });
  const { handleSubmit, setValue } = formMethod;

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
  const formRequest = (
    <Accordion activeIndex={0} className="block mt-4 mb-16">
      <AccordionTab header="Details">
        <FormRequest />

        {/* <div className="mt-2 md:px-6">
          <h4 className="mb-2">Added Request Items:</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-4">
            {requestItems.map((item, id) => (
              <ItemCard
                key={item.code || id}
                name={item.name}
                description={item.description}
                cost={item.cost}
                quantity={item.quantity || 11}
                totalCost={item.cost * (item.quantity || 1)}
                brand={item.brandName || ""}
                category={item.categoryName || ""}
                unit={item.unitName || ""}
              />
            ))}
          </div>
        </div> */}
      </AccordionTab>
      <AccordionTab header="Add Item">{/* <AddItem /> */}</AccordionTab>
    </Accordion>
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
          {(itemError || editError || dataEmpty) && !isLoading && displayError}
          {!isLoading && !dataEmpty && !editError ? formRequest : <></>}
        </FormProvider>
      </div>
    </div>
  );
}

export default EditRequest;
