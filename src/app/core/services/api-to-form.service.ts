import { GetPrItemDto, LoginResponseDto } from "@api/api";
import { PurchaseItemFormSchema } from "@core/model/form.rule";
import { LocalAuth } from "@core/model/local-auth";

export class ApiToFormService {
  static MapRequestPruchaseItems(
    prItems: GetPrItemDto[]
  ): PurchaseItemFormSchema[] {
    const mappedItem = prItems.map((x: GetPrItemDto) => {
      return {
        code: x.code,
        itemCode: x.item,
        name: x.item_name,
        description: x.description,
        unit: x.unit,
        unitName: x.unit_name,
        category: x.category, // TODO add as soon as field is available
        categoryName: x.category_name, // TODO add as soon as field is available
        brand: x.brand,
        brandName: x.brand_name,
        cost: x.price,
        isActive: true,
        quantity: x.quantity,
      } as PurchaseItemFormSchema;
    });

    return mappedItem as PurchaseItemFormSchema[];
  }

  static MapLocalAuth(data: LoginResponseDto): LocalAuth {
    const mappedData = {
      oauth_client_grant_type: data.oauth_client_grant_type,
      oauth_client_scope: data.oauth_client_scope,
      oauth_client_secret: data.oauth_client_secret,
      oauth_expiry: data.oauth_expiry,
      oauth_refresh_token: data.oauth_refresh_token,
      oauth_token: data.oauth_token,
      person_code: data.person_code,
      person_email: data.person_email,
      person_first_name: data.person_first_name,
      person_last_name: data.person_last_name,
      role_code: data.role_code,
      role_name: data.role_name,
      department_code: data.department_code,
      department_name: data.department_name,
    } as LocalAuth;

    return mappedData;
  }
}
