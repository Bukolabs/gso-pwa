import { CreateUtilsBrandDto } from "@api/api";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useState } from "react";

export const useBrandFormHook = (
  onAddBrand: (brand: CreateUtilsBrandDto) => void
) => {
  const { showWarning } = useNotificationContext();
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
    onAddBrand(newBrand);
    setBrandSidebar(false);
  };

  return {
    brandSidebar,
    brandFilter,
    newBrand,
    setBrandSidebar,
    setBrandFilter,
    setNewBrand,
    handleBrandFilterInput,
    handleAddBrand,
  };
};
