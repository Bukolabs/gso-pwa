import "./login";
import { LoginFormSchema, LoginRule } from "@core/model/form.rule";
import InputControl, {
  InputControlType,
} from "@shared/ui/hook-form/input-control/input-control";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
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
import { Button } from "primereact/button";
import { generateCaptcha } from "@core/utility/generate-captcha";
export function Login() {
  const { showError, showWarning } = useNotificationContext();
  const navigate = useNavigate();
  const logo = "/icon-152x152.png";
  const bukoLogo = "/buko-logo.png";
  const [passwordType, setPasswordType] =
    useState<InputControlType>("password");
  const [captcha, setCaptcha] = useState<string>(generateCaptcha(6));

  useEffect(() => {
    StorageService.clear(AUTH);
  }, []);

  // LOGIN API
  const handleSuccess = (data: LoginResponseDto) => {
    const mappedData = ApiToFormService.MapLocalAuth(data);
    StorageService.save<LocalAuth>(AUTH, mappedData);

    if (requesterRoles.indexOf(mappedData.role_description) >= 0) {
      navigate("/rhome");
    } else navigate("/");
  };
  const { mutate: loginUser } = useLoginQy(handleSuccess);

  // FORM
  const formMethod = useForm<LoginFormSchema>({
    defaultValues: { email: "", password: "", captcha: "" },
    resolver: zodResolver(LoginRule),
  });
  const { control, reset, handleSubmit } = formMethod;
  const handleValidate = useCallback(
    (form: LoginFormSchema) => {
      if (form.captcha !== captcha) {
        showWarning("Invalid captcha. Please try again");
        return;
      }
      const formData = FormToApiService.Login(form);
      loginUser(formData);
    },
    [loginUser, captcha, showWarning]
  );
  const handleValidateError = useCallback(
    (err: FieldErrors<LoginFormSchema>) => {
      const formMessage = getFormErrorMessage(err);
      showError(formMessage);
    },
    [showError]
  );

  // LOCAL FUNCTION
  const regenerateCaptcha = () => {
    setCaptcha(generateCaptcha(6));
    reset();
  };
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
  const semanticVersion =
    process.env.REACT_APP_SEMANTIC_VERSION || "build:#240213.1-v1.3.0";

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
            label="Username"
            className="w-full"
            onKeyDown={handleKeyDown}
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
            <section>
              <div className="relative flex justify-center flex-col">
                <img
                  src={`https://dummyimage.com/120x40/000/fff&text=${captcha}`}
                  alt="Captcha"
                  style={{ pointerEvents: "none" }}
                />
                <button
                  onClick={regenerateCaptcha}
                  style={{ position: "absolute", top: 0, right: 0 }}
                  className="text-white text-xs"
                >
                  Refresh Captcha
                </button>
              </div>
              <InputControl<LoginFormSchema>
                label="Captcha"
                control={control}
                name="captcha"
                className="w-full"
                containerClassName="mb-6"
                placeholder="Enter captcha code here"
                onKeyDown={handleKeyDown}
              />
            </section>

            <Button
              label="Login"
              onClick={handleSubmit(handleValidate, handleValidateError)}
            />
          </div>
        </div>
        <div>
          <span className="block w-[400px] font-italic mt-6 mb-20 text-gray-400">
            "Be Positive and Trust the timing of everything. Just because it’s
            not happening right now doesn’t mean it never will. Stay Patient."
          </span>
        </div>
        <div
          className="flex flex-col w-[400px] items-center"
          onClick={handleBukoLogo}
        >
          <p className="m-0 font-bold">Powered by:</p>
          <img
            src={bukoLogo}
            className="w-[250px] cursor-pointer"
            alt="buko-labs"
          />
        </div>
        <span className="text-center fixed bottom-0 right-0 text-gray-300">
          {semanticVersion}
        </span>
      </LeftContentPage>
    </div>
  );
}

export default Login;
