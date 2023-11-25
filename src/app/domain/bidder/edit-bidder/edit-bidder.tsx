import HeaderContent from "@shared/ui/header-content/header-content";
import "./edit-bidder";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useEditBidder, useGetBidderById } from "@core/query/bidder.query";
import { BidderFormRule, BidderFormSchema } from "@core/model/form.rule";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { bidderFormDefault } from "@core/model/form.default";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormToApiService } from "@core/services/form-to-api.service";
import BidderForm from "../new-bidder/bidder-form/bidder-form";
import { BidderControllerGetDataAsList200Response } from "@api/api";
import ErrorSection from "@shared/ui/error-section/error-section";

export function EditBidder() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotificationContext();
  const { bidderId } = useParams();

  const formMethod = useForm<BidderFormSchema>({
    defaultValues: bidderFormDefault,
    resolver: zodResolver(BidderFormRule),
  });
  const { handleSubmit, setValue } = formMethod;

  const handleBack = () => {
    navigate("../");
  };
  const handleApiSuccess = () => {
    showSuccess("Bidder updated");
    handleBack();
  };
  const handleGetApiSuccess = (
    data: BidderControllerGetDataAsList200Response
  ) => {
    const bidder = data.data?.[0];
    setValue("name", bidder?.name || "");
    setValue("email", bidder?.email || "");
    setValue("mobile", bidder?.mobile || "");
    setValue("streetName", bidder?.street_name || "");
    setValue("barangay", bidder?.barangay || "");
    setValue("city", bidder?.municipality || "");
  };
  const { data: bidder } = useGetBidderById(
    bidderId || "",
    handleGetApiSuccess
  );
  const { mutate: editBidder } = useEditBidder(handleApiSuccess);

  const handleValidate = (form: BidderFormSchema) => {
    const formData = FormToApiService.EditBidder(form, bidderId || "");
    editBidder(formData);
  };
  const handleValidateError = (err: FieldErrors<BidderFormSchema>) => {
    showError("Please populate the required fields");
  };

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
          {bidder?.count && bidder?.count >= 0 ? <BidderForm /> : displayError}
        </FormProvider>
      </div>
    </div>
  );
}

export default EditBidder;
