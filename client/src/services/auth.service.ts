import axios from "axios";

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  return await axios.post("http://localhost:8080/register", {
    firstName,
    lastName,
    email,
    password,
  });
};
