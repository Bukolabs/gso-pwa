import { RequestArgs } from "@api/base";
import axios from "axios";

export class FetchService {
  static Get(item: RequestArgs) {
    return axios.get(item.url, item.options);
  }
  static Post(item: RequestArgs) {
    console.log(item)
    return axios.post(item.url, item.options.data, item.options);
  }
}
