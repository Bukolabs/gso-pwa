import { OrderFormSchema } from "@core/model/form.rule";
import "./form-order.scss";
import { useFormContext } from "react-hook-form";
import InputControl from "@shared/ui/hook-form/input-control/input-control";
import InputDateControl from "@shared/ui/hook-form/input-date-control/input-date-control";
import DropdownControl from "@shared/ui/hook-form/dropdown-control/dropdown-control";
import { LabelValue } from "@shared/models/label-value.interface";
import InputTextareaControl from "@shared/ui/hook-form/input-textarea-control/input-textarea-control";
import { useQyGetCategory } from "@core/query/category.query";

export function FormOrder() {
  const { control, watch } = useFormContext<OrderFormSchema>();
  const selectedProcurementMode = watch("procurementMode");
  const procurementOptions = [
    {
      label: "RFQ",
      value: "RFQ",
    },
    {
      label: "ITB",
      value: "ITB",
    },
  ] as LabelValue[];
  const procurementNumber =
    selectedProcurementMode === "RFQ" ? (
      <InputControl<OrderFormSchema>
        control={control}
        name="rfqNumber"
        label="RFQ No."
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter RFQ number"
        hint="e.g. 123456"
      />
    ) : selectedProcurementMode === "ITB" ? (
      <InputControl<OrderFormSchema>
        control={control}
        name="itbNumber"
        label="ITB No."
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter ITB number"
        hint="e.g. 123456"
      />
    ) : null;

  const { data: categories } = useQyGetCategory();
  const mappedCategories = (categories?.data || []).map(
    (item) =>
      ({
        label: item.name,
        value: item.code,
      } as LabelValue)
  );

  return (
    <div className="form-order py-2 md:bg-white md:px-6">
      <DropdownControl<OrderFormSchema>
        control={control}
        name="category"
        label="Category"
        options={mappedCategories}
        containerClassName="mb-9"
        className="w-full md:w-3/4"
        placeholder="Enter your category"
        hint="Select from the dropdown"
        filter
      />
      <InputControl<OrderFormSchema>
        control={control}
        name="pono"
        label="PO No."
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter PO number"
        hint="e.g. 123456"
      />
      <InputControl<OrderFormSchema>
        control={control}
        name="resolutionNo"
        label="Resolution No."
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter resolution number"
        hint="e.g. 123456"
      />
      <InputDateControl<OrderFormSchema>
        control={control}
        name="poDate"
        label="PO Date"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        hint="e.g. 30/12/2025"
      />
      <DropdownControl<OrderFormSchema>
        control={control}
        name="procurementMode"
        label="Mode of Procurement"
        options={procurementOptions}
        containerClassName="mb-9"
        className="w-full md:w-3/4"
        placeholder="Enter your procurement mode"
        hint="Select from the dropdown"
      />
      
      {procurementNumber}

      <InputTextareaControl<OrderFormSchema>
        control={control}
        name="deliveryAddress"
        label="Delivery Address"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter address of delivery"
        hint="e.g. J.A Clarin Street cor. E. Calceta Street, Cogon, Tagbilaran City, Bohol, 6300"
      />
      <InputDateControl<OrderFormSchema>
        control={control}
        name="deliveryDate"
        label="Delivery Date"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        hint="e.g. 30/12/2025"
      />
      <InputTextareaControl<OrderFormSchema>
        control={control}
        name="deliveryTerm"
        label="Delivery Terms"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter terms of delivery"
        hint="e.g. It should be concise and detailed"
      />
      <InputTextareaControl<OrderFormSchema>
        control={control}
        name="paymentTerm"
        label="Payment Terms"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter terms of payment"
        hint="e.g. paid on delivery"
      />
      <InputControl<OrderFormSchema>
        control={control}
        name="iar"
        label="IAR No."
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter IAR number"
        hint="e.g. 123"
      />
      <InputDateControl<OrderFormSchema>
        control={control}
        name="iarDate"
        label="IAR Date"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        hint="e.g. 30/12/2025"
      />
      <InputControl<OrderFormSchema>
        control={control}
        name="invoice"
        label="Invoice No."
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter invoice number"
        hint="e.g. 44566"
      />
      <InputDateControl<OrderFormSchema>
        control={control}
        name="invoiceDate"
        label="Invoice Date"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        hint="e.g. 30/12/2025"
      />
      <InputControl<OrderFormSchema>
        control={control}
        name="signatoryName1"
        label="Inspection Signatory Name 1"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter inspection signatory name 1"
        hint="Leave blank for default"
      />
      <InputControl<OrderFormSchema>
        control={control}
        name="signatoryOffice1"
        label="Inspection Signatory Office 1"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter inspection signatory office 1"
        hint="Leave blank for default"
      />
      <InputControl<OrderFormSchema>
        control={control}
        name="signatoryName2"
        label="Inspection Signatory Name 2"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter inspection signatory name 2"
        hint="Leave blank for default"
      />
      <InputControl<OrderFormSchema>
        control={control}
        name="signatoryOffice2"
        label="Inspection Signatory Office 2"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter inspection signatory office 2"
        hint="Leave blank for default"
      />
      <InputControl<OrderFormSchema>
        control={control}
        name="endUserName1"
        label="Inspection End User Name"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter inspection end-user name 1"
        hint="Leave blank for default"
      />
      <InputControl<OrderFormSchema>
        control={control}
        name="endUserOffice1"
        label="Inspection End User Office"
        className="w-full md:w-3/4"
        containerClassName="pb-2"
        placeholder="Enter inspection end-user office 1"
        hint="Leave blank for default"
      />
    </div>
  );
}

export default FormOrder;
