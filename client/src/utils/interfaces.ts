export interface IField {
  label: string;
  input: { type: string; id: string; placeholder: string };
  tips: string[];
  validator: RegExp;
}

export interface IAuth {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
