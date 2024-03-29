import { BidderFormSchema } from "@core/model/form.rule";
import "./bidder-form";
import { useFormContext } from "react-hook-form";
import InputControl from "@shared/ui/hook-form/input-control/input-control";

export function BidderForm() {
  const { control } = useFormContext<BidderFormSchema>();
  return (
    <div className="bidder-form">
      <div className="form-request py-2 md:bg-white md:px-6">
        <InputControl<BidderFormSchema>
          control={control}
          name="name"
          label="Fullname (Required)"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your fullname"
          hint="e.g. Juan Eduardo Gomez"
        />
        <InputControl<BidderFormSchema>
          control={control}
          name="email"
          label="Email Address (Required)"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your email address"
          hint="e.g. juangoma@gmail.com"
        />
        <InputControl<BidderFormSchema>
          control={control}
          name="mobile"
          label="Mobile Number (Required)"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your mobile number"
          hint="e.g. 09191234567"
        />
        <InputControl<BidderFormSchema>
          control={control}
          name="streetName"
          label="Street Name"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your street address"
          hint="e.g. Lamdagan Street"
        />
        <InputControl<BidderFormSchema>
          control={control}
          name="barangay"
          label="Barangay"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your barangay"
          hint="e.g. Manga"
        />
        <InputControl<BidderFormSchema>
          control={control}
          name="city"
          label="City / Municipality"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your city or municipality"
          hint="e.g. Tagbilaran"
        />
      </div>
    </div>
  );
}

export default BidderForm;
