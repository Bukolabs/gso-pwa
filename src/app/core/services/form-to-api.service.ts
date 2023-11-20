import { CreateBidderDto } from "@api/api";
import { BidderFormSchema } from "@core/model/form.rule";

export class FormToApiService {
  static NewBidder(form: BidderFormSchema) {
    const payload = {
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      street_name: form.streetName,
      barangay: form.barangay,
      municipality: form.city,
    } as CreateBidderDto;

    return payload;
  }
}
