import HeaderContent from "@shared/ui/header-content/header-content";
import "./new-order.scss";
import useScreenSize from "@core/utility/screen-size";
import { useNavigate } from "react-router-dom";
import {
  OrderFormRule,
  OrderFormSchema,
  RequestInOrderFormSchema,
} from "@core/model/form.rule";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { orderFormDefault } from "@core/model/form.default";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { FormToApiService } from "@core/services/form-to-api.service";
import { GetPurchaseRequestDto, MessageResponseDto } from "@api/api";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useAddOrderQy } from "@core/query/order.query";
import { TabPanel, TabView } from "primereact/tabview";
import FormOrder from "../form-order/form-order";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import ManagePr from "../manage-pr/manage-pr";
import { RequestStatus } from "@core/model/request-status.enum";

export function NewOrder() {
  const { showError, showSuccess, showWarning } = useNotificationContext();
  const { isMobileMode } = useScreenSize();
  const [selectedRequests, setSelectedRequests] = useState<
    GetPurchaseRequestDto[]
  >([]);
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
  const { handleSubmit, watch, setValue, getValues } = formMethod;
  const category = watch("category");

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

  const handleSelectedRequests = (requests: GetPurchaseRequestDto[]) => {
    const poNo = getValues("pono");
    if (!poNo) {
      showWarning(
        "No Purchase Order number is supplied. Please supply it first"
      );
      return;
    }

    setSelectedRequests(requests);
    const requestListForm = requests.map(
      (item) =>
        ({
          purchaseRequest: item.code,
        } as RequestInOrderFormSchema)
    );
    setValue("requests", requestListForm);
  };
  const handlePrAction = () => {}

  return (
    <div className="new-order">
      <HeaderContent title="New Purchase Order" onBack={() => navigate("../")}>
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
                PR Details
              </Sidebar>

              <div className="mt-2 md:px-6">
                <ManagePr
                  status={RequestStatus.CATEGORIZED}
                  category={category}
                  selectedList={selectedRequests}
                  onSelect={handleSelectedRequests}
                  onAction={handlePrAction}
                />
              </div>
            </TabPanel>
          </TabView>
        </FormProvider>
      </div>
    </div>
  );
}

export default NewOrder;
