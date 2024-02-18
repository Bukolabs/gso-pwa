import { FileUpload } from "primereact/fileupload";
import "./item-bulk-uploader.scss";
import Papa from "papaparse";
import { useNotificationContext } from "@shared/ui/notification/notification.context";
import { useGetUnit } from "@core/query/unit.query";
import { PurchaseItemFormSchema } from "@core/model/form.rule";
import { useGetItem } from "@core/query/item.query";
import { useState } from "react";
import ItemBulkPreview from "../item-bulk-preview/item-bulk-preview";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useFormCategoryItemContext } from "@domain/item/new-item/form-category-item/form-category-item.context";
import { downloadCsv } from "@core/utility/download";
import { useFormUnitItemContext } from "@domain/item/new-item/form-unit-item/form-unit-item.context";

/* eslint-disable-next-line */
export interface ItemBulkUploaderProps {}

export function ItemBulkUploader() {
  const { showInfo, showWarning } = useNotificationContext();
  const [preBulkItems, setPreBulkItems] = useState<PurchaseItemFormSchema[]>(
    []
  );
  const [visible, setVisible] = useState(false);

  // API GET CATEGORY / UNITS / ITEMS
  const { categories, mappedCategories } = useFormCategoryItemContext();
  const { units, mappedUnits } = useFormUnitItemContext();
  const { data: items } = useGetItem("", 99999999999, 0);

  const downloadCategories = () => {
    const stringed = mappedCategories
      .map((item) => `${item.value},${item.label}`)
      .join("\n");
    downloadCsv(stringed, "request-item-categories");
  };
  const downloadUnits = () => {
    const stringed = mappedUnits
      .map((item) => `${item.value},${item.label}`)
      .join("\n");
    downloadCsv(stringed, "request-item-units");
  };
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
    const categoriesData = categories?.data || [];
    const unitsData = units?.data || [];
    const itemsData = items?.data || [];
    const headers = data[0];
    const content = data.slice(1);

    if (categoriesData.length === 0 || unitsData.length === 0) {
      showWarning(
        "Unable to retrieve categories and units from server. Please refresh the page."
      );
      return;
    }

    // Get Header
    const correctHeaders = [
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

    // Get Content
    const itemFormContents = content.map((row) => {
      const filteredCategory = categoriesData.filter((x) => x.name === row[0]);
      const filteredUnit = unitsData.filter((x) => x.name === row[1]);
      const filteredItem = itemsData.filter((x) => x.name === row[2]);

      const categoryCode =
        filteredCategory.length > 0 ? filteredCategory[0].code : "";
      const categoryName = !categoryCode ? undefined : row[0];

      const unitCode = filteredUnit.length > 0 ? filteredUnit[0].code : "";
      const unitName = !unitCode ? undefined : row[1];

      const nameCode =
        filteredItem.length > 0 ? filteredItem[0].code : undefined;
      const name = row[2];

      const cost = parseInt(row[3], 10);
      const quantity = parseInt(row[4], 10);
      const description = row[5];

      const itemForm = {
        itemArrayCode: undefined,
        code: nameCode,
        name,
        description,
        unit: unitCode,
        unitName,
        category: categoryCode,
        categoryName,
        brand: "",
        brandName: "",
        cost,
        isActive: true,
        quantity,
        deliveredQuantity: 0,
      } as PurchaseItemFormSchema;

      return itemForm;
    });

    setVisible(true);
    setPreBulkItems(itemFormContents);
  };

  return (
    <div className="item-bulk-uploader">
      <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
        <ItemBulkPreview
          bulkItems={preBulkItems}
          onBulk={() => setVisible(false)}
        />
      </Sidebar>
      <section className="flex gap-2">
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
        <span className="p-buttonset">
          <Button
            label="Download Category"
            severity="secondary"
            outlined
            onClick={() => downloadCategories()}
          />
          <Button
            label="Download Units"
            severity="secondary"
            outlined
            onClick={() => downloadUnits()}
          />
        </span>
      </section>
    </div>
  );
}

export default ItemBulkUploader;
