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
import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { MessageResponseDto } from "@api/api";
import { useUserIdentity } from "@core/utility/user-identity.hook";
import { FormCategoryItemProvider } from "@domain/item/new-item/form-category-item/form-category-item.context";
import RequestItemList from "../request-item-list/request-item-list";
import ItemBulkUploader from "../item-bulk-uploader/item-bulk-uploader";
import { FormUnitItemProvider } from "@domain/item/new-item/form-unit-item/form-unit-item.context";

export function NewRequest() {
  const { currentUser } = useUserIdentity();
  const { isMobileMode } = useScreenSize();
  const navigate = useNavigate();
  const { showError, showSuccess, showWarning } = useNotificationContext();
  const [visible, setVisible] = useState(false);
  const [editPrItem, setEditPrItem] = useState<ItemFormSchema | undefined>(
    undefined
  );

  const handleApiSuccess = (response: MessageResponseDto) => {
    const data = response.data as any;

    showSuccess(`New purchase request created ${data.pr_no}`);
    navigate(`../${data.code}`);
  };
  const { mutate: addPurchaseRequest, isLoading: isCreating } =
    useAddRequestQy(handleApiSuccess);

  const formMethod = useForm<RequestFormSchema>({
    defaultValues: {
      ...requestFormDefault,
      department: currentUser?.department_code,
      departmentLabel: currentUser?.department_name,
    },
    resolver: zodResolver(RequestFormRule),
  });
  const { handleSubmit, setValue, watch } = formMethod;
  const requestItems = watch("items");
  const displayRequestItems = requestItems.filter((item) => item.isActive);

  const handleValidate = (form: RequestFormSchema) => {
    const formData = FormToApiService.NewPurchaseRequest(form);
    addPurchaseRequest(formData);
  };
  const handleValidateError = (err: FieldErrors<RequestFormSchema>) => {
    const bulkErrorItem = err.items;
    if (bulkErrorItem && !!bulkErrorItem?.length && bulkErrorItem.length > 0) {
      showWarning(
        `There are some items that does not have required information`
      );
      return;
    }

    const formMessage = getFormErrorMessage(err);
    showError(formMessage);
  };

  const handleEdit = (item: ItemFormSchema) => {
    setVisible(true);
    setEditPrItem(item);
  };
  const handleRemove = (item: ItemFormSchema) => {
    const updatedIsActiveItems = requestItems.map((x) => {
      if (x.code === item.code) {
        return {
          ...x,
          isActive: false,
        };
      }

      return x;
    });
    setValue("items", updatedIsActiveItems);
  };
  const handleAddItem = () => {
    handleSubmit(handleValidate, handleValidateError)();
    setVisible(false);
  };

  return (
    <div className="new-request">
      <HeaderContent title="New Request" onBack={() => navigate("../")}>
        <Button
          className="w-full block"
          label="Save"
          disabled={isCreating}
          text={isMobileMode}
          onClick={handleSubmit(handleValidate, handleValidateError)}
        ></Button>
      </HeaderContent>

      <div className="p-7">
        <FormProvider {...formMethod}>
          <FormCategoryItemProvider>
            <FormUnitItemProvider>
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
                        onAddItem={() => handleAddItem()}
                      />
                    </div>
                  </Sidebar>

                  <section className="flex gap-2">
                    <Button
                      icon="pi pi-plus"
                      label="Add Item"
                      className="block mb-4"
                      onClick={() => {
                        setVisible(true);
                        setEditPrItem(undefined);
                      }}
                    />
                    <ItemBulkUploader />
                  </section>

                  <RequestItemList
                    requestItems={displayRequestItems}
                    onEdit={handleEdit}
                    onRemove={handleRemove}
                    showActions={true}
                  />
                </TabPanel>
              </TabView>
            </FormUnitItemProvider>
          </FormCategoryItemProvider>
        </FormProvider>
      </div>
    </div>
  );
}

export default NewRequest;
