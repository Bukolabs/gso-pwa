import { AccountFormSchema } from "@core/model/form.rule";
import "./form-account";
import { useFormContext } from "react-hook-form";
import InputControl from "@shared/ui/hook-form/input-control/input-control";

export function FormAccount() {
  const { control } = useFormContext<AccountFormSchema>();
  return (
    <div className="form-account">
      <div className="form-request py-2 md:bg-white md:px-6">
        <InputControl<AccountFormSchema>
          control={control}
          name="name"
          label="First Name (Required)"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your first name"
          hint="e.g. Juan Eduardo Gomez"
        />
        <InputControl<AccountFormSchema>
          control={control}
          name="lastName"
          label="Last Name"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your last name"
          hint="e.g. Juan Eduardo Gomez"
        />
        <InputControl<AccountFormSchema>
          control={control}
          name="email"
          label="Email Address (Required)"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your email address"
          hint="e.g. juangoma@gmail.com"
        />
        <InputControl<AccountFormSchema>
          control={control}
          name="mobile"
          label="Mobile Number (Required)"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your mobile number"
          hint="e.g. 09191234567"
        />
        <InputControl<AccountFormSchema>
          control={control}
          name="role"
          label="Role"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your role"
          hint="e.g. Manga"
        />
        <InputControl<AccountFormSchema>
          control={control}
          name="department"
          label="Department"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your department"
          hint="e.g. Tagbilaran"
        />
      </div>
    </div>
  );
}

export default FormAccount;
