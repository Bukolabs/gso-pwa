import { useGetCategory } from "@core/query/category.query";
import { useGetDepartmentQy } from "@core/query/department.query";
import { useUserIdentity } from "@core/utility/user-identity.hook";
import { LabelValue } from "@shared/models/label-value.interface";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

const defaultFilter = (requestorDepartment: string | null) => {
  const defaultFilter = {
    department: "",
    category: "",
  } as Record<string, string>;

  if (requestorDepartment) {
    defaultFilter.department = requestorDepartment;
  }

  return defaultFilter;
};

export function useListRequestFilter() {
  const { requestorDepartment } = useUserIdentity();
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [requestFilters, setRequestFilters] = useState<Record<string, string>>(
    defaultFilter(requestorDepartment)
  );

  const { data: department } = useGetDepartmentQy("", 9999999, 0);
  const mappedDepartments = (department?.data || []).map(
    (item) =>
      ({
        label: item.name,
        value: item.code,
      } as LabelValue)
  );
  const { data: categories } = useGetCategory();
  const mappedCategories = (categories?.data || []).map(
    (item) =>
      ({
        label: item.name,
        value: item.code,
      } as LabelValue)
  );

  const departmentSelectionElement = (
    <div>
      <label>Department</label>
      <Dropdown
        value={selectedDepartment}
        onChange={(e) => {
          setSelectedDepartment(e.value);
          const filterVal = {
            ...requestFilters,
            department: e.value,
          } as Record<string, string>;
          setRequestFilters(filterVal);
        }}
        options={mappedDepartments}
        filter
        placeholder="Select department"
        className="w-full"
        showClear
      />
    </div>
  );

  const categorySelectionElement = (
    <div>
      <label>Category</label>
      <Dropdown
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.value);
          const filterVal = {
            ...requestFilters,
            category: e.value,
          } as Record<string, string>;
          setRequestFilters(filterVal);
        }}
        options={mappedCategories}
        filter
        placeholder="Select category"
        className="w-full"
        showClear
      />
    </div>
  );

  return {
    requestFilters,
    selectedDepartment,
    departmentSelectionElement,
    categorySelectionElement,
  };
}
