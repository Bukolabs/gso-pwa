import HeaderContent from "@shared/ui/header-content/header-content";
import "./edit-bidder";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useEditBidder, useGetBidderById } from "@core/query/bidder.query";
import { BidderFormRule, BidderFormSchema } from "@core/model/form.rule";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import {
  getBidderFormDefault,
} from "@core/model/form.default";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormToApiService } from "@core/services/form-to-api.service";
import BidderForm from "../new-bidder/bidder-form/bidder-form";
import { BidderControllerGetDataAsList200Response } from "@api/api";
import ErrorSection from "@shared/ui/error-section/error-section";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import { useState } from "react";
import { getFormErrorMessage } from "@core/utility/get-error-message";

export function EditBidder() {
  const navigate = useNavigate();
  const [dataEmpty, setDataEmpty] = useState(false);
  const { showError, showSuccess } = useNotificationContext();
  const { bidderId } = useParams();

  const handleGetApiSuccess = (
    data: BidderControllerGetDataAsList200Response
  ) => {
    if (data && data.count && data.count > 0) {
      const bidder = data.data?.[0];
      setValue("name", bidder?.name || "");
      setValue("email", bidder?.email || "");
      setValue("mobile", bidder?.mobile || "");
      setValue("streetName", bidder?.street_name || "");
      setValue("barangay", bidder?.barangay || "");
      setValue("city", bidder?.municipality || "");
      setDataEmpty(false);
      return;
    }

    return setDataEmpty(true);
  };
  const {
    data: bidder,
    isLoading,
    isError: bidderError,
  } = useGetBidderById(bidderId || "", handleGetApiSuccess);
  const handleApiSuccess = () => {
    showSuccess("Bidder updated");
    handleBack();
  };
  const { mutate: editBidder, isError: editError } =
    useEditBidder(handleApiSuccess);

  const formMethod = useForm<BidderFormSchema>({
    defaultValues: getBidderFormDefault(bidder?.data?.[0]),
    resolver: zodResolver(BidderFormRule),
  });
  const { handleSubmit, setValue } = formMethod;

  const handleBack = () => {
    navigate("../");
  };
  const handleValidate = (form: BidderFormSchema) => {
    const formData = FormToApiService.EditBidder(form, bidderId || "");
    editBidder(formData);
  };
  const handleValidateError = (err: FieldErrors<BidderFormSchema>) => {
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


  return (
    <div className="edit-bidder">
      <HeaderContent title="Edit Bidder" onBack={() => navigate("../")}>
        <Button
          label="Update"
          onClick={handleSubmit(handleValidate, handleValidateError)}
        />
      </HeaderContent>
      <div className="p-7">
        <FormProvider {...formMethod}>
          {isLoading && displayLoading}
          {(bidderError || editError || dataEmpty) &&
            !isLoading &&
            displayError}
          {!isLoading && !dataEmpty && <BidderForm />}
        </FormProvider>
      </div>
    </div>
  );
}

export default EditBidder;
