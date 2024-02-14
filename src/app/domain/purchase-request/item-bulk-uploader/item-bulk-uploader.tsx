import { FileUpload } from "primereact/fileupload";
import "./item-bulk-uploader.scss";
import Papa from "papaparse";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useQyGetCategory } from "@core/query/category.query";

/* eslint-disable-next-line */
export interface ItemBulkUploaderProps {}

export function ItemBulkUploader() {
  const { showInfo, showWarning } = useNotificationContext();

  // API GET CATEGORY
  useQyGetCategory();

  // API GET UNIT

  const onSelect = (e: any) => {
    const file = e.files[0];

    showInfo(
      `${file.name} is selected. Please click the button again to upload`
    );
  };
  const customUpload = async (event: any) => {
    const file = event.files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension === "csv") {
      Papa.parse(file, {
        complete: (result) => {
          validateSheetData(result.data as string[][]);
        },
      });
    }

    event.options.clear();
  };
  const validateSheetData = (data: string[][]) => {
    const headers = data[0];

    const correctHeaders = [
      "brand",
      "category",
      "unit",
      "name",
      "cost",
      "quantity",
      "description",
    ];
    const hasCorrectHeaders = headers.every(
      (item, index) => item === correctHeaders[index]
    );
    if (!hasCorrectHeaders) {
      showWarning(
        `You are using an incorrect template. Please double check the contents of your csv file with the following row order: ${correctHeaders.join(
          ","
        )}`
      );
      return;
    }

    console.log({ data, headers, hasCorrectHeaders });
  };

  return (
    <div className="item-bulk-uploader">
      <FileUpload
        mode="basic"
        name="demo[]"
        accept=".csv"
        maxFileSize={1000000}
        onSelect={onSelect}
        customUpload
        uploadHandler={customUpload}
        chooseLabel="Bulk add item"
      />
    </div>
  );
}

export default ItemBulkUploader;
