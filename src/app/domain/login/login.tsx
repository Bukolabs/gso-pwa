import "./login";
import { LoginFormSchema, LoginRule } from "@core/model/form.rule";
import InputControl, {
  InputControlType,
} from "@shared/ui/hook-form/input-control/input-control";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { Button } from "primereact/button";
import StorageService from "@shared/services/storage.service";
import { LoginResponseDto } from "@api/api";
import { useLoginQy } from "@core/query/authentication.query";
import { FormToApiService } from "@core/services/form-to-api.service";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import LeftContentPage from "@shared/pages/left-content-page/left-content-page";
import { LocalAuth } from "@core/model/local-auth";
import { ApiToFormService } from "@core/services/api-to-form.service";
import { AUTH } from "@core/utility/settings";
import { useNavigate } from "react-router-dom";
import { requesterRoles } from "@core/utility/user-identity.hook";

export function Login() {
  const { showError } = useNotificationContext();
  const navigate = useNavigate();
  const logo = "/icon-152x152.png";
  const bukoLogo = "/buko-logo.png";
  const [passwordType, setPasswordType] =
    useState<InputControlType>("password");

  useEffect(() => {
    StorageService.clear(AUTH);
  }, []);

  // FORM
  const formMethod = useForm<LoginFormSchema>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginRule),
  });
  const { control, handleSubmit } = formMethod;
  const handleValidate = (form: LoginFormSchema) => {
    const formData = FormToApiService.Login(form);
    loginUser(formData);
  };
  const handleValidateError = (err: FieldErrors<LoginFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };

  // LOGIN API
  const handleSuccess = (data: LoginResponseDto) => {
    const mappedData = ApiToFormService.MapLocalAuth(data);
    StorageService.save<LocalAuth>(AUTH, mappedData);

    if (requesterRoles.indexOf(mappedData.role_description) >= 0) {
      navigate("/request");
    } else navigate("/");
  };
  const { mutate: loginUser } = useLoginQy(handleSuccess);

  // LOCAL FUNCTION
  const handleRightIconAction = () => {
    const inputType = passwordType === "password" ? "text" : "password";
    setPasswordType(inputType);
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(handleValidate, handleValidateError)();
    }
  };
  const handleBukoLogo = () => {
    window.open("https://bukolabs.io/", "_blank", "noreferrer");
  };

  return (
    <div className="login">
      <LeftContentPage
        backgroundImage={`url("login-bg.jpg")`}
        rightColClassName="justify-center items-center"
      >
        <div className="flex flex-col w-[400px]">
          <div className="flex flex-col items-center">
            <img src={logo} className="w-[120px]" alt="ylp logo" />
          </div>
          <h1 className="m-0 mt-4">Login</h1>
          <span className="text-gray-600">Welcome to CGSO Tracker System</span>
          <InputControl<LoginFormSchema>
            control={control}
            name="email"
            label="Email / Organization ID"
            className="w-full"
          />
          <InputControl<LoginFormSchema>
            control={control}
            name="password"
            label="Password"
            className="w-full"
            type={passwordType}
            iconRight="pi-eye"
            iconRightAction={handleRightIconAction}
            onKeyDown={handleKeyDown}
          />
          <div className="flex flex-col w-full mt-5">
            <div className="flex justify-between mb-2 gap-2">
              <a href={`/forgot-password`}>Forgot password</a>
            </div>
            <Button
              label="Login"
              onClick={handleSubmit(handleValidate, handleValidateError)}
            />
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center"
          onClick={handleBukoLogo}
        >
          <p className="m-0 font-bold">Powered by:</p>
          <img
            src={bukoLogo}
            className="w-[150px] cursor-pointer"
            alt="buko-labs"
          />
        </div>
        <span className="text-center fixed bottom-0 right-0 text-gray-300">v240402.1</span>
      </LeftContentPage>
    </div>
  );
}

export default Login;
