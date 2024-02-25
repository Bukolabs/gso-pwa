import { useNotificationContext } from "@shared/ui/notification/notification.context";
import "./edit-brand";
import {
  EditUtilsBrandDto,
  UtilsBrandControllerGetDataAsList200Response,
} from "@api/api";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditBrand, useGetBrandById } from "@core/query/brand.query";
import SkeletonList from "@shared/ui/skeleton-list/skeleton-list";
import ErrorSection from "@shared/ui/error-section/error-section";
import { InputText } from "primereact/inputtext";
import HeaderContent from "@shared/ui/header-content/header-content";
import { Button } from "primereact/button";

export function EditBrand() {
  const { showSuccess } = useNotificationContext();
  const [newBrand, setNewBrand] = useState<EditUtilsBrandDto>({
    name: "",
    description: "",
    code: "",
  });
  const navigate = useNavigate();
  const [,setDataEmpty] = useState(false);
  const { brandId } = useParams();

  const handleBack = () => {
    navigate("../brand");
  };

  const handleGetApiSuccess = (
    data: UtilsBrandControllerGetDataAsList200Response
  ) => {
    if (data && data.count && data.count > 0) {
      const brand = data.data?.[0];
      setNewBrand({
        code: brand?.code || "",
        name: brand?.name || "",
        description: brand?.description || "",
      });
      setDataEmpty(false);
      return;
    }

    return setDataEmpty(true);
  };
  const { isLoading, isError } = useGetBrandById(
    brandId || "",
    handleGetApiSuccess
  );

  const handleApiSuccess = () => {
    showSuccess("Brand updated");
    handleBack();
  };
  const { mutate: editBrand } = useEditBrand(handleApiSuccess);
  const handleUpdate = () => {
    editBrand(newBrand);
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
        placeholder="Brand Name"
        value={newBrand.name}
        onChange={(e: any) =>
          setNewBrand({ ...newBrand, name: e.target.value })
        }
      />
      <InputText
        placeholder="Brand Description"
        value={newBrand.description}
        onChange={(e: any) =>
          setNewBrand({ ...newBrand, description: e.target.value })
        }
      />
    </div>
  );

  return (
    <div className="edit-brand">
      <HeaderContent title="Edit Brand" onBack={() => handleBack()}>
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

export default EditBrand;
