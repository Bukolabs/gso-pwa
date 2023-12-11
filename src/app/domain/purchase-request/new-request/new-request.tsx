import { Button } from "primereact/button";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./new-request";
import useScreenSize from "@core/utility/screen-size";
import { useNavigate } from "react-router-dom";
import { requestFormDefault } from "@core/model/form.default";
import { RequestFormRule, RequestFormSchema } from "@core/model/form.rule";
import FormRequest from "../form-request/form-request";
import HeaderContent from "@shared/ui/header-content/header-content";
import { FormToApiService } from "@core/services/form-to-api.service";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useAddRequest } from "@core/query/request.query";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import { Accordion, AccordionTab } from "primereact/accordion";
import AddItem from "../add-item/add-item";
import { Card } from "primereact/card";

export function NewRequest() {
  const { isMobile } = useScreenSize();
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotificationContext();

  const handleBack = () => {
    navigate("../");
  };
  const handleApiSuccess = () => {
    showSuccess("New purchase request created");
    handleBack();
  };
  const { mutate: addPurchaseRequest } = useAddRequest(handleApiSuccess);

  const formMethod = useForm<RequestFormSchema>({
    defaultValues: requestFormDefault,
    resolver: zodResolver(RequestFormRule),
  });
  const { handleSubmit, getValues } = formMethod;
  const requestItems = getValues("items");

  const handleValidate = (form: RequestFormSchema) => {
    const formData = FormToApiService.NewPurchaseRequest(form);
    addPurchaseRequest(formData);
  };
  const handleValidateError = (err: FieldErrors<RequestFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };

  return (
    <div className="new-request">
      <HeaderContent title="New Request" onBack={() => navigate("../")}>
        <Button
          className="w-full block"
          label="Save"
          text={isMobile}
          onClick={handleSubmit(handleValidate, handleValidateError)}
        ></Button>
      </HeaderContent>

      <div className="p-7">
        <FormProvider {...formMethod}>
          <Accordion activeIndex={0} className="block mt-4 mb-16">
            <AccordionTab header="Details">
              <FormRequest />

              <div className="mt-2 md:px-6">
                <h4 className="mb-2">Added Request Items:</h4>
                {requestItems.map((item, id) => (
                  <Card key={id} title={item.name}>
                    <p className="m-0">{item.description}</p>
                    <p className="m-0">{item.cost}</p>
                  </Card>
                ))}
              </div>
            </AccordionTab>
            <AccordionTab header="Add Item">
              <AddItem />
            </AccordionTab>
          </Accordion>
        </FormProvider>
      </div>
    </div>
  );
}

export default NewRequest;
