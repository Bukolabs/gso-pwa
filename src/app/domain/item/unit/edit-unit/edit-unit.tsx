import { useNotificationContext } from "@shared/ui/notification/notification.context";
import "./edit-unit";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEditUnit, useGetUnitById } from "@core/query/unit.query";
import {
  EditUtilsUnitDto,
  UtilsBrandControllerGetDataAsList200Response,
} from "@api/api";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorSection from "@shared/ui/error-section/error-section";
import HeaderContent from "@shared/ui/header-content/header-content";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export function EditUnit() {
  const { showSuccess } = useNotificationContext();
  const [newUnit, setNewUnit] = useState<EditUtilsUnitDto>({
    name: "",
    description: "",
    code: "",
  });
  const navigate = useNavigate();
  const [,setDataEmpty] = useState(false);
  const { unitId } = useParams();

  const handleBack = () => {
    navigate("../unit");
  };

  const handleGetApiSuccess = (
    data: UtilsBrandControllerGetDataAsList200Response
  ) => {
    if (data && data.count && data.count > 0) {
      const unit = data.data?.[0];
      setNewUnit({
        code: unit?.code || "",
        name: unit?.name || "",
        description: unit?.description || "",
      });
      setDataEmpty(false);
      return;
    }

    return setDataEmpty(true);
  };
  const { isLoading, isError } = useGetUnitById(
    unitId || "",
    handleGetApiSuccess
  );

  const handleApiSuccess = () => {
    showSuccess("Unit updated");
    handleBack();
  };
  const { mutate: editUnit } = useEditUnit(handleApiSuccess);
  const handleUpdate = () => {
    editUnit(newUnit);
  };

  const displayLoading = (
    <div className="card">
      <SkeletonList count={4} />
    </div>
  );
  const displayError = (
    <div className="card">
      <ErrorSection
        title="No Data"
        message="No data found in selected record. Please try again."
      />
    </div>
  );
  const form = (
    <div className="flex flex-col gap-2 mt-4">
      <InputText
        placeholder="Unit Name"
        value={newUnit.name}
        onChange={(e: any) => setNewUnit({ ...newUnit, name: e.target.value })}
      />
      <InputText
        placeholder="Unit Description"
        value={newUnit.description}
        onChange={(e: any) =>
          setNewUnit({ ...newUnit, description: e.target.value })
        }
      />
    </div>
  );

  return (
    <div className="edit-unit">
      <HeaderContent title="Edit Item" onBack={() => handleBack()}>
        <Button label="Update" onClick={() => handleUpdate()} />
      </HeaderContent>
      <div className="p-7">
        {isLoading && displayLoading}
        {isError && !isLoading && displayError}
        {!isLoading && !isError && form}
      </div>
    </div>
  );
}

export default EditUnit;
