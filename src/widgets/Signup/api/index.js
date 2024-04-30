import { BASIC_URL } from "../../../apps/Helper/api";

export const SignupApi = async (data) => {
  const res = await fetch(`${BASIC_URL}/Auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};
