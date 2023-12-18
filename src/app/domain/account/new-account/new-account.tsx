import "./new-account";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useAddPersonQy } from "@core/query/account.query";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { AccountFormRule, AccountFormSchema } from "@core/model/form.rule";
import { accountFormDefault } from "@core/model/form.default";
import { FormToApiService } from "@core/services/form-to-api.service";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import HeaderContent from "@shared/ui/header-content/header-content";
import { Button } from "primereact/button";
import FormAccount from "../form-account/form-account";

export function NewAccount() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotificationContext();

  const handleBack = () => {
    navigate("../");
  };
  const handleApiSuccess = () => {
    showSuccess("New account created");
    handleBack();
  };
  const { mutate: addBidder } = useAddPersonQy(handleApiSuccess);

  const formMethod = useForm<AccountFormSchema>({
    defaultValues: accountFormDefault,
    resolver: zodResolver(AccountFormRule),
  });
  const { handleSubmit } = formMethod;

  const handleValidate = (form: AccountFormSchema) => {
    const formData = FormToApiService.NewAccount(form);
    addBidder(formData);
  };
  const handleValidateError = (err: FieldErrors<AccountFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };

  return (
    <div className="new-account">
      <HeaderContent title="New Account" onBack={() => handleBack()}>
        <Button
          label="Save"
          onClick={handleSubmit(handleValidate, handleValidateError)}
        />
      </HeaderContent>

      <div className="p-7">
        <FormProvider {...formMethod}>
          <FormAccount />
        </FormProvider>
      </div>
    </div>
  );
}

export default NewAccount;
