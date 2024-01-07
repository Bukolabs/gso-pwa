export class LabelValue<T = string> {
  label: string;
  value: T;
  payload?: any;

  constructor(label: string, value: T, payload?: any) {
    this.label = label;
    this.value = value;
    this.payload = payload;
  }
}
