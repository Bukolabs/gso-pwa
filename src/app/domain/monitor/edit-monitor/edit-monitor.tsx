import HeaderContent from "@shared/ui/header-content/header-content";
import { useEditMonitor } from "./edit-monitor.hook";
import "./edit-monitor.scss";
import { useNavigate } from "react-router-dom";
import { FormProvider } from "react-hook-form";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorSection from "@shared/ui/error-section/error-section";
import FormMonitor from "../form-monitor/form-monitor";
import TextBlock from "@shared/ui/text-block/text-block";
import { Accordion, AccordionTab } from "primereact/accordion";
import { tagTemplate } from "@core/utility/data-table-template";
import { currencyFormat } from "@shared/formats/currency-format";
import { format } from "date-fns";
import { SETTINGS } from "@core/utility/settings";
import { SplitButton } from "primereact/splitbutton";
import { Button } from "primereact/button";
import { dateFormat } from "@shared/formats/date-time-format";
import { FormCategoryItemProvider } from "@domain/item/new-item/form-category-item/form-category-item.context";
import { FormBrandItemProvider } from "@domain/item/new-item/form-brand-item/brand.context";
import { FormUnitItemProvider } from "@domain/item/new-item/form-unit-item/form-unit-item.context";
import FormManualMonitor from "../form-manual-monitor/form-manual-monitor";
import PrintInventoryQr from "../print-inventory-qr/print-inventory-qr";

export function EditMonitor() {
  const navigate = useNavigate();
  const {
    inventoryData,
    isLoading,
    inventoryError,
    formMethod,
    actionItems,
    isEditLoading,
    componentRef,
    updateAction,
    assignAction,
  } = useEditMonitor();

  const handleBack = () => {
    navigate("../");
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

  const subHeader = () => {
    const tag = tagTemplate(inventoryData?.status_name || "PRE-REG");
    const dateUpdated = inventoryData?.updated_at;

    return (
      <section className="flex flex-col md:flex-row md:justify-between">
        <section className="mb-5 flex justify-between flex-col">
          <div>{tag}</div>
          <span className="flex gap-1 mt-1">
            <label className="hint">Date Updated:</label>
            <p className="hint">
              {dateUpdated
                ? format(new Date(dateUpdated), SETTINGS.dateFormat)
                : ""}
            </p>
          </span>
        </section>
      </section>
    );
  };
  const inventoryAccordion = (
    <Accordion activeIndex={[0]} multiple>
      <AccordionTab header="Purchase Order Information">
        <TextBlock
          label="PO Number"
          value={inventoryData?.po_no || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="PO Date"
          value={dateFormat(inventoryData?.po_date) || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="Procurement Mode"
          value={inventoryData?.mode_of_procurement || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="Resolution No."
          value={inventoryData?.resolution_no || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="IAR No."
          value={inventoryData?.iar_no || "-"}
          mode="vertical"
          className="mb-4"
        />
      </AccordionTab>
      <AccordionTab header="Purchase Request Information">
        <TextBlock
          label="PR Number"
          value={inventoryData?.pr_no || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="PR Date"
          value={dateFormat(inventoryData?.pr_date) || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="PR Category"
          value={inventoryData?.pr_category_name || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="PR Department"
          value={inventoryData?.pr_department_name || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="PR Section"
          value={(inventoryData as any)?.pr_section || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="PR Purpose"
          value={(inventoryData as any)?.pr_purpose || "-"}
          mode="vertical"
          className="mb-4"
        />
      </AccordionTab>
      <AccordionTab header="Item Information">
        <TextBlock
          label="Name"
          value={inventoryData?.item_name || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="Delivery Brand"
          value={inventoryData?.brand_name || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="Unit"
          value={inventoryData?.unit_name || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="Price"
          value={currencyFormat(inventoryData?.item_price || 0)}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="Category"
          value={inventoryData?.po_category_name || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="Delivery Description"
          value={inventoryData?.delivery_description || "-"}
          mode="vertical"
          className="mb-4"
        />
      </AccordionTab>
      <AccordionTab header="Supplier">
        <TextBlock
          label="Name"
          value={inventoryData?.supplier || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="Contact"
          value={inventoryData?.supplier_contact || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="Address"
          value={inventoryData?.supplier_address || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="Email"
          value={inventoryData?.supplier_email || "-"}
          mode="vertical"
          className="mb-4"
        />
        <TextBlock
          label="TIN"
          value={inventoryData?.supplier_tin || "-"}
          mode="vertical"
          className="mb-4"
        />
      </AccordionTab>
    </Accordion>
  );
  const mainContent = (
    <div>
      {subHeader()}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 bg-white">
        <FormMonitor />
        <section className="p-6">
          {!inventoryData?.purchase_request ? (
            <FormCategoryItemProvider>
              <FormBrandItemProvider>
                <FormUnitItemProvider>
                  <FormManualMonitor />
                </FormUnitItemProvider>
              </FormBrandItemProvider>
            </FormCategoryItemProvider>
          ) : (
            inventoryAccordion
          )}
        </section>
      </section>
    </div>
  );
  const printSection = () => (
    <div style={{ display: "none" }}>
      <div ref={componentRef}>
        <PrintInventoryQr code={inventoryData?.code || ""} />
      </div>
    </div>
  );

  return (
    <div className="edit-monitor">
      <HeaderContent title="Edit Monitor" onBack={handleBack}>
        <section className="flex gap-2">
          <Button
            label="Update"
            onClick={updateAction}
            disabled={isEditLoading}
          ></Button>
          <SplitButton
            label="Assign"
            onClick={assignAction}
            model={actionItems}
            disabled={isEditLoading}
            outlined
          />
        </section>
      </HeaderContent>

      <div className="p-7">
        {printSection()}
        <FormProvider {...formMethod}>
          {isLoading && displayLoading}
          {inventoryError && !isLoading && displayError}
          {!isLoading ? mainContent : null}
        </FormProvider>
      </div>
    </div>
  );
}

export default EditMonitor;
