import { AxiosError } from "axios";

export const handleAxiosErrors = (error: any) => {
  if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500
  ) {
    return error.response.data.message;
  } else {
    return "Oops! Something Went Wrong.";
  }
};
