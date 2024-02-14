import { CreateUtilsCategoryDto } from "@api/api";
import { useAddCategory, useQyGetCategory } from "@core/query/category.query";
import { LabelValue } from "@shared/models/label-value.interface";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useState } from "react";

export const useFormCategoryItem = () => {
  const { showWarning, showSuccess } = useNotificationContext();
  const [sidebar, setSidebar] = useState(false);
  const [filter, setFilter] = useState("");
  const [newCategory, setNewCategory] = useState<CreateUtilsCategoryDto>({
    name: "",
    description: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  const handleFilterInput = (event: any) => {
    if (event.key === "Enter") {
      setNewCategory({
        name: filter,
        description: "",
      });
      setSidebar(true);
    }
  };
  const handleAdd = () => {
    if (!newCategory.name) {
      showWarning("Please fill in category details");
      return;
    }
    setIsCreating(true);
    addCategory(newCategory);
  };

  const handleAddApiSuccess = () => {
    showSuccess(
      "New category is added. Check and select the category in the form."
    );
    setSidebar(false);
    setIsCreating(false);
  };
  const handleAddApiError = () => {
    setIsCreating(false);
  };
  const { mutate: addCategory } = useAddCategory(
    handleAddApiSuccess,
    handleAddApiError
  );
  const { data: categories } = useQyGetCategory();
  const mappedCategories = (categories?.data || []).map(
    (item) =>
      ({
        label: item.name,
        value: item.code,
      } as LabelValue)
  );

  return {
    sidebar,
    filter,
    newCategory,
    mappedCategories,
    isCreating,
    setSidebar,
    setFilter,
    setNewCategory,
    handleFilterInput,
    handleAdd,
    addCategory,
  };
};
