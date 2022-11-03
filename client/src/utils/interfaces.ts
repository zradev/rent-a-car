export interface IField {
  label: string;
  input: { type: string; id: string; placeholder: string };
  tips: string[];
  validator: RegExp;
}

export interface IAuth {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  birthday: string;
  licenseNum: string;
  licenseCountry: string;
  licenseIssueDate: string;
  licenseExpireDate: string;
}
