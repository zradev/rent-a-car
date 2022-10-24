export interface IField {
  label: string;
  input: { type: string; id: string; placeholder: string };
  tips: string[];
  validator: RegExp;
}
