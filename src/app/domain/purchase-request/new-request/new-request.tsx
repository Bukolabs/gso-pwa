import "./new-request";
import { Button } from "primereact/button";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useScreenSize from "@core/utility/screen-size";
import { useNavigate } from "react-router-dom";
import { requestFormDefault } from "@core/model/form.default";
import {
  ItemFormSchema,
  RequestFormRule,
  RequestFormSchema,
} from "@core/model/form.rule";
import FormRequest from "../form-request/form-request";
import HeaderContent from "@shared/ui/header-content/header-content";
import { FormToApiService } from "@core/services/form-to-api.service";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useAddRequestQy } from "@core/query/request.query";
import { getFormErrorMessage } from "@core/utility/get-error-message";
import AddItem from "../add-item/add-item";
import ItemCard from "@core/ui/item-card/item-card";
import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { MessageResponseDto } from "@api/api";
import { useUserIdentity } from "@core/utility/user-identity.hook";

export function NewRequest() {
  const { currentUser } = useUserIdentity();
  const { isMobileMode } = useScreenSize();
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotificationContext();
  const [visible, setVisible] = useState(false);
  const [editPrItem, setEditPrItem] = useState<ItemFormSchema | undefined>(
    undefined
  );

  const handleBack = () => {
    navigate("../");
  };
  const handleApiSuccess = (response: MessageResponseDto) => {
    const data = response.data as any;

    showSuccess(`New purchase request created ${data.pr_no}`);
    handleBack();
  };
  const { mutate: addPurchaseRequest } = useAddRequestQy(handleApiSuccess);

  const formMethod = useForm<RequestFormSchema>({
    defaultValues: {
      ...requestFormDefault,
      department: currentUser?.department_name,
    },
    resolver: zodResolver(RequestFormRule),
  });
  const { handleSubmit, setValue, watch } = formMethod;
  const requestItems = watch("items");

  const handleValidate = (form: RequestFormSchema) => {
    const formData = FormToApiService.NewPurchaseRequest(form);
    addPurchaseRequest(formData);
  };
  const handleValidateError = (err: FieldErrors<RequestFormSchema>) => {
    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };

  const handleEdit = (item: ItemFormSchema) => {
    setVisible(true);
    setEditPrItem(item);
  };
  const handleRemove = (item: ItemFormSchema) => {
    const unmatchedCode = requestItems.filter((x) => x.code !== item.code);
    setValue("items", unmatchedCode);
  };

  return (
    <div className="new-request">
      <HeaderContent title="New Request" onBack={() => navigate("../")}>
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
              <FormRequest />
            </TabPanel>
            <TabPanel header="Request Items">
              <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
                className="w-full md:w-2/5"
              >
                <div className="px-7">
                  <h2>Add an item to current purchase request</h2>
                  <AddItem
                    defaultItem={editPrItem}
                    closeSidebar={() => setVisible(false)}
                  />
                </div>
              </Sidebar>
              <Button
                icon="pi pi-plus"
                label="Add Item"
                className="block mb-4"
                onClick={() => {
                  setVisible(true);
                  setEditPrItem(undefined);
                }}
              />

              <div className="mt-2 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-4">
                  {requestItems.map((item, id) => (
                    <ItemCard
                      key={id}
                      itemNo={id}
                      item={item}
                      onEdit={handleEdit}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              </div>
            </TabPanel>
          </TabView>
        </FormProvider>
      </div>
    </div>
  );
}

export default NewRequest;
