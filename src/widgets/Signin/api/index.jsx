import { BASIC_URL } from "../../../apps/Helper/api";

export const signIn = async (body) => {
  try {
    const res = await fetch(`${BASIC_URL}/Auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await res.json();
    return result;
  } catch (err) {
    throw Error(err);
  }
};
