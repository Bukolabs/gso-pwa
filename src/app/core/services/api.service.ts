import { RequestArgs } from "@api/base";
import axios from "axios";

export class ApiService {
  static getFetch(item: RequestArgs) {
    return axios.get(item.url, item.options);
  }
}
