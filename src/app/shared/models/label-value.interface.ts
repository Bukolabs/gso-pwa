export class LabelValue<T = string> {
   label: string;
   value: T;

   constructor(label: string, value: T) {
      this.label = label;
      this.value = value;
   }
}
