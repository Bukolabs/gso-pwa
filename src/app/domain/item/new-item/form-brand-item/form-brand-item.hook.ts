import { CreateUtilsBrandDto } from "@api/api";
import { useAddBrand, useGetBrand } from "@core/query/brand.query";
import { LabelValue } from "@shared/models/label-value.interface";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useState } from "react";

export const useFormBrandItem = () => {
  const { showWarning, showSuccess } = useNotificationContext();
  const [sidebar, setSidebar] = useState(false);
  const [filter, setFilter] = useState("");
  const [newBrand, setNewBrand] = useState<CreateUtilsBrandDto>({
    name: "",
    description: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  const handleFilterInput = (event: any) => {
    if (event.key === "Enter") {
      setNewBrand({
        name: filter,
        description: "",
      });
      setSidebar(true);
    }
  };
  const handleAdd = () => {
    if (!newBrand.name) {
      showWarning("Please fill in brand details");
      return;
    }
    setIsCreating(true);
    addBrand(newBrand);
  };

  const handleAddApiSuccess = () => {
    showSuccess("New brand is added. Check and select the brand.");
    setSidebar(false);
    setIsCreating(false);
  };
  const handleAddApiError = () => {
    setIsCreating(false);
  };
  const { mutate: addBrand } = useAddBrand(
    handleAddApiSuccess,
    handleAddApiError
  );
  const { data: brands } = useGetBrand('', 99999, 0);
  const mappedBrands = (brands?.data || []).map(
    (item) =>
      ({
        label: item.name,
        value: item.code,
      } as LabelValue)
  );

  return {
    sidebar,
    filter,
    newBrand,
    mappedBrands,
    isCreating,
    setSidebar,
    setFilter,
    setNewBrand,
    handleFilterInput,
    handleAdd,
    addBrand,
  };
};
