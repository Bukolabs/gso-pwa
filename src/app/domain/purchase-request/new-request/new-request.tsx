import { Button } from "primereact/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HeaderContent from "../../../core/ui/header-content/header-content";
import "./new-request";
import useScreenSize from "../../../core/utility/screen-size";
import { useNavigate } from "react-router-dom";
import { requestFormDefault } from "../../../core/model/form.default";
import {
  RequestFormRule,
  RequestFormSchema,
} from "../../../core/model/form.rule";
import FormRequest from "../form-request/form-request";

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
        <div className="flex gap-2">
          <Button
            className="w-full block"
            label="Save"
            text={isMobile}
          ></Button>
        </div>
      </HeaderContent>

      <FormProvider {...formMethod}>
        <FormRequest />
      </FormProvider>
    </div>
  );
}

export default NewRequest;
