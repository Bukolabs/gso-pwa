import { BidderFormSchema } from "@core/model/form.rule";
import "./bidder-form";
import { useFormContext } from "react-hook-form";
import InputControl from "@shared/ui/hook-form/input-control/input-control";

/* eslint-disable-next-line */
export interface BidderFormProps {}

export function BidderForm() {
  const { control } = useFormContext<BidderFormSchema>();
  return (
    <div className="bidder-form">
      <div className="form-request py-2 md:bg-white md:px-6">
        <InputControl<BidderFormSchema>
          control={control}
          name="name"
          label="Fullname"
          className="w-full md:w-3/4"
          placeholder="Enter your fullname"
          hint="e.g. Juan Eduardo Gomez"
        />
      </div>
    </div>
  );
}

export default BidderForm;
