import { useAddBidder } from "@core/query/bidder.query";
import "./new-bidder";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { BidderFormRule, BidderFormSchema } from "@core/model/form.rule";
import { HeaderContent } from "@shared/ui/header-content/header-content";
import { bidderFormDefault } from "@core/model/form.default";
import { zodResolver } from "@hookform/resolvers/zod";
import BidderForm from "./bidder-form/bidder-form";
import { FormToApiService } from "@core/services/form-to-api.service";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "@shared/ui/notification/notification.context";

export function NewBidder() {
  const navigate = useNavigate();
  const { showError } = useNotificationContext();

  const handleApiSuccess = () => handleBack();
  const { mutate: addBidder } = useAddBidder(handleApiSuccess);

  const formMethod = useForm<BidderFormSchema>({
    defaultValues: bidderFormDefault,
    resolver: zodResolver(BidderFormRule),
  });
  const { handleSubmit } = formMethod;

  const handleBack = () => {
    navigate("../");
  };

  const handleValidate = (form: BidderFormSchema) => {
    const formData = FormToApiService.NewBidder(form);
    addBidder(formData);
  };
  const handleValidateError = (err: FieldErrors<BidderFormSchema>) => {
    showError("Please populate the required fields");
  };

  return (
    <div className="new-bidder">
      <HeaderContent title="New Bidder" onBack={() => navigate("../")}>
        <Button
          label="Save"
          onClick={handleSubmit(handleValidate, handleValidateError)}
        />
      </HeaderContent>

      <div className="p-7">
        <FormProvider {...formMethod}>
          <BidderForm />
        </FormProvider>
      </div>
    </div>
  );
}

export default NewBidder;
