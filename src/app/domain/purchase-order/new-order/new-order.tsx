import HeaderContent from "@shared/ui/header-content/header-content";
import "./new-order.scss";
import useScreenSize from "@core/utility/screen-size";
import { useNavigate } from "react-router-dom";
import { OrderFormRule, OrderFormSchema } from "@core/model/form.rule";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { orderFormDefault } from "@core/model/form.default";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { FormToApiService } from "@core/services/form-to-api.service";
import { MessageResponseDto } from "@api/api";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useAddOrderQy } from "@core/query/order.query";
import { TabPanel, TabView } from "primereact/tabview";
import FormOrder from "../form-order/form-order";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import ManagePr from "../manage-pr/manage-pr";

export function NewOrder() {
  const { showError, showSuccess } = useNotificationContext();
  const { isMobileMode } = useScreenSize();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const handleBack = () => {
    navigate("../");
  };

  const formMethod = useForm<OrderFormSchema>({
    defaultValues: {
      ...orderFormDefault,
    },
    resolver: zodResolver(OrderFormRule),
  });
  const { handleSubmit } = formMethod;

  const handleValidate = (form: OrderFormSchema) => {
    const formData = FormToApiService.NewOrderRequest(form);
    addPurchaseRequest(formData);
  };
  const handleValidateError = (err: FieldErrors<OrderFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };

  const handleApiSuccess = (response: MessageResponseDto) => {
    const data = response.data as any;

    showSuccess(`New purchase order created ${data.pono}`);
    handleBack();
  };
  const { mutate: addPurchaseRequest } = useAddOrderQy(handleApiSuccess);

  return (
    <div className="new-order">
      <HeaderContent title="New Order" onBack={() => navigate("../")}>
        <Button
          className="w-full block"
          label="Save"
          text={isMobileMode}
          onClick={handleSubmit(handleValidate, handleValidateError)}
        ></Button>
      </HeaderContent>

      <div className="p-7">
        <FormProvider {...formMethod}>
          <TabView className="mb-10">
            <TabPanel header="Information">
              <FormOrder />
            </TabPanel>
            <TabPanel header="Purchase Requests">
              <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
                className="w-full md:w-2/5"
              >
                <ManagePr />
              </Sidebar>
              {/* <Button
                icon="pi pi-plus"
                label="Add Request"
                className="block mb-4"
                onClick={() => {
                  setVisible(true);
                }}
              /> */}

              <div className="mt-2 md:px-6">
                <ManagePr />
              </div>
            </TabPanel>
          </TabView>
        </FormProvider>
      </div>
    </div>
  );
}

export default NewOrder;
