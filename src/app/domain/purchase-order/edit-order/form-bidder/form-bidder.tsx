import InputControl from "@shared/ui/hook-form/input-control/input-control";
import "./form-bidder.scss";
import { OrderFormSchema } from "@core/model/form.rule";
import { useFormContext } from "react-hook-form";
import InputTextareaControl from "@shared/ui/hook-form/input-textarea-control/input-textarea-control";

/* eslint-disable-next-line */
export interface FormBidderProps {}

export function FormBidder() {
  const { control } = useFormContext<OrderFormSchema>();

  return (
    <div className="form-bidder">
      <div className="form-order py-2 md:bg-white md:px-6">
        <InputControl<OrderFormSchema>
          control={control}
          name="supplier"
          label="Supplier Name"
          className="w-full md:w-3/4"
          containerClassName="pb-2"
          placeholder="Enter supplier name"
          hint="e.g. Juan de la Cruz"
        />
        <InputTextareaControl<OrderFormSchema>
          control={control}
          name="address"
          label="Supplier Address"
          className="w-full md:w-3/4"
          containerClassName="pb-2"
          placeholder="Enter supplier's address"
          hint="e.g. J.A Clarin Street cor. E. Calceta Street, Cogon, Tagbilaran City, Bohol, 6300"
        />
        <InputControl<OrderFormSchema>
          control={control}
          name="email"
          label="Supplier Email"
          className="w-full md:w-3/4"
          containerClassName="pb-2"
          placeholder="Enter supplier email"
          hint="e.g. juandelacruz090@gmail.com"
        />
        <InputControl<OrderFormSchema>
          control={control}
          name="phone"
          label="Supplier Contact Number"
          className="w-full md:w-3/4"
          containerClassName="pb-2"
          placeholder="Enter supplier contact number"
          hint="e.g. 09196681122"
        />
        <InputControl<OrderFormSchema>
          control={control}
          name="tin"
          label="Supplier T.I.N"
          className="w-full md:w-3/4"
          containerClassName="pb-2"
          placeholder="Enter supplier TIN"
          hint="e.g. xxxx-xx-xxxx"
        />
      </div>
    </div>
  );
}

export default FormBidder;
