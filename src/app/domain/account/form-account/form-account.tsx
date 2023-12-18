import { AccountFormSchema } from "@core/model/form.rule";
import "./form-account";
import { useFormContext } from "react-hook-form";
import InputControl from "@shared/ui/hook-form/input-control/input-control";
import { useGetRoleQy } from "@core/query/account.query";
import { LabelValue } from "@shared/models/label-value.interface";
import DropdownControl from "@shared/ui/hook-form/dropdown-control/dropdown-control";
import { useGetDepartmentQy } from "@core/query/department.query";

export function FormAccount() {
  const { control } = useFormContext<AccountFormSchema>();

  const { data: role } = useGetRoleQy();
  const mappedRoles = (role?.data || []).map(
    (item) =>
      ({
        label: item.description,
        value: item.code,
      } as LabelValue)
  );

  const { data: department } = useGetDepartmentQy("", 9999999, 0);
  const mappedDepartments = (department?.data || []).map(
    (item) =>
      ({
        label: item.name,
        value: item.code,
      } as LabelValue)
  );

  return (
    <div className="form-account">
      <div className="form-request py-2 md:bg-white md:px-6">
        <InputControl<AccountFormSchema>
          control={control}
          name="username"
          label="Username (Required)"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your username"
          hint="e.g. juangomez"
        />
        <InputControl<AccountFormSchema>
          control={control}
          name="name"
          label="First Name (Required)"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your first name"
          hint="e.g. Juan Eduardo"
        />
        <InputControl<AccountFormSchema>
          control={control}
          name="lastName"
          label="Last Name"
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your last name"
          hint="e.g. Gomez"
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
        <DropdownControl<AccountFormSchema>
          control={control}
          name="role"
          label="Role"
          options={mappedRoles}
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your role"
          hint="Select from the created role dropdown"
          filter
        />
        <DropdownControl<AccountFormSchema>
          control={control}
          name="department"
          label="Department"
          options={mappedDepartments}
          containerClassName="mb-9"
          className="w-full md:w-3/4"
          placeholder="Enter your department"
          hint="Select from the created department dropdown"
          filter
        />
      </div>
    </div>
  );
}

export default FormAccount;
