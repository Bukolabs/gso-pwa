import { Button } from "primereact/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./new-request";
import useScreenSize from "@core/utility/screen-size";
import { useNavigate } from "react-router-dom";
import { requestFormDefault } from "@core/model/form.default";
import { RequestFormRule, RequestFormSchema } from "@core/model/form.rule";
import FormRequest from "../form-request/form-request";
import HeaderContent from "@shared/ui/header-content/header-content";

export function NewRequest() {
  const { isMobile } = useScreenSize();
  const navigate = useNavigate();

  const formMethod = useForm<RequestFormSchema>({
    defaultValues: requestFormDefault,
    resolver: zodResolver(RequestFormRule),
  });

  return (
    <div className="new-request">
      <HeaderContent title="New Request" onBack={() => navigate("../")}>
        <Button className="w-full block" label="Save" text={isMobile}></Button>
      </HeaderContent>

      <div className="p-7">
        <FormProvider {...formMethod}>
          <FormRequest />
        </FormProvider>
      </div>
    </div>
  );
}

export default NewRequest;
