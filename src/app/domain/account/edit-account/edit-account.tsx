import HeaderContent from "@shared/ui/header-content/header-content";
import "./edit-account";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useNavigate, useParams } from "react-router-dom";
import { AccountFormRule, AccountFormSchema } from "@core/model/form.rule";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { getAccountFormDefault } from "@core/model/get-form.default";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import {
  useEditPersonQy,
  useGetAccountByIdQy,
  useQyUpdatePassword,
} from "@core/query/account.query";
import { useState } from "react";
import { PersonControllerGetDataAsList200Response } from "@api/api";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorSection from "@shared/ui/error-section/error-section";
import FormAccount from "../form-account/form-account";
import { FormToApiService } from "@core/services/form-to-api.service";
import { SplitButton } from "primereact/splitbutton";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export function EditAccount() {
  const { showSuccess, showWarning, showError } = useNotificationContext();
  const navigate = useNavigate();
  const [dataEmpty, setDataEmpty] = useState(false);
  const { accountId } = useParams();
  const [visible, setVisible] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [repasswordValue, setRepasswordValue] = useState("");
  const actions = [
    {
      label: "Change Password",
      command: () => {
        setVisible(true);
      },
    },
  ];

  // GET API
  const handleGetApiSuccess = (
    data: PersonControllerGetDataAsList200Response
  ) => {
    if (data && data.count && data.count > 0) {
      const item = data.data?.[0];
      setValue("name", item?.person_first_name || "");
      setValue("username", item?.person_username || "");
      setValue("lastName", item?.person_last_name || "");
      setValue("email", item?.person_email || "");
      setValue("mobile", item?.person_mobile || "");
      setValue("role", item?.role_code || "");
      setValue("department", item?.department_code || "");
      return;
    }

    return setDataEmpty(true);
  };
  const {
    data: accounts,
    isLoading,
    isError: itemError,
  } = useGetAccountByIdQy(accountId || "", handleGetApiSuccess);

  // EDIT API
  const handleApiSuccess = () => {
    showSuccess("Account updated");
    handleBack();
  };
  const { mutate: editItem, isError: editError } =
    useEditPersonQy(handleApiSuccess);

  // CHANGE PASSWORD API
  const handleChangePasswordApiSuccess = () => {
    showSuccess("Password successfully changed");
    handleBack();
  };
  const { mutate: editPassword } = useQyUpdatePassword(
    handleChangePasswordApiSuccess
  );

  const formMethod = useForm<AccountFormSchema>({
    defaultValues: getAccountFormDefault(accounts?.data?.[0]),
    resolver: zodResolver(AccountFormRule),
  });
  const { handleSubmit, setValue } = formMethod;

  const handleValidate = (form: AccountFormSchema) => {
    const formData = FormToApiService.EditAccount(form, accountId || "");
    editItem(formData);
  };
  const handleValidateError = (err: FieldErrors<AccountFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };
  const handleBack = () => {
    navigate("../");
  };
  const handleChangePassword = () => {
    if (passwordValue !== repasswordValue) {
      showWarning("New password unmatched with retyped new password");
      return;
    }

    setVisible(false);
    const formData = FormToApiService.ChangePassword(
      passwordValue,
      accountId || ""
    );
    editPassword(formData);
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
  const changePasswordSidebar = (
    <Sidebar visible={visible} onHide={() => setVisible(false)}>
      <h2>Change Password</h2>
      <InputText
        value={passwordValue}
        placeholder="Set new password"
        type="password"
        className="block"
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      <InputText
        value={repasswordValue}
        placeholder="Retype new password"
        type="password"
        className="block"
        onChange={(e) => setRepasswordValue(e.target.value)}
      />
      <Button label="Submit" onClick={handleChangePassword}></Button>
    </Sidebar>
  );

  return (
    <div className="edit-account">
      <HeaderContent title="Edit Account" onBack={() => navigate("../")}>
        <SplitButton
          label="Update"
          onClick={handleSubmit(handleValidate, handleValidateError)}
          model={actions}
        />
      </HeaderContent>

      <div className="p-7">
        <FormProvider {...formMethod}>
          {changePasswordSidebar}

          {isLoading && displayLoading}
          {(itemError || editError || dataEmpty) && !isLoading && displayError}
          {!isLoading && !dataEmpty && <FormAccount isEdit={true} />}
        </FormProvider>
      </div>
    </div>
  );
}

export default EditAccount;
