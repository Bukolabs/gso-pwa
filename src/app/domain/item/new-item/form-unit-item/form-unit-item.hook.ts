import { CreateUtilsUnitDto } from "@api/api";
import { useAddUnit, useGetUnit } from "@core/query/unit.query";
import { LabelValue } from "@shared/models/label-value.interface";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useState } from "react";

export const useFormUnitItem = () => {
  const { showWarning, showSuccess } = useNotificationContext();
  const [sidebar, setSidebar] = useState(false);
  const [filter, setFilter] = useState("");
  const [newUnit, setNewUnit] = useState<CreateUtilsUnitDto>({
    name: "",
    description: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  const handleFilterInput = (event: any) => {
    if (event.key === "Enter") {
      setNewUnit({
        name: filter,
        description: "",
      });
      setSidebar(true);
    }
  };
  const handleAdd = () => {
    if (!newUnit.name) {
      showWarning("Please fill in unit details");
      return;
    }
    setIsCreating(true);
    addUnit(newUnit);
  };

  const handleAddApiSuccess = () => {
    showSuccess("New unit is added. Check and select the unit in the form.");
    setSidebar(false);
    setIsCreating(false);
  };
  const handleAddApiError = () => {
    setIsCreating(false);
  };
  const { mutate: addUnit } = useAddUnit(
    handleAddApiSuccess,
    handleAddApiError
  );

  const { data: units } = useGetUnit();
  const mappedUnits = (units?.data || []).map(
    (item) =>
      ({
        label: item.name,
        value: item.code,
      } as LabelValue)
  );

  return {
    sidebar,
    filter,
    newUnit,
    mappedUnits,
    isCreating,
    setSidebar,
    setFilter,
    setNewUnit,
    handleFilterInput,
    handleAdd,
    addUnit,
  };
};
