import { CreateUtilsBrandDto } from "@api/api";
import { ItemFormSchema } from "@core/model/form.rule";
import { useAddBrand, useGetBrand } from "@core/query/brand.query";
import { LabelValue } from "@shared/models/label-value.interface";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useState } from "react";

export const useBrandForm = () => {
  const { showWarning, showSuccess } = useNotificationContext();
  const [brandSidebar, setBrandSidebar] = useState(false);
  const [brandFilter, setBrandFilter] = useState("");
  const [newBrand, setNewBrand] = useState<CreateUtilsBrandDto>({
    name: "",
    description: "",
  });
  const handleBrandFilterInput = (event: any) => {
    if (event.key === "Enter") {
      setNewBrand({
        name: brandFilter,
        description: "",
      });
      setBrandSidebar(true);
    }
  };
  const handleAddBrand = () => {
    if (!newBrand.name) {
      showWarning("Please fill in brand details");
      return;
    }
    addBrand(newBrand);
  };

  const handleAddBrandApiSuccess = () => {
    showSuccess("New brand is added. Check and select the brand.");
    setBrandSidebar(false);
  };
  const { mutate: addBrand } = useAddBrand(handleAddBrandApiSuccess);
  const { data: brands } = useGetBrand();
  const mappedBrands = (brands?.data || []).map(
    (item) =>
      ({
        label: item.name,
        value: item.code,
      } as LabelValue)
  );

  return {
    brandSidebar,
    brandFilter,
    newBrand,
    mappedBrands,
    setBrandSidebar,
    setBrandFilter,
    setNewBrand,
    handleBrandFilterInput,
    handleAddBrand,
    addBrand,
  };
};
