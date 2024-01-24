import {
  GetPoPrDto,
  GetPrItemDto,
  GetPurchaseRequestDto,
  GetStage1ReviewSummaryDto,
  GetStage1SummaryDto,
  LoginResponseDto,
} from "@api/api";
import {
  PurchaseItemFormSchema,
  RequestFormSchema,
  RequestInOrderFormSchema,
} from "@core/model/form.rule";
import { LocalAuth } from "@core/model/local-auth";
import { RequestStatus } from "@core/model/request-status.enum";
import { HomeCardProps } from "@domain/home/home-card/home-card";
import { LabelValue } from "@shared/models/label-value.interface";

export class ApiToFormService {
  static MapRequestsInOrder(prItems: GetPoPrDto[]) {
    const mappedItem = prItems.map(
      (item) =>
        ({
          code: item.code,
          isActive: true,
          purchaseOrder: item.purchase_order,
          purchaseRequest: item.purchase_request,
        } as RequestInOrderFormSchema)
    );

    return mappedItem;
  }

  static MapRequestPurchaseItems(
    prItems: GetPrItemDto[]
  ): PurchaseItemFormSchema[] {
    const mappedItem = prItems.map((x: GetPrItemDto) => {
      return {
        code: x.item,
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
        itemArrayCode: x.code,
      } as PurchaseItemFormSchema;
    });

    return mappedItem as PurchaseItemFormSchema[];
  }

  static MapOrderRequestsToForm(
    requests: GetPurchaseRequestDto[],
    orderId: string,
    isActive: boolean = true
  ) {
    return requests.map(
      (item) =>
        ({
          code: item.po_pr_code,
          purchaseRequest: item.code || "",
          purchaseOrder: orderId || "",
          isActive,
        } as RequestInOrderFormSchema)
    );
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
      role_description: data.role_description,
      department_code: data.department_code,
      department_name: data.department_name,
    } as LocalAuth;

    return mappedData;
  }

  static MapCountCardSummary(
    stage: GetStage1SummaryDto[],
    review: GetStage1ReviewSummaryDto[],
    field: "requests" | "orders" = "requests"
  ) {
    const stageData = stage.map(
      (item) => ({ label: item.name, value: item.tally } as LabelValue<number>)
    );
    const mappedReview = review.map(
      (item) =>
        ({ label: item.approver, value: item.tally } as LabelValue<number>)
    );

    const cardModel = stageData.map((item) => {
      const statusEntity = {
        status: item.label,
        [field]: item.value,
        stage: "STAGE1",
      } as HomeCardProps;

      if (
        item.label === RequestStatus.REVIEW ||
        item.label === RequestStatus.POREVIEW
      ) {
        statusEntity.prReviews = mappedReview;
      }

      return statusEntity;
    });

    return cardModel;
  }

  static MapPurchaseRequestToForm(item: GetPurchaseRequestDto) {
    const mappedPrItems = this.MapRequestPurchaseItems(item.items || []);
    const mappedItem = {
      prno: item.pr_no,
      dueDate: new Date(item.pr_date as any),
      category: item.category,
      section: item.section,
      sai: item.sai_no,
      saiDate: new Date(item.sai_date as any),
      alobs: item.alobs_no,
      alobsDate: new Date(item.alobs_date as any),
      purpose: item.purpose,
      items: mappedPrItems,
      active: true,
      urgent: item.is_urgent,
      department: item.department,
      departmentLabel: item.department_name,
      isPPMP: item.has_ppmp,
      isActivityDesign: item.has_activity_design,
    } as RequestFormSchema;

    return mappedItem;
  }
}
